// ============================================================
// HistoPath India — Jigsaw Puzzle Engine
// Canvas-based puzzle with drag-and-drop pieces
// ============================================================

const JigsawGame = (() => {
  let _container = null;
  let _canvas = null;
  let _ctx = null;
  let _pieces = [];
  let _placedCount = 0;
  let _gridSize = 3;
  let _cellW = 0;
  let _cellH = 0;
  let _boardSize = 0;
  let _dragging = null;
  let _offsetX = 0;
  let _offsetY = 0;
  let _onComplete = null;
  let _hintsUsed = 0;
  let _mistakes = 0;
  let _imageColors = [];

  function init(container, options = {}) {
    _container = container;
    _gridSize = options.gridSize || 3;
    _onComplete = options.onComplete || null;
    _hintsUsed = 0;
    _mistakes = 0;
    _placedCount = 0;
    _pieces = [];

    _container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'jigsaw-container';

    // Generate procedural histology-style image colors
    _imageColors = _generateHistologyColors(options.imageDesc || 'tissue');

    // Board
    const boardWrapper = document.createElement('div');
    boardWrapper.className = 'jigsaw-board';
    _boardSize = Math.min(460, (_container.clientWidth || 500) - 48);
    boardWrapper.style.width = _boardSize + 'px';
    boardWrapper.style.height = _boardSize + 'px';

    _cellW = _boardSize / _gridSize;
    _cellH = _boardSize / _gridSize;

    // Draw grid guides
    for (let r = 0; r < _gridSize; r++) {
      for (let c = 0; c < _gridSize; c++) {
        const slot = document.createElement('div');
        slot.style.cssText = `position:absolute;left:${c*_cellW}px;top:${r*_cellH}px;width:${_cellW}px;height:${_cellH}px;border:1px dashed rgba(255,255,255,0.1);box-sizing:border-box;`;
        slot.dataset.row = r;
        slot.dataset.col = c;
        boardWrapper.appendChild(slot);
      }
    }
    wrapper.appendChild(boardWrapper);

    // Tray for pieces
    const tray = document.createElement('div');
    tray.className = 'jigsaw-tray';
    wrapper.appendChild(tray);
    _container.appendChild(wrapper);

    // Generate pieces
    const indices = [];
    for (let r = 0; r < _gridSize; r++) {
      for (let c = 0; c < _gridSize; c++) {
        indices.push({ r, c });
      }
    }

    // Shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    indices.forEach(({ r, c }) => {
      const piece = _createPiece(r, c);
      _pieces.push(piece);
      tray.appendChild(piece.el);
    });

    // Event listeners
    _container.addEventListener('mousedown', _onMouseDown);
    _container.addEventListener('mousemove', _onMouseMove);
    _container.addEventListener('mouseup', _onMouseUp);
    _container.addEventListener('touchstart', _onTouchStart, { passive: false });
    _container.addEventListener('touchmove', _onTouchMove, { passive: false });
    _container.addEventListener('touchend', _onTouchEnd);
  }

  function _generateHistologyColors(desc) {
    // Generate colors based on tissue type to create a recognizable pattern
    const palettes = {
      default: ['#E8B4D0', '#D4A0BC', '#C990B0', '#B880A4', '#A67098', '#9D6090', '#8B5080', '#E0D0E0', '#F0E0F0'],
      epithelium: ['#D4A0BC', '#E8B4D0', '#C990B0', '#F0D0E0', '#B880A4', '#E8C8D8', '#D0B0C8', '#F0E0F0', '#C0A0B0'],
      connective: ['#E8D0B4', '#D4BC9C', '#C8B090', '#F0E0D0', '#B8A480', '#E0D0C0', '#D0C0B0', '#F0E8E0', '#C0B0A0'],
      bone: ['#E0D8C8', '#C8C0B0', '#D8D0C0', '#B8B0A0', '#E8E0D0', '#F0E8E0', '#D0C8B8', '#C0B8A8', '#E0D8D0'],
      gland: ['#D0B8E0', '#C0A8D0', '#E0D0F0', '#B098C0', '#D8C0E8', '#E8D8F0', '#C8B0D8', '#D0C0E0', '#B8A0C8'],
    };

    const key = desc.toLowerCase().includes('epitheli') ? 'epithelium'
      : desc.toLowerCase().includes('bone') || desc.toLowerCase().includes('alveolar') ? 'bone'
      : desc.toLowerCase().includes('gland') || desc.toLowerCase().includes('acin') ? 'gland'
      : desc.toLowerCase().includes('connect') || desc.toLowerCase().includes('collagen') ? 'connective'
      : 'default';

    return palettes[key];
  }

  function _createPiece(r, c) {
    const el = document.createElement('canvas');
    el.width = _cellW;
    el.height = _cellH;
    el.className = 'jigsaw-piece';
    el.style.width = _cellW + 'px';
    el.style.height = _cellH + 'px';
    el.dataset.row = r;
    el.dataset.col = c;

    // Draw procedural histology pattern on piece
    const ctx = el.getContext('2d');
    _drawHistologyPiece(ctx, r, c, _cellW, _cellH);

    // Add piece number for accessibility
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = `bold ${Math.floor(_cellW * 0.2)}px Outfit`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${r * _gridSize + c + 1}`, _cellW / 2, _cellH / 2);

    return { el, r, c, placed: false };
  }

  function _drawHistologyPiece(ctx, row, col, w, h) {
    // Procedural histology-style pattern
    const seed = row * 100 + col * 10;
    const colors = _imageColors;

    // Background gradient
    const bgIdx = (row + col) % colors.length;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, colors[bgIdx]);
    grad.addColorStop(1, colors[(bgIdx + 2) % colors.length]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Draw cell-like structures
    const cellCount = 6 + (seed % 5);
    for (let i = 0; i < cellCount; i++) {
      const cx = ((seed * 7 + i * 43) % 100) / 100 * w;
      const cy = ((seed * 13 + i * 29) % 100) / 100 * h;
      const radius = 8 + (seed + i * 17) % 15;

      // Cell body
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = colors[(bgIdx + 3 + i) % colors.length] + '80';
      ctx.fill();
      ctx.strokeStyle = 'rgba(100, 50, 80, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(80, 30, 60, 0.5)';
      ctx.fill();
    }

    // Add some fiber-like lines
    ctx.strokeStyle = 'rgba(150, 100, 130, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      const startX = ((seed + i * 37) % 100) / 100 * w;
      const startY = ((seed + i * 53) % 100) / 100 * h;
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + 30, startY + 20,
        startX + 60, startY - 10,
        startX + 90, startY + 30
      );
      ctx.stroke();
    }
  }

  function _onMouseDown(e) {
    const piece = e.target.closest('.jigsaw-piece');
    if (!piece || piece.classList.contains('placed')) return;
    _startDrag(piece, e.clientX, e.clientY);
  }

  function _onMouseMove(e) {
    if (!_dragging) return;
    e.preventDefault();
    _moveDrag(e.clientX, e.clientY);
  }

  function _onMouseUp(e) {
    if (!_dragging) return;
    _endDrag(e.clientX, e.clientY);
  }

  function _onTouchStart(e) {
    const piece = e.target.closest('.jigsaw-piece');
    if (!piece || piece.classList.contains('placed')) return;
    e.preventDefault();
    const t = e.touches[0];
    _startDrag(piece, t.clientX, t.clientY);
  }

  function _onTouchMove(e) {
    if (!_dragging) return;
    e.preventDefault();
    const t = e.touches[0];
    _moveDrag(t.clientX, t.clientY);
  }

  function _onTouchEnd(e) {
    if (!_dragging) return;
    const t = e.changedTouches[0];
    _endDrag(t.clientX, t.clientY);
  }

  function _startDrag(pieceEl, x, y) {
    const rect = pieceEl.getBoundingClientRect();
    _offsetX = x - rect.left;
    _offsetY = y - rect.top;
    _dragging = pieceEl;
    pieceEl.classList.add('dragging');
    pieceEl.style.position = 'fixed';
    pieceEl.style.zIndex = '100';
    pieceEl.style.left = (x - _offsetX) + 'px';
    pieceEl.style.top = (y - _offsetY) + 'px';
    document.body.appendChild(pieceEl);
    Audio.playClick();
  }

  function _moveDrag(x, y) {
    if (!_dragging) return;
    _dragging.style.left = (x - _offsetX) + 'px';
    _dragging.style.top = (y - _offsetY) + 'px';
  }

  function _endDrag(x, y) {
    if (!_dragging) return;
    const pieceEl = _dragging;
    pieceEl.classList.remove('dragging');

    const board = _container.querySelector('.jigsaw-board');
    const boardRect = board.getBoundingClientRect();

    const dropX = x - boardRect.left;
    const dropY = y - boardRect.top;

    const targetCol = Math.floor(dropX / _cellW);
    const targetRow = Math.floor(dropY / _cellH);

    const pieceRow = parseInt(pieceEl.dataset.row);
    const pieceCol = parseInt(pieceEl.dataset.col);

    if (
      targetRow >= 0 && targetRow < _gridSize &&
      targetCol >= 0 && targetCol < _gridSize &&
      targetRow === pieceRow && targetCol === pieceCol
    ) {
      // Correct placement
      pieceEl.style.position = 'absolute';
      pieceEl.style.left = (pieceCol * _cellW) + 'px';
      pieceEl.style.top = (pieceRow * _cellH) + 'px';
      pieceEl.style.zIndex = '1';
      pieceEl.classList.add('placed');
      board.appendChild(pieceEl);

      const p = _pieces.find(p => p.el === pieceEl);
      if (p) p.placed = true;
      _placedCount++;

      Audio.playPiecePlaced();

      if (_placedCount === _gridSize * _gridSize) {
        _onPuzzleComplete();
      }
    } else {
      // Wrong placement — return to tray
      pieceEl.style.position = '';
      pieceEl.style.left = '';
      pieceEl.style.top = '';
      pieceEl.style.zIndex = '';
      const tray = _container.querySelector('.jigsaw-tray');
      tray.appendChild(pieceEl);
      if (targetRow >= 0 && targetCol >= 0) {
        _mistakes++;
      }
    }

    _dragging = null;
  }

  function _onPuzzleComplete() {
    if (_onComplete) _onComplete({ hintsUsed: _hintsUsed, mistakes: _mistakes });
  }

  function giveHint() {
    const unplaced = _pieces.filter(p => !p.placed);
    if (unplaced.length === 0) return;

    const piece = unplaced[0];
    _hintsUsed++;

    // Flash the correct position
    const board = _container.querySelector('.jigsaw-board');
    const highlight = document.createElement('div');
    highlight.style.cssText = `
      position: absolute;
      left: ${piece.c * _cellW}px;
      top: ${piece.r * _cellH}px;
      width: ${_cellW}px;
      height: ${_cellH}px;
      background: rgba(56, 224, 187, 0.3);
      border: 2px solid var(--clr-accent-teal);
      border-radius: 4px;
      animation: pulseGlow 1s ease 3;
      pointer-events: none;
      z-index: 5;
    `;
    board.appendChild(highlight);

    // Also highlight the piece in the tray
    piece.el.style.boxShadow = '0 0 15px rgba(56, 224, 187, 0.6)';

    setTimeout(() => {
      highlight.remove();
      piece.el.style.boxShadow = '';
    }, 3000);

    Audio.playHint();
  }

  function getStats() {
    return {
      totalPieces: _gridSize * _gridSize,
      placedPieces: _placedCount,
      hintsUsed: _hintsUsed,
      mistakes: _mistakes,
    };
  }

  function destroy() {
    if (_container) {
      _container.removeEventListener('mousedown', _onMouseDown);
      _container.removeEventListener('mousemove', _onMouseMove);
      _container.removeEventListener('mouseup', _onMouseUp);
      _container.removeEventListener('touchstart', _onTouchStart);
      _container.removeEventListener('touchmove', _onTouchMove);
      _container.removeEventListener('touchend', _onTouchEnd);
      _container.innerHTML = '';
    }
  }

  return { init, giveHint, getStats, destroy };
})();
