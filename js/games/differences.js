// ============================================================
// HistoPath India — Find the Difference Engine
// Two side-by-side images with subtle differences to find
// ============================================================

const DifferencesGame = (() => {
  let _container = null;
  let _differences = [];
  let _found = [];
  let _totalDiffs = 5;
  let _hintsUsed = 0;
  let _mistakes = 0;
  let _onComplete = null;
  let _canvasL = null;
  let _canvasR = null;

  function init(container, options = {}) {
    _container = container;
    _differences = options.differences || [];
    _totalDiffs = _differences.length || 5;
    _found = [];
    _hintsUsed = 0;
    _mistakes = 0;
    _onComplete = options.onComplete || null;

    _container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'diff-container';

    // Score
    const score = document.createElement('div');
    score.className = 'diff-score';
    score.id = 'diff-score';
    score.textContent = `Found: 0 / ${_totalDiffs}`;

    // Left image
    const leftWrap = document.createElement('div');
    leftWrap.innerHTML = `<div class="diff-label">Original</div>`;
    const leftImg = document.createElement('div');
    leftImg.className = 'diff-image-wrapper';
    leftImg.id = 'diff-left';
    _canvasL = document.createElement('canvas');
    leftImg.appendChild(_canvasL);
    leftWrap.insertBefore(leftImg, leftWrap.firstChild);

    // Right image
    const rightWrap = document.createElement('div');
    rightWrap.innerHTML = `<div class="diff-label">Modified</div>`;
    const rightImg = document.createElement('div');
    rightImg.className = 'diff-image-wrapper';
    rightImg.id = 'diff-right';
    _canvasR = document.createElement('canvas');
    rightImg.appendChild(_canvasR);
    rightWrap.insertBefore(rightImg, rightWrap.firstChild);

    wrapper.appendChild(leftWrap);
    wrapper.appendChild(rightWrap);
    wrapper.appendChild(score);
    _container.appendChild(wrapper);

    // Draw after layout
    requestAnimationFrame(() => {
      const w = leftImg.clientWidth || 400;
      const h = leftImg.clientHeight || 300;
      _canvasL.width = w; _canvasL.height = h;
      _canvasR.width = w; _canvasR.height = h;

      const seed = Date.now() % 10000;
      _drawHistologyScene(_canvasL.getContext('2d'), w, h, seed, false);
      _drawHistologyScene(_canvasR.getContext('2d'), w, h, seed, true);

      // Click handlers
      leftImg.addEventListener('click', (e) => _handleClick(e, leftImg));
      rightImg.addEventListener('click', (e) => _handleClick(e, rightImg));
    });
  }

  function _drawHistologyScene(ctx, w, h, seed, withDifferences) {
    // Background tissue
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#F0D8E0');
    grad.addColorStop(0.5, '#E8C8D4');
    grad.addColorStop(1, '#E0C0D0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Fibers
    ctx.strokeStyle = 'rgba(180, 120, 150, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const sx = _seededRandom(seed + i * 7) * w;
      const sy = _seededRandom(seed + i * 13) * h;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(sx + 60, sy + 30, sx + 120, sy - 20, sx + 180, sy + 40);
      ctx.stroke();
    }

    // Cells
    const cellPositions = [];
    for (let i = 0; i < 15; i++) {
      const cx = _seededRandom(seed + i * 31 + 100) * (w - 40) + 20;
      const cy = _seededRandom(seed + i * 47 + 200) * (h - 40) + 20;
      const r = 12 + _seededRandom(seed + i * 19) * 14;
      cellPositions.push({ cx, cy, r });

      // Difference locations are based on first 5 cell positions
      const isDiffCell = withDifferences && i < _totalDiffs;

      // Cell body
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      if (isDiffCell) {
        // Modified cell - different color/size
        ctx.fillStyle = `hsla(${200 + i * 30}, 50%, 70%, 0.6)`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(50, 100, 150, 0.5)';
      } else {
        ctx.fillStyle = `hsla(${330 + _seededRandom(seed + i) * 30}, 40%, 75%, 0.5)`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(150, 80, 120, 0.3)';
      }
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Nucleus
      ctx.beginPath();
      const nr = isDiffCell ? r * 0.5 : r * 0.3;
      ctx.arc(cx, cy, nr, 0, Math.PI * 2);
      ctx.fillStyle = isDiffCell ? 'rgba(30, 80, 120, 0.6)' : 'rgba(100, 40, 80, 0.5)';
      ctx.fill();
    }

    // Store difference positions (first 5 cells)
    if (!withDifferences) {
      _differences = cellPositions.slice(0, _totalDiffs).map((p, i) => ({
        x: p.cx / w,
        y: p.cy / h,
        label: `Difference ${i + 1}`,
      }));
    }

    // Blood vessels
    ctx.strokeStyle = 'rgba(200, 60, 80, 0.25)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      const sx = _seededRandom(seed + i * 71 + 500) * w;
      const sy = _seededRandom(seed + i * 83 + 600) * h;
      ctx.moveTo(sx, sy);
      ctx.quadraticCurveTo(sx + 80, sy + 50, sx + 160, sy - 20);
      ctx.stroke();
    }
  }

  function _seededRandom(s) {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  }

  function _handleClick(e, wrapper) {
    const rect = wrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Check proximity to unfound differences
    const threshold = 0.08;
    let foundIdx = -1;
    for (let i = 0; i < _differences.length; i++) {
      if (_found.includes(i)) continue;
      const d = _differences[i];
      const dist = Math.sqrt((x - d.x) ** 2 + (y - d.y) ** 2);
      if (dist < threshold) {
        foundIdx = i;
        break;
      }
    }

    if (foundIdx >= 0) {
      _found.push(foundIdx);
      const d = _differences[foundIdx];

      // Mark on both images
      [_container.querySelector('#diff-left'), _container.querySelector('#diff-right')].forEach(img => {
        const marker = document.createElement('div');
        marker.className = 'diff-marker';
        marker.style.left = (d.x * 100) + '%';
        marker.style.top = (d.y * 100) + '%';
        img.appendChild(marker);
      });

      Audio.playCorrect();
      _updateScore();

      if (_found.length === _totalDiffs) {
        setTimeout(() => {
          if (_onComplete) _onComplete({ hintsUsed: _hintsUsed, mistakes: _mistakes });
        }, 600);
      }
    } else {
      _mistakes++;
      // Wrong click feedback
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute; left: ${(x * 100)}%; top: ${(y * 100)}%;
        width: 24px; height: 24px; border: 2px solid var(--clr-error);
        border-radius: 50%; transform: translate(-50%, -50%);
        animation: scaleIn 0.3s ease both; pointer-events: none; opacity: 0.6;
      `;
      wrapper.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
      Audio.playWrong();
    }
  }

  function _updateScore() {
    const el = document.getElementById('diff-score');
    if (el) el.textContent = `Found: ${_found.length} / ${_totalDiffs}`;
  }

  function giveHint() {
    const unfound = [];
    for (let i = 0; i < _differences.length; i++) {
      if (!_found.includes(i)) unfound.push(i);
    }
    if (unfound.length === 0) return;

    _hintsUsed++;
    const idx = unfound[0];
    const d = _differences[idx];

    // Flash hint on right image
    const rightImg = _container.querySelector('#diff-right');
    const hint = document.createElement('div');
    hint.style.cssText = `
      position: absolute; left: ${(d.x * 100)}%; top: ${(d.y * 100)}%;
      width: 40px; height: 40px; border: 3px solid var(--clr-accent-gold);
      border-radius: 50%; transform: translate(-50%, -50%);
      animation: pulseGlow 0.8s ease 3; pointer-events: none;
      box-shadow: 0 0 15px rgba(255, 200, 50, 0.5);
    `;
    rightImg.appendChild(hint);
    setTimeout(() => hint.remove(), 2500);
    Audio.playHint();
  }

  function getStats() {
    return { totalDiffs: _totalDiffs, found: _found.length, hintsUsed: _hintsUsed, mistakes: _mistakes };
  }

  function destroy() {
    if (_container) _container.innerHTML = '';
  }

  return { init, giveHint, getStats, destroy };
})();
