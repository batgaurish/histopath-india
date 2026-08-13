import { TOPICS } from '../data/topics';

const KEYS = {
  CURRENT_PLAYER: 'histopath_currentPlayer',
  PLAYERS: 'histopath_players',
  VERSION: 'histopath_version',
};

const CURRENT_VERSION = 1;

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
  } catch (e) {
    console.error(`Storage: failed to write ${key}`, e);
  }
}

function _getPlayers() {
  return _get(KEYS.PLAYERS) || {};
}

function _savePlayers(players) {
  _set(KEYS.PLAYERS, players);
}

export function createPlayer(name) {
  const players = _getPlayers();
  const id = 'player_' + Date.now();
  players[id] = {
    id,
    name: name || 'Student',
    avatar: {
      face: 0,
      skinTone: 0,
      hair: 0,
      hairColor: 0,
      accessory: 0,
    },
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
  const players = _getPlayers();
  return players[id] || null;
}

export function getAllPlayers() {
  const players = _getPlayers();
  return Object.values(players).sort((a, b) => b.totalStars - a.totalStars);
}

export function updatePlayer(id, updates) {
  const players = _getPlayers();
  if (!players[id]) return null;
  Object.assign(players[id], updates);
  players[id].lastPlayed = Date.now();
  _savePlayers(players);
  return players[id];
}

export function deletePlayer(id) {
  const players = _getPlayers();
  delete players[id];
  _savePlayers(players);
  const current = getCurrentPlayerId();
  if (current === id) {
    localStorage.removeItem(KEYS.CURRENT_PLAYER);
  }
}

export function setCurrentPlayer(id) {
  _set(KEYS.CURRENT_PLAYER, id);
}

export function getCurrentPlayerId() {
  return _get(KEYS.CURRENT_PLAYER);
}

export function getCurrentPlayer() {
  const id = getCurrentPlayerId();
  return id ? getPlayer(id) : null;
}

export function saveAvatar(avatarData) {
  const id = getCurrentPlayerId();
  if (!id) return;
  updatePlayer(id, { avatar: avatarData });
}

export function getAvatar() {
  const player = getCurrentPlayer();
  return player ? player.avatar : null;
}

export function saveMissionResult(topicId, missionId, stars, timeMs = 0) {
  let player = getCurrentPlayer();
  if (!player) {
    player = createPlayer('Dental Student');
  }
  const players = _getPlayers();
  const p = players[player.id];

  if (!p.progress[topicId]) {
    p.progress[topicId] = {};
  }

  const existing = p.progress[topicId][missionId];
  const prevStars = existing ? existing.stars : 0;
  const newStars = Math.max(prevStars, stars);

  p.progress[topicId][missionId] = {
    completed: true,
    stars: newStars,
    bestTime: existing && existing.bestTime ? Math.min(existing.bestTime, timeMs) : timeMs,
    lastPlayed: Date.now(),
  };

  let totalStars = 0;
  let missionsCompleted = 0;
  for (const tid of Object.keys(p.progress)) {
    for (const mid of Object.keys(p.progress[tid])) {
      const m = p.progress[tid][mid];
      if (m.completed) {
        missionsCompleted++;
        totalStars += m.stars;
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
  return saveMissionResult(topicId, missionId, data.stars || 0, data.score || 0);
}

function _findTopicForMission(missionId) {
  if (TOPICS) {
    for (const t of TOPICS) {
      for (const s of t.stages) {
        if (s.missions.some(m => m.id === missionId)) return t.id;
      }
    }
  }
  return missionId.split('_')[0];
}

export function getMissionProgress(topicId, missionId) {
  const player = getCurrentPlayer();
  if (!player || !player.progress[topicId]) return null;
  return player.progress[topicId][missionId] || null;
}

export function getTopicProgress(topicId) {
  const player = getCurrentPlayer();
  if (!player || !player.progress[topicId]) return {};
  return player.progress[topicId];
}

export function getOverallStats() {
  const player = getCurrentPlayer();
  if (!player) return { totalStars: 0, missionsCompleted: 0, totalMissions: 36 };
  return {
    totalStars: player.totalStars || 0,
    missionsCompleted: player.missionsCompleted || 0,
    totalMissions: 36,
  };
}

export function getLeaderboard() {
  return getAllPlayers().map((p, i) => ({
    rank: i + 1,
    name: p.name,
    totalStars: p.totalStars,
    missionsCompleted: p.missionsCompleted,
    isCurrentPlayer: p.id === getCurrentPlayerId(),
  }));
}
