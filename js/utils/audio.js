// ============================================================
// HistoPath India — Audio System
// Web Audio API for procedural SFX & ambient music
// ============================================================

const Audio = (() => {
  let _ctx = null;
  let _muted = false;
  let _volume = 0.5;
  let _bgGain = null;
  let _bgOsc = null;
  let _bgPlaying = false;

  function _getCtx() {
    if (!_ctx) {
      _ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (_ctx.state === 'suspended') {
      _ctx.resume();
    }
    return _ctx;
  }

  // ---------- Simple tone ----------
  function _playTone(freq, duration, type = 'sine', vol = 0.3) {
    if (_muted) return;
    const ctx = _getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol * _volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  // ---------- SFX ----------
  function playCorrect() {
    _playTone(523.25, 0.15, 'sine', 0.25);  // C5
    setTimeout(() => _playTone(659.25, 0.15, 'sine', 0.25), 100);  // E5
    setTimeout(() => _playTone(783.99, 0.25, 'sine', 0.3), 200);   // G5
  }

  function playWrong() {
    _playTone(200, 0.3, 'sawtooth', 0.15);
    setTimeout(() => _playTone(180, 0.3, 'sawtooth', 0.12), 150);
  }

  function playClick() {
    _playTone(800, 0.05, 'sine', 0.15);
  }

  function playStar() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => {
      setTimeout(() => _playTone(f, 0.2, 'sine', 0.2), i * 100);
    });
  }

  function playMissionComplete() {
    const notes = [392, 440, 494, 523, 587, 659, 784, 1047];
    notes.forEach((f, i) => {
      setTimeout(() => _playTone(f, 0.25, 'triangle', 0.2), i * 80);
    });
  }

  function playHint() {
    _playTone(440, 0.1, 'sine', 0.15);
    setTimeout(() => _playTone(554, 0.1, 'sine', 0.15), 120);
    setTimeout(() => _playTone(440, 0.15, 'sine', 0.12), 240);
  }

  function playPiecePlaced() {
    _playTone(600, 0.08, 'sine', 0.2);
    setTimeout(() => _playTone(800, 0.1, 'sine', 0.15), 60);
  }

  function playNavigation() {
    _playTone(500, 0.06, 'sine', 0.1);
  }

  // ---------- Background ambient ----------
  function startBgMusic() {
    if (_bgPlaying || _muted) return;
    const ctx = _getCtx();

    _bgGain = ctx.createGain();
    _bgGain.gain.setValueAtTime(0, ctx.currentTime);
    _bgGain.gain.linearRampToValueAtTime(0.04 * _volume, ctx.currentTime + 2);
    _bgGain.connect(ctx.destination);

    // Soft drone pad
    const freqs = [130.81, 164.81, 196.00]; // C3, E3, G3 chord
    _bgOsc = freqs.map(f => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      osc.connect(_bgGain);
      osc.start();
      return osc;
    });

    _bgPlaying = true;
  }

  function stopBgMusic() {
    if (!_bgPlaying || !_bgOsc) return;
    const ctx = _getCtx();
    _bgGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
    setTimeout(() => {
      _bgOsc.forEach(o => { try { o.stop(); } catch(e) {} });
      _bgOsc = null;
      _bgPlaying = false;
    }, 1100);
  }

  // ---------- Controls ----------
  function setVolume(v) {
    _volume = Math.max(0, Math.min(1, v));
  }

  function getVolume() {
    return _volume;
  }

  function toggleMute() {
    _muted = !_muted;
    if (_muted) {
      stopBgMusic();
    }
    return _muted;
  }

  function isMuted() {
    return _muted;
  }

  // Init audio context on first user interaction
  function init() {
    const handler = () => {
      _getCtx();
      document.removeEventListener('click', handler);
      document.removeEventListener('keydown', handler);
    };
    document.addEventListener('click', handler);
    document.addEventListener('keydown', handler);
  }

  return {
    init,
    playCorrect,
    playWrong,
    playClick,
    playStar,
    playMissionComplete,
    playHint,
    playPiecePlaced,
    playNavigation,
    startBgMusic,
    stopBgMusic,
    setVolume,
    getVolume,
    toggleMute,
    isMuted,
  };
})();
