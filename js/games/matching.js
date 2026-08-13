// ============================================================
// HistoPath India — Match the Pictures Engine
// Match histology structures to their labels
// ============================================================

const MatchingGame = (() => {
  let _container = null;
  let _pairs = [];
  let _selectedLeft = null;
  let _selectedRight = null;
  let _matched = [];
  let _hintsUsed = 0;
  let _mistakes = 0;
  let _onComplete = null;

  function init(container, options = {}) {
    _container = container;
    _pairs = options.pairs || [];
    _matched = [];
    _selectedLeft = null;
    _selectedRight = null;
    _hintsUsed = 0;
    _mistakes = 0;
    _onComplete = options.onComplete || null;

    _container.innerHTML = '';
    _container.className = 'game-area match-container';

    // Left column - descriptions/images
    const leftCol = document.createElement('div');
    leftCol.className = 'match-column';
    leftCol.innerHTML = '<div class="diff-label" style="margin-bottom:8px;">Structures</div>';

    // Right column - labels (shuffled)
    const rightCol = document.createElement('div');
    rightCol.className = 'match-column';
    rightCol.innerHTML = '<div class="diff-label" style="margin-bottom:8px;">Labels</div>';

    // Divider
    const divider = document.createElement('div');
    divider.className = 'match-divider';

    // Shuffle right side
    const shuffledLabels = [..._pairs].sort(() => Math.random() - 0.5);

    _pairs.forEach((pair, i) => {
      const leftItem = document.createElement('div');
      leftItem.className = 'match-item';
      leftItem.dataset.idx = i;
      leftItem.dataset.side = 'left';
      leftItem.textContent = pair.image;
      leftItem.addEventListener('click', () => _selectItem('left', i, leftItem));
      leftCol.appendChild(leftItem);
    });

    shuffledLabels.forEach((pair, i) => {
      const rightItem = document.createElement('div');
      rightItem.className = 'match-item';
      rightItem.dataset.origIdx = _pairs.indexOf(pair);
      rightItem.dataset.side = 'right';
      rightItem.textContent = pair.label;
      rightItem.addEventListener('click', () => _selectItem('right', _pairs.indexOf(pair), rightItem));
      rightCol.appendChild(rightItem);
    });

    _container.appendChild(leftCol);
    _container.appendChild(divider);
    _container.appendChild(rightCol);
  }

  function _selectItem(side, idx, el) {
    if (_matched.includes(idx) && side === 'left') return;
    if (el.classList.contains('correct')) return;

    Audio.playClick();

    if (side === 'left') {
      // Deselect previous left
      _container.querySelectorAll('.match-item[data-side="left"]').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      _selectedLeft = idx;

      if (_selectedRight !== null) {
        _checkMatch();
      }
    } else {
      // Deselect previous right
      _container.querySelectorAll('.match-item[data-side="right"]').forEach(e => e.classList.remove('selected'));
      el.classList.add('selected');
      _selectedRight = idx;

      if (_selectedLeft !== null) {
        _checkMatch();
      }
    }
  }

  function _checkMatch() {
    const leftEl = _container.querySelector(`.match-item[data-side="left"][data-idx="${_selectedLeft}"]`);
    const rightEl = _container.querySelector(`.match-item[data-side="right"][data-orig-idx="${_selectedRight}"]`);

    if (!leftEl || !rightEl) return;

    if (_selectedLeft === _selectedRight) {
      // Correct match!
      leftEl.classList.remove('selected');
      rightEl.classList.remove('selected');
      leftEl.classList.add('correct');
      rightEl.classList.add('correct');
      _matched.push(_selectedLeft);
      Audio.playCorrect();

      if (_matched.length === _pairs.length) {
        setTimeout(() => {
          if (_onComplete) _onComplete({ hintsUsed: _hintsUsed, mistakes: _mistakes });
        }, 500);
      }
    } else {
      // Incorrect
      leftEl.classList.add('incorrect');
      rightEl.classList.add('incorrect');
      _mistakes++;
      Audio.playWrong();

      setTimeout(() => {
        leftEl.classList.remove('selected', 'incorrect');
        rightEl.classList.remove('selected', 'incorrect');
      }, 600);
    }

    _selectedLeft = null;
    _selectedRight = null;
  }

  function giveHint() {
    const unmatched = [];
    for (let i = 0; i < _pairs.length; i++) {
      if (!_matched.includes(i)) unmatched.push(i);
    }
    if (unmatched.length === 0) return;

    _hintsUsed++;
    const idx = unmatched[0];

    const leftEl = _container.querySelector(`.match-item[data-side="left"][data-idx="${idx}"]`);
    const rightEl = _container.querySelector(`.match-item[data-side="right"][data-orig-idx="${idx}"]`);

    if (leftEl && rightEl) {
      leftEl.style.boxShadow = '0 0 15px rgba(255, 200, 50, 0.6)';
      rightEl.style.boxShadow = '0 0 15px rgba(255, 200, 50, 0.6)';
      setTimeout(() => {
        leftEl.style.boxShadow = '';
        rightEl.style.boxShadow = '';
      }, 2500);
    }
    Audio.playHint();
  }

  function getStats() {
    return { totalPairs: _pairs.length, matched: _matched.length, hintsUsed: _hintsUsed, mistakes: _mistakes };
  }

  function destroy() {
    if (_container) _container.innerHTML = '';
  }

  return { init, giveHint, getStats, destroy };
})();
