// ============================================================
// HistoPath India — Timer Utility
// Configurable countdown/stopwatch for mission timing
// ============================================================

const Timer = (() => {
  let _startTime = 0;
  let _elapsed = 0;
  let _interval = null;
  let _paused = false;
  let _onTick = null;
  let _onComplete = null;
  let _countdownMs = 0;
  let _isCountdown = false;

  function start(options = {}) {
    stop();
    _isCountdown = !!options.countdownMs;
    _countdownMs = options.countdownMs || 0;
    _onTick = options.onTick || null;
    _onComplete = options.onComplete || null;
    _elapsed = 0;
    _paused = false;
    _startTime = performance.now();

    _interval = setInterval(() => {
      if (_paused) return;
      _elapsed = performance.now() - _startTime;

      if (_isCountdown) {
        const remaining = Math.max(0, _countdownMs - _elapsed);
        if (_onTick) _onTick(remaining, _formatTime(remaining));
        if (remaining <= 0) {
          stop();
          if (_onComplete) _onComplete();
        }
      } else {
        if (_onTick) _onTick(_elapsed, _formatTime(_elapsed));
      }
    }, 100);
  }

  function stop() {
    if (_interval) {
      clearInterval(_interval);
      _interval = null;
    }
    return _elapsed;
  }

  function pause() {
    _paused = true;
  }

  function resume() {
    if (_paused) {
      _startTime = performance.now() - _elapsed;
      _paused = false;
    }
  }

  function getElapsed() {
    return _elapsed;
  }

  function getRemaining() {
    if (!_isCountdown) return Infinity;
    return Math.max(0, _countdownMs - _elapsed);
  }

  function _formatTime(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  function formatElapsed() {
    return _formatTime(_elapsed);
  }

  return {
    start,
    stop,
    pause,
    resume,
    getElapsed,
    getRemaining,
    formatElapsed,
  };
})();
