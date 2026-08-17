import {
  doc, setDoc, deleteDoc, collection, onSnapshot, getDocs,
} from 'firebase/firestore';
import {
  ref as storageRef, uploadString, getDownloadURL, deleteObject,
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';
import { firebaseConfig } from '../config/firebase';
import { getCustomData, saveCustomData } from '../utils/customContent';

// ═══════════════════════════════════════════════════════════
// Publishing labelling exercises
//
// Published exercises live in Firestore (`exercises/{missionId}`) with the
// slide image in Storage (`slides/{missionId}`). Both are world-readable so
// students need no account.
//
// Published content is mirrored into the same local store the offline
// Slide Labeller uses, which means the game reads exercises exactly as
// before and keeps working without a connection.
// ═══════════════════════════════════════════════════════════

export const EXERCISES = 'exercises';

/**
 * Firestore caps a document at 1 MB. Leave headroom for the markers and
 * metadata alongside an inlined image.
 */
const MAX_INLINE_IMAGE = 700 * 1024;

/** Storage is optional: new Firebase projects need the paid plan for it. */
function usesStorage() {
  return Boolean(firebaseConfig.storageBucket);
}

/** Marks a locally-cached exercise as having come from the server. */
const REMOTE_FLAG = '_remote';

function mirrorLocally(remote) {
  const data = getCustomData();
  if (!data.labelling) data.labelling = {};

  // Drop stale mirrors, keep anything authored locally and never published.
  for (const [id, ex] of Object.entries(data.labelling)) {
    if (ex && ex[REMOTE_FLAG] && !remote[id]) delete data.labelling[id];
  }
  for (const [id, ex] of Object.entries(remote)) {
    data.labelling[id] = { ...ex, [REMOTE_FLAG]: true };
  }

  try {
    saveCustomData(data);
  } catch (e) {
    // Quota is the likely cause; published content still renders from memory.
    console.warn('Could not cache published exercises locally', e);
  }
}

/**
 * Keep the local cache in step with published content.
 * Returns an unsubscribe function; a no-op when Firebase is not configured.
 */
export function watchPublished(onChange) {
  if (!isFirebaseConfigured()) return () => {};
  const d = db();
  if (!d) return () => {};

  return onSnapshot(
    collection(d, EXERCISES),
    (snap) => {
      const remote = {};
      snap.forEach(doc => { remote[doc.id] = doc.data(); });
      mirrorLocally(remote);
      if (onChange) onChange(remote);
    },
    (err) => console.warn('Could not read published exercises', err)
  );
}

export async function fetchPublished() {
  if (!isFirebaseConfigured()) return {};
  const d = db();
  if (!d) return {};
  const snap = await getDocs(collection(d, EXERCISES));
  const remote = {};
  snap.forEach(doc => { remote[doc.id] = doc.data(); });
  mirrorLocally(remote);
  return remote;
}

/**
 * Publish one exercise so every student sees it.
 *
 * A data-URL image is uploaded to Storage first and replaced by its public
 * URL — Firestore documents cap at 1 MB, far below a slide.
 */
export async function publishExercise(missionId, exercise, { author } = {}) {
  if (!isFirebaseConfigured()) throw new Error('Firebase is not configured.');
  const d = db();
  if (!d) throw new Error('Firebase is not available.');
  const s = usesStorage() ? storage() : null;
  if (usesStorage() && !s) throw new Error('Firebase Storage is not available.');

  let imageUrl = exercise.image;
  let imagePath = exercise.imagePath || null;

  if (typeof imageUrl === 'string' && imageUrl.startsWith('data:')) {
    if (usesStorage()) {
      imagePath = `slides/${missionId}`;
      const objectRef = storageRef(s, imagePath);
      // The data URL already carries its own content type.
      await uploadString(objectRef, imageUrl, 'data_url');
      imageUrl = await getDownloadURL(objectRef);
    } else {
      // No Storage bucket configured — Cloud Storage requires the paid plan
      // on new projects. Keep the image inline instead, within Firestore's
      // 1 MB document ceiling.
      if (imageUrl.length > MAX_INLINE_IMAGE) {
        throw new Error(
          'This slide is too large to publish without Firebase Storage. ' +
          'Re-upload a smaller image, or enable Storage on the project.'
        );
      }
      imagePath = null;
    }
  }

  const payload = {
    image: imageUrl,
    imagePath,
    markerStyle: exercise.markerStyle || 'numbered',
    caption: exercise.caption || '',
    credit: exercise.credit || '',
    markers: (exercise.markers || []).map((m, i) => ({
      id: m.id ?? i,
      x: Number(m.x),
      y: Number(m.y),
      label: String(m.label || '').trim(),
    })),
    updatedAt: Date.now(),
    updatedBy: author || null,
  };

  await setDoc(doc(d, EXERCISES, missionId), payload);
  mirrorLocally({ [missionId]: payload });
  return payload;
}

/** Remove a published exercise and its slide. */
export async function unpublishExercise(missionId) {
  if (!isFirebaseConfigured()) throw new Error('Firebase is not configured.');
  const d = db();
  const s = usesStorage() ? storage() : null;

  try {
    if (s) await deleteObject(storageRef(s, `slides/${missionId}`));
  } catch (e) {
    // Already gone, or never uploaded — deleting the record still matters.
    if (e?.code !== 'storage/object-not-found') {
      console.warn('Could not delete slide image', e);
    }
  }

  await deleteDoc(doc(d, EXERCISES, missionId));

  const data = getCustomData();
  if (data.labelling?.[missionId]?.[REMOTE_FLAG]) {
    delete data.labelling[missionId];
    saveCustomData(data);
  }
}

/** True when this mission's local copy came from the server. */
export function isPublished(exercise) {
  return Boolean(exercise && exercise[REMOTE_FLAG]);
}
