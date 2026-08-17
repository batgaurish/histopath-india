import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut as fbSignOut, onAuthStateChanged, updateProfile,
} from 'firebase/auth';
import {
  doc, getDoc, setDoc, updateDoc, collection, onSnapshot, query, orderBy,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './firebase';

// ═══════════════════════════════════════════════════════════
// Staff accounts
//
// Anyone may sign up, but a new account lands in `pending` and can read
// nothing privileged and write nothing. An owner approves it, which flips
// `status` to `approved` and unlocks publishing. The security rules are the
// real gate — this module is only the client half.
//
//   staff/{uid} = { email, name, status, role, requestedAt, decidedAt, decidedBy }
//     status: 'pending' | 'approved' | 'rejected'
//     role:   'staff'   | 'owner'
// ═══════════════════════════════════════════════════════════

export const STAFF_COLLECTION = 'staff';

export function staffDocRef(uid) {
  const d = db();
  return d ? doc(d, STAFF_COLLECTION, uid) : null;
}

/**
 * Create an account and its pending staff record.
 *
 * `status` and `role` are written by the client but pinned by the rules:
 * a self-created document may only ever be pending/staff, so signing up
 * cannot grant approval or ownership.
 */
export async function requestAccess({ email, password, name }) {
  const a = auth();
  if (!a) throw new Error('Firebase is not configured.');

  const cred = await createUserWithEmailAndPassword(a, email.trim(), password);
  const displayName = (name || '').trim() || email.split('@')[0];

  try {
    await updateProfile(cred.user, { displayName });
  } catch {
    // Cosmetic only — never block sign-up on this.
  }

  await setDoc(staffDocRef(cred.user.uid), {
    email: cred.user.email,
    name: displayName,
    status: 'pending',
    role: 'staff',
    requestedAt: Date.now(),
  });

  return cred.user;
}

export async function signIn({ email, password }) {
  const a = auth();
  if (!a) throw new Error('Firebase is not configured.');
  const cred = await signInWithEmailAndPassword(a, email.trim(), password);
  return cred.user;
}

export async function signOut() {
  const a = auth();
  if (a) await fbSignOut(a);
}

/** Read the caller's own staff record. Missing means sign-up never finished. */
export async function getMyStaffRecord(uid) {
  const ref = staffDocRef(uid);
  if (!ref) return null;
  const snap = await getDoc(ref);
  return snap.exists() ? { uid, ...snap.data() } : null;
}

/**
 * Watch auth state and the caller's staff record together, so the UI always
 * has both the user and their approval status in one update.
 */
export function watchSession(cb) {
  if (!isFirebaseConfigured()) {
    cb({ ready: true, user: null, staff: null });
    return () => {};
  }
  const a = auth();
  if (!a) {
    cb({ ready: true, user: null, staff: null });
    return () => {};
  }

  let unsubStaff = null;

  const unsubAuth = onAuthStateChanged(a, (user) => {
    if (unsubStaff) { unsubStaff(); unsubStaff = null; }

    if (!user) {
      cb({ ready: true, user: null, staff: null });
      return;
    }

    const ref = staffDocRef(user.uid);
    if (!ref) {
      cb({ ready: true, user, staff: null });
      return;
    }

    // Live, so an approval takes effect without the user reloading.
    unsubStaff = onSnapshot(
      ref,
      (snap) => cb({
        ready: true,
        user,
        staff: snap.exists() ? { uid: user.uid, ...snap.data() } : null,
      }),
      (err) => {
        console.warn('staff record unreadable', err);
        cb({ ready: true, user, staff: null, error: err });
      }
    );
  });

  return () => { if (unsubStaff) unsubStaff(); unsubAuth(); };
}

export const isApproved = (staff) => staff?.status === 'approved';
export const isOwner = (staff) => staff?.role === 'owner' && staff?.status === 'approved';

// ── Owner-only: review requests ───────────────────────────────────────

/** Live list of all staff records, newest request first. Owners only. */
export function watchStaffList(cb, onError) {
  const d = db();
  if (!d) { cb([]); return () => {}; }
  const q = query(collection(d, STAFF_COLLECTION), orderBy('requestedAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map(doc => ({ uid: doc.id, ...doc.data() }))),
    (err) => { console.warn('staff list unreadable', err); if (onError) onError(err); }
  );
}

export async function decideStaff(uid, status, deciderEmail) {
  const ref = staffDocRef(uid);
  if (!ref) throw new Error('Firebase is not configured.');
  await updateDoc(ref, {
    status,
    decidedAt: Date.now(),
    decidedBy: deciderEmail || null,
  });
}
