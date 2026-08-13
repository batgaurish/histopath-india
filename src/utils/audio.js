// Web Audio Synthesizer for UI sound effects (no external audio assets needed)
const ctx = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.1) {
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context fallback
  }
}

export const Audio = {
  playClick() {
    playTone(600, 'sine', 0.05, 0.08);
  },
  playCorrect() {
    playTone(523.25, 'triangle', 0.1, 0.12);
    setTimeout(() => playTone(659.25, 'triangle', 0.15, 0.12), 80);
  },
  playWrong() {
    playTone(220, 'sawtooth', 0.15, 0.08);
    setTimeout(() => playTone(180, 'sawtooth', 0.2, 0.08), 100);
  },
  playStar() {
    playTone(783.99, 'sine', 0.1, 0.15);
    setTimeout(() => playTone(1046.5, 'sine', 0.2, 0.15), 100);
  },
  playMissionComplete() {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      setTimeout(() => playTone(freq, 'triangle', 0.2, 0.15), idx * 100);
    });
  },
  playHint() {
    playTone(880, 'sine', 0.15, 0.1);
  },
  playPiecePlaced() {
    playTone(440, 'sine', 0.08, 0.1);
  }
};
