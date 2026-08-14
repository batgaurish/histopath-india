import { TOPICS } from '../data/topics';

const KEYS = {
  CURRENT_PLAYER: 'histopath_currentPlayer',
  PLAYERS: 'histopath_players',
  VERSION: 'histopath_version',
};

const CURRENT_VERSION = 2;

export const DEFAULT_AVATAR = {
  skinTone: 0,
  hairStyle: 0,
  hairColor: 0,
  eyeStyle: 0,
  eyeColor: 0,
  brows: 0,
  mouth: 0,
  facialHair: 0,
  accessory: 0,
  outfit: 0,
  background: 0,
};

export const DEFAULT_ROLE = '3rd Year BDS Student';

/** Total missions in the curriculum, derived rather than hardcoded. */
export function getTotalMissions() {
  let n = 0;
  for (const t of TOPICS || []) {
    for (const s of t.stages || []) n += (s.missions || []).length;
  }
  return n || 36;
}

// ── Change notification ───────────────────────────────────────────────
// Views subscribe so a profile edit is reflected everywhere immediately
// instead of only after a remount.

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  for (const fn of listeners) {
    try {
      fn();
    } catch (e) {
      console.warn('Storage listener failed', e);
    }
  }
}

// Reflect edits made in another tab.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEYS.PLAYERS || e.key === KEYS.CURRENT_PLAYER) notify();
  });
}

// ── Raw access ────────────────────────────────────────────────────────

function _get(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn(`Storage: failed to read ${key}`, e);
    return null;
  }
}

