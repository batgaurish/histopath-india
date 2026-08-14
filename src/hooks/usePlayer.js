import { useSyncExternalStore, useCallback } from 'react';
import { subscribe, getCurrentPlayer, getLeaderboard, getOverallStats } from '../utils/storage';

// `useSyncExternalStore` needs a stable snapshot: returning a fresh object each
// call would loop forever. Cache the last value and only swap it when the
// underlying store actually changes.
function cachedSnapshot(read) {
  let cache;
  let dirty = true;
  subscribe(() => { dirty = true; });
  return () => {
    if (dirty) {
      cache = read();
      dirty = false;
    }
    return cache;
  };
}

const playerSnapshot = cachedSnapshot(getCurrentPlayer);
const leaderboardSnapshot = cachedSnapshot(getLeaderboard);
const statsSnapshot = cachedSnapshot(getOverallStats);

/** Current player, re-rendering whenever the profile or progress changes. */
export function usePlayer() {
  return useSyncExternalStore(subscribe, playerSnapshot, playerSnapshot);
}

export function useLeaderboard() {
  return useSyncExternalStore(subscribe, leaderboardSnapshot, leaderboardSnapshot);
}

export function useStats() {
  return useSyncExternalStore(subscribe, statsSnapshot, statsSnapshot);
}

/** Force a re-read, for callers that mutate storage through other modules. */
export function useRefresh() {
  return useCallback(() => {
    window.dispatchEvent(new Event('histopath:refresh'));
  }, []);
}
