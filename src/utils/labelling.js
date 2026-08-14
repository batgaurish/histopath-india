import { getCustomData, saveCustomData } from './customContent';

// ═══════════════════════════════════════════════════════════
// Slide-labelling exercises
//
// An exercise is one micrograph plus a set of markers. Each marker is a
// point on the image (stored as a percentage of width/height, so it stays
// correct at any display size) paired with the label a student must drop
// onto it.
//
//   { image, markerStyle, markers: [{ id, x, y, label }] }
//
// `image` is either a path under public/histology/ or a data URL pasted in
// by the authoring tool. `markerStyle` is 'numbered' when the app draws
// its own numbered pins, or 'hotspot' when the slide already has arrows
// and numbers burnt in and the pins should stay invisible.
// ═══════════════════════════════════════════════════════════

export const MARKER_STYLES = {
  numbered: 'App draws numbered pins',
  hotspot: 'Slide already has arrows — use invisible hotspots',
};

function _root() {
  const data = getCustomData();
  if (!data.labelling) data.labelling = {};
  return data;
}

export function getAllExercises() {
  return _root().labelling || {};
}

export function getExercise(missionId) {
  const ex = _root().labelling[missionId];
  if (!ex) return null;
  return {
    markerStyle: 'numbered',
    markers: [],
    ...ex,
    markers: (ex.markers || []).map((m, i) => ({ id: m.id ?? i, ...m })),
  };
}

export function saveExercise(missionId, exercise) {
  const data = _root();
  data.labelling[missionId] = {
    image: exercise.image || '',
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
  };
  saveCustomData(data);
  return data.labelling[missionId];
}

export function deleteExercise(missionId) {
  const data = _root();
  delete data.labelling[missionId];
  saveCustomData(data);
}

/** An exercise is playable once it has an image and at least two labelled markers. */
export function isPlayable(ex) {
  return Boolean(
    ex &&
    ex.image &&
    (ex.markers || []).filter(m => m.label && m.label.trim()).length >= 2
  );
}

// ── Import / export ───────────────────────────────────────────────────

export function exportExercises() {
  return JSON.stringify(getAllExercises(), null, 2);
}

/** Merge a previously exported bundle. Returns the number of exercises added. */
export function importExercises(json) {
  const incoming = typeof json === 'string' ? JSON.parse(json) : json;
  if (!incoming || typeof incoming !== 'object') throw new Error('Not a valid bundle');

  const data = _root();
  let n = 0;
  for (const [missionId, ex] of Object.entries(incoming)) {
    if (!ex || !ex.image) continue;
    data.labelling[missionId] = ex;
    n++;
  }
  saveCustomData(data);
  return n;
}

// ── Image processing ──────────────────────────────────────────────────

/**
 * Downscale and re-encode an uploaded slide so a set of exercises fits in
 * localStorage. Full-size phone photos are several MB each and would blow
 * the quota after two or three slides.
 */
export function processImageFile(file, maxDim = 1400, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('That file is not an image.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not decode that image.'));
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', quality),
          width: w,
          height: h,
          originalWidth: img.width,
          originalHeight: img.height,
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/** Rough byte size of the stored bundle, for a quota warning in the UI. */
export function storageFootprint() {
  try {
    const raw = JSON.stringify(getAllExercises());
    return new Blob([raw]).size;
  } catch {
    return 0;
  }
}