function _set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Storage: failed to write ${key}`, e);
    return false;
  }
}

function _getPlayers() {
  return _get(KEYS.PLAYERS) || {};
}

function _savePlayers(players) {
  const ok = _set(KEYS.PLAYERS, players);
  if (ok) notify();
  return ok;
}

// ── Migration ─────────────────────────────────────────────────────────

/**
 * v1 stored the hair style under `avatar.hair`, while the editor read and
 * wrote `avatar.hairStyle`. Every saved hairstyle was therefore silently
 * dropped on reload. Migrate the old key forward and backfill new fields.
 */
function _migrate() {
  const stored = _get(KEYS.VERSION) || 1;
  if (stored >= CURRENT_VERSION) return;

  const players = _getPlayers();
  let changed = false;

  for (const p of Object.values(players)) {
    if (!p || typeof p !== 'object') continue;

    const avatar = { ...DEFAULT_AVATAR, ...(p.avatar || {}) };
    if (p.avatar && p.avatar.hair !== undefined && p.avatar.hairStyle === undefined) {
      avatar.hairStyle = p.avatar.hair;
    }
    delete avatar.hair;
    delete avatar.face;
    p.avatar = avatar;

    if (!p.role) p.role = DEFAULT_ROLE;
    if (!p.progress) p.progress = {};
    changed = true;
  }

  if (changed) _set(KEYS.PLAYERS, players);
  _set(KEYS.VERSION, CURRENT_VERSION);
}

_migrate();

// ── Players ───────────────────────────────────────────────────────────

export function createPlayer(name, role = DEFAULT_ROLE) {
  const players = _getPlayers();
  const id = 'player_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
  players[id] = {
    id,
    name: name || 'Student',
    role,
    avatar: { ...DEFAULT_AVATAR },
    progress: {},
    totalStars: 0,
    missionsCompleted: 0,
    createdAt: Date.now(),
    lastPlayed: Date.now(),
  };
  _savePlayers(players);
  setCurrentPlayer(id);
  return players[id];
}

export function getPlayer(id) {
  const p = _getPlayers()[id];
  return p ? _hydrate(p) : null;
}

/** Guarantee every field the UI reads exists, whatever vintage the record is. */
function _hydrate(p) {
  return {
    ...p,
    role: p.role || DEFAULT_ROLE,
    progress: p.progress || {},
    totalStars: p.totalStars || 0,
    missionsCompleted: p.missionsCompleted || 0,
    avatar: { ...DEFAULT_AVATAR, ...(p.avatar || {}) },
  };
}

export function getAllPlayers() {
  return Object.values(_getPlayers())
    .map(_hydrate)
    .sort((a, b) =>
      b.totalStars - a.totalStars ||
      b.missionsCompleted - a.missionsCompleted ||
      a.createdAt - b.createdAt
    );
}

export function updatePlayer(id, updates) {
  const players = _getPlayers();
  if (!players[id]) return null;
  Object.assign(players[id], updates);
  players[id].lastPlayed = Date.now();
  _savePlayers(players);
  return _hydrate(players[id]);
}

export function deletePlayer(id) {
  const players = _getPlayers();
  delete players[id];
  _savePlayers(players);
  if (getCurrentPlayerId() === id) {
    localStorage.removeItem(KEYS.CURRENT_PLAYER);
    notify();
  }
}

export function setCurrentPlayer(id) {
  _set(KEYS.CURRENT_PLAYER, id);
  notify();
}

export function getCurrentPlayerId() {
  return _get(KEYS.CURRENT_PLAYER);
}

export function getCurrentPlayer() {
  const id = getCurrentPlayerId();
  const existing = id ? getPlayer(id) : null;
  if (existing) return existing;

  // Reuse an orphaned record before minting a duplicate.
  const all = getAllPlayers();
  if (all.length > 0) {
    setCurrentPlayer(all[0].id);
    return all[0];
  }
  return createPlayer('Dental Student');
}

// ── Avatar ────────────────────────────────────────────────────────────

export function saveAvatar(avatarData) {
  const player = getCurrentPlayer();
  if (!player) return null;
  return updatePlayer(player.id, {
    avatar: { ...DEFAULT_AVATAR, ...avatarData },
  });
}

export function getAvatar() {
  const player = getCurrentPlayer();
  return player ? player.avatar : { ...DEFAULT_AVATAR };
}

/** Persist identity and appearance together so they can't drift apart. */
export function saveProfile({ name, role, avatar }) {
  const player = getCurrentPlayer();
  if (!player) return null;
  const updates = {};
  if (name !== undefined) updates.name = name.trim() || 'Student';
  if (role !== undefined) updates.role = role;
  if (avatar !== undefined) updates.avatar = { ...DEFAULT_AVATAR, ...avatar };
  return updatePlayer(player.id, updates);
}

// ── Progress ──────────────────────────────────────────────────────────

export function saveMissionResult(topicId, missionId, stars, timeMs = 0) {
  const player = getCurrentPlayer();
  const players = _getPlayers();
  const p = players[player.id];
  if (!p) return null;

  if (!p.progress) p.progress = {};
  if (!p.progress[topicId]) p.progress[topicId] = {};

  const existing = p.progress[topicId][missionId];
  const prevStars = existing ? existing.stars : 0;
  const newStars = Math.max(prevStars, stars);

  p.progress[topicId][missionId] = {
    completed: true,
    stars: newStars,
    // Only record a best time when one was actually measured.
    bestTime:
      timeMs > 0
        ? existing && existing.bestTime > 0
          ? Math.min(existing.bestTime, timeMs)
          : timeMs
        : existing?.bestTime || 0,
    lastPlayed: Date.now(),
  };

  let totalStars = 0;
  let missionsCompleted = 0;
  for (const tid of Object.keys(p.progress)) {
    for (const mid of Object.keys(p.progress[tid] || {})) {
      const m = p.progress[tid][mid];
      if (m && m.completed) {
        missionsCompleted++;
        totalStars += m.stars || 0;
      }
    }
  }
  p.totalStars = totalStars;
  p.missionsCompleted = missionsCompleted;

  _savePlayers(players);
  return { prevStars, newStars, totalStars, missionsCompleted };
}

export function saveMissionProgress(missionId, data = {}) {
  const topicId = data.topicId || _findTopicForMission(missionId);
  // v1 passed `data.score` as the time argument, recording quiz scores as
  // milliseconds. Use the real elapsed time.
  return saveMissionResult(topicId, missionId, data.stars || 0, data.timeMs || 0);
}

function _findTopicForMission(missionId) {
  for (const t of TOPICS || []) {
    for (const s of t.stages || []) {
      if ((s.missions || []).some(m => m.id === missionId)) return t.id;
    }
  }
  return String(missionId).split('_')[0];
}

export function getMissionProgress(topicId, missionId) {
  const player = getCurrentPlayer();
  return player?.progress?.[topicId]?.[missionId] || null;
}

export function getTopicProgress(topicId) {
  const player = getCurrentPlayer();
  return player?.progress?.[topicId] || {};
}

export function getOverallStats() {
  const player = getCurrentPlayer();
  const totalMissions = getTotalMissions();
  if (!player) return { totalStars: 0, missionsCompleted: 0, totalMissions, percent: 0 };
  return {
    totalStars: player.totalStars || 0,
    missionsCompleted: player.missionsCompleted || 0,
    totalMissions,
    percent: totalMissions ? Math.round((player.missionsCompleted / totalMissions) * 100) : 0,
  };
}

export function getLeaderboard() {
  const currentId = getCurrentPlayerId();
  return getAllPlayers().map((p, i) => ({
    rank: i + 1,
    id: p.id,
    name: p.name,
    role: p.role,
    avatar: p.avatar,
    totalStars: p.totalStars,
    missionsCompleted: p.missionsCompleted,
    lastPlayed: p.lastPlayed,
    isCurrentPlayer: p.id === currentId,
  }));
}
