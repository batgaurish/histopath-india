// ============================================================
// HistoPath India — localStorage Wrapper
// Handles player profiles, progress, stars, avatar data
// ============================================================

const Storage = (() => {
  const KEYS = {
    CURRENT_PLAYER: 'histopath_currentPlayer',
    PLAYERS: 'histopath_players',
    VERSION: 'histopath_version',
  };

  const CURRENT_VERSION = 1;

  // ---------- Helpers ----------
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

  // ---------- Player Profiles ----------
  function _getPlayers() {
    return _get(KEYS.PLAYERS) || {};
  }

  function _savePlayers(players) {
    _set(KEYS.PLAYERS, players);
  }

  function createPlayer(name) {
    const players = _getPlayers();
    const id = 'player_' + Date.now();
    players[id] = {
      id,
      name,
      avatar: {
        face: 0,
        skinTone: 0,
        hair: 0,
        hairColor: 0,
        accessory: 0,
      },
      progress: {},  // { topicId: { missionId: { stars: 0-3, completed: bool, bestTime: ms } } }
      totalStars: 0,
      missionsCompleted: 0,
      createdAt: Date.now(),
      lastPlayed: Date.now(),
    };
    _savePlayers(players);
    setCurrentPlayer(id);
    return players[id];
  }

  function getPlayer(id) {
    const players = _getPlayers();
    return players[id] || null;
  }

  function getAllPlayers() {
    const players = _getPlayers();
    return Object.values(players).sort((a, b) => b.totalStars - a.totalStars);
  }

  function updatePlayer(id, updates) {
    const players = _getPlayers();
    if (!players[id]) return null;
    Object.assign(players[id], updates);
    players[id].lastPlayed = Date.now();
    _savePlayers(players);
    return players[id];
  }

  function deletePlayer(id) {
    const players = _getPlayers();
    delete players[id];
    _savePlayers(players);
    const current = getCurrentPlayerId();
    if (current === id) {
      localStorage.removeItem(KEYS.CURRENT_PLAYER);
    }
  }

  // ---------- Current Player ----------
  function setCurrentPlayer(id) {
    _set(KEYS.CURRENT_PLAYER, id);
  }

  function getCurrentPlayerId() {
    return _get(KEYS.CURRENT_PLAYER);
  }

  function getCurrentPlayer() {
    const id = getCurrentPlayerId();
    return id ? getPlayer(id) : null;
  }

  // ---------- Avatar ----------
  function saveAvatar(avatarData) {
    const id = getCurrentPlayerId();
    if (!id) return;
    updatePlayer(id, { avatar: avatarData });
  }

  function getAvatar() {
    const player = getCurrentPlayer();
    return player ? player.avatar : null;
  }

  // ---------- Progress ----------
  function saveMissionResult(topicId, missionId, stars, timeMs) {
    const id = getCurrentPlayerId();
    if (!id) return;

    const players = _getPlayers();
    const player = players[id];
    if (!player) return;

    if (!player.progress[topicId]) {
      player.progress[topicId] = {};
    }

    const existing = player.progress[topicId][missionId];
    const isNewCompletion = !existing || !existing.completed;
    const prevStars = existing ? existing.stars : 0;
    const newStars = Math.max(prevStars, stars);

    player.progress[topicId][missionId] = {
      completed: true,
      stars: newStars,
      bestTime: existing && existing.bestTime ? Math.min(existing.bestTime, timeMs) : timeMs,
      lastPlayed: Date.now(),
    };

    // Recalculate totals
    let totalStars = 0;
    let missionsCompleted = 0;
    for (const tid of Object.keys(player.progress)) {
      for (const mid of Object.keys(player.progress[tid])) {
        const m = player.progress[tid][mid];
        if (m.completed) {
          missionsCompleted++;
          totalStars += m.stars;
        }
      }
    }
    player.totalStars = totalStars;
    player.missionsCompleted = missionsCompleted;

    _savePlayers(players);
    return { isNewCompletion, prevStars, newStars, totalStars, missionsCompleted };
  }

  function getMissionProgress(topicId, missionId) {
    const player = getCurrentPlayer();
    if (!player || !player.progress[topicId]) return null;
    return player.progress[topicId][missionId] || null;
  }

  function getTopicProgress(topicId) {
    const player = getCurrentPlayer();
    if (!player || !player.progress[topicId]) return {};
    return player.progress[topicId];
  }

  function getOverallStats() {
    const player = getCurrentPlayer();
    if (!player) return { totalStars: 0, missionsCompleted: 0, totalMissions: 36 };
    return {
      totalStars: player.totalStars,
      missionsCompleted: player.missionsCompleted,
      totalMissions: 36,
    };
  }

  // ---------- Leaderboard ----------
  function getLeaderboard() {
    return getAllPlayers().map((p, i) => ({
      rank: i + 1,
      name: p.name,
      totalStars: p.totalStars,
      missionsCompleted: p.missionsCompleted,
      isCurrentPlayer: p.id === getCurrentPlayerId(),
    }));
  }

  // ---------- Init ----------
  function init() {
    const version = _get(KEYS.VERSION);
    if (version !== CURRENT_VERSION) {
      // Future migration logic goes here
      _set(KEYS.VERSION, CURRENT_VERSION);
    }
  }

  init();

  return {
    createPlayer,
    getPlayer,
    getAllPlayers,
    updatePlayer,
    deletePlayer,
    setCurrentPlayer,
    getCurrentPlayerId,
    getCurrentPlayer,
    saveAvatar,
    getAvatar,
    saveMissionResult,
    getMissionProgress,
    getTopicProgress,
    getOverallStats,
    getLeaderboard,
  };
})();
