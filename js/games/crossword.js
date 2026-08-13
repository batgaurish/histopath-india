// ============================================================
// HistoPath India — Crossword Puzzle Engine
// Interactive crossword with histology terms and clues
// ============================================================

const CrosswordGame = (() => {
  let _container = null;
  let _words = [];
  let _grid = [];
  let _gridSize = 0;
  let _placedWords = [];
  let _activeCell = null;
  let _activeDirection = 'across';
  let _hintsUsed = 0;
  let _onComplete = null;

  function init(container, options = {}) {
    _container = container;
    _words = (options.words || []).map(w => ({ ...w, word: w.word.toUpperCase() }));
    _hintsUsed = 0;
    _onComplete = options.onComplete || null;
    _activeCell = null;
    _activeDirection = 'across';

    _generateGrid();
    _render();
  }

  function _generateGrid() {
    // Sort words by length (longest first)
    const sorted = [..._words].sort((a, b) => b.word.length - a.word.length);
    _gridSize = Math.max(12, sorted[0]?.word.length + 2 || 12);
    _grid = Array.from({ length: _gridSize }, () => Array(_gridSize).fill(null));
    _placedWords = [];

    // Place first word horizontally in center
    if (sorted.length > 0) {
      const firstWord = sorted[0];
      const startRow = Math.floor(_gridSize / 2);
      const startCol = Math.floor((_gridSize - firstWord.word.length) / 2);
      _placeWord(firstWord, startRow, startCol, 'across');
    }

    // Try to place remaining words
    for (let i = 1; i < sorted.length; i++) {
      _tryPlaceWord(sorted[i]);
    }
  }

  function _placeWord(wordObj, row, col, direction) {
    const letters = wordObj.word.split('');
    const cells = [];

    letters.forEach((letter, idx) => {
      const r = direction === 'across' ? row : row + idx;
      const c = direction === 'across' ? col + idx : col;
      _grid[r][c] = { letter, revealed: false, userLetter: '' };
      cells.push({ r, c });
    });

    _placedWords.push({
      ...wordObj,
      row, col, direction, cells,
      number: _placedWords.length + 1,
    });
  }

  function _tryPlaceWord(wordObj) {
    // Try to find an intersection with already-placed words
    for (const placed of _placedWords) {
      for (let pi = 0; pi < placed.word.length; pi++) {
        for (let wi = 0; wi < wordObj.word.length; wi++) {
          if (placed.word[pi] === wordObj.word[wi]) {
            const newDir = placed.direction === 'across' ? 'down' : 'across';
            let newRow, newCol;

            if (newDir === 'down') {
              newRow = placed.row - wi;
              newCol = placed.col + pi;
            } else {
              newRow = placed.row + pi;
              newCol = placed.col - wi;
            }

            if (_canPlace(wordObj.word, newRow, newCol, newDir)) {
              _placeWord(wordObj, newRow, newCol, newDir);
              return;
            }
          }
        }
      }
    }

    // Fallback: place independently
    for (let attempts = 0; attempts < 50; attempts++) {
      const dir = Math.random() > 0.5 ? 'across' : 'down';
      const maxR = dir === 'across' ? _gridSize - 1 : _gridSize - wordObj.word.length;
      const maxC = dir === 'across' ? _gridSize - wordObj.word.length : _gridSize - 1;
      if (maxR < 0 || maxC < 0) continue;

      const r = Math.floor(Math.random() * (maxR + 1));
      const c = Math.floor(Math.random() * (maxC + 1));

      if (_canPlace(wordObj.word, r, c, dir)) {
        _placeWord(wordObj, r, c, dir);
        return;
      }
    }
  }

  function _canPlace(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
      const r = direction === 'across' ? row : row + i;
      const c = direction === 'across' ? col + i : col;

      if (r < 0 || r >= _gridSize || c < 0 || c >= _gridSize) return false;

      const existing = _grid[r][c];
      if (existing && existing.letter !== word[i]) return false;
    }
    return true;
  }

  function _render() {
    _container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'crossword-container';

    // Grid
    const gridEl = document.createElement('div');
    gridEl.className = 'crossword-grid';
    gridEl.style.gridTemplateColumns = `repeat(${_gridSize}, 1fr)`;

    // Find which cells have numbers
    const numberMap = {};
    _placedWords.forEach(pw => {
      const key = `${pw.row}-${pw.col}`;
      if (!numberMap[key]) numberMap[key] = pw.number;
    });

    for (let r = 0; r < _gridSize; r++) {
      for (let c = 0; c < _gridSize; c++) {
        const cell = document.createElement('div');
        const data = _grid[r][c];

        if (!data) {
          cell.className = 'crossword-cell empty';
        } else {
          cell.className = 'crossword-cell';
          cell.dataset.row = r;
          cell.dataset.col = c;
          cell.setAttribute('tabindex', '0');

          const numKey = `${r}-${c}`;
          if (numberMap[numKey]) {
            const numEl = document.createElement('span');
            numEl.className = 'crossword-cell__number';
            numEl.textContent = numberMap[numKey];
            cell.appendChild(numEl);
          }

          // Display user letter or empty
          const letterSpan = document.createElement('span');
          letterSpan.className = 'crossword-cell__letter';
          letterSpan.textContent = data.revealed ? data.letter : (data.userLetter || '');
          cell.appendChild(letterSpan);

          cell.addEventListener('click', () => _selectCell(r, c));
          cell.addEventListener('keydown', (e) => _handleKey(e, r, c));
        }

        gridEl.appendChild(cell);
      }
    }

    wrapper.appendChild(gridEl);

    // Clues
    const cluesEl = document.createElement('div');
    cluesEl.className = 'crossword-clues';

    const acrossWords = _placedWords.filter(w => w.direction === 'across');
    const downWords = _placedWords.filter(w => w.direction === 'down');

    if (acrossWords.length) {
      const h4 = document.createElement('h4');
      h4.textContent = 'Across';
      cluesEl.appendChild(h4);
      acrossWords.forEach(w => {
        const clue = document.createElement('div');
        clue.className = 'crossword-clue';
        clue.dataset.wordNum = w.number;
        clue.innerHTML = `<span class="crossword-clue__num">${w.number}.</span> ${w.clue}`;
        clue.addEventListener('click', () => {
          _activeDirection = 'across';
          _selectCell(w.row, w.col);
        });
        cluesEl.appendChild(clue);
      });
    }

    if (downWords.length) {
      const h4 = document.createElement('h4');
      h4.textContent = 'Down';
      cluesEl.appendChild(h4);
      downWords.forEach(w => {
        const clue = document.createElement('div');
        clue.className = 'crossword-clue';
        clue.dataset.wordNum = w.number;
        clue.innerHTML = `<span class="crossword-clue__num">${w.number}.</span> ${w.clue}`;
        clue.addEventListener('click', () => {
          _activeDirection = 'down';
          _selectCell(w.row, w.col);
        });
        cluesEl.appendChild(clue);
      });
    }

    wrapper.appendChild(cluesEl);
    _container.appendChild(wrapper);
  }

  function _selectCell(r, c) {
    // Clear previous highlights
    _container.querySelectorAll('.crossword-cell').forEach(el => {
      el.classList.remove('active', 'highlighted');
    });
    _container.querySelectorAll('.crossword-clue').forEach(el => {
      el.classList.remove('active');
    });

    _activeCell = { r, c };

    // Highlight current cell
    const cellEl = _container.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`);
    if (cellEl) {
      cellEl.classList.add('active');
      cellEl.focus();
    }

    // Highlight word containing this cell
    const word = _findWordAt(r, c, _activeDirection) || _findWordAt(r, c, _activeDirection === 'across' ? 'down' : 'across');
    if (word) {
      _activeDirection = word.direction;
      word.cells.forEach(({ r: cr, c: cc }) => {
        const el = _container.querySelector(`.crossword-cell[data-row="${cr}"][data-col="${cc}"]`);
        if (el && !(cr === r && cc === c)) el.classList.add('highlighted');
      });

      // Highlight clue
      const clueEl = _container.querySelector(`.crossword-clue[data-word-num="${word.number}"]`);
      if (clueEl) clueEl.classList.add('active');
    }
  }

  function _findWordAt(r, c, direction) {
    return _placedWords.find(w =>
      w.direction === direction && w.cells.some(cell => cell.r === r && cell.c === c)
    );
  }

  function _handleKey(e, r, c) {
    const data = _grid[r]?.[c];
    if (!data || data.revealed) return;

    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
      data.userLetter = e.key.toUpperCase();

      // Update display
      const cellEl = _container.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`);
      const letterSpan = cellEl?.querySelector('.crossword-cell__letter');
      if (letterSpan) letterSpan.textContent = data.userLetter;

      Audio.playClick();

      // Move to next cell
      _moveToNext(r, c);
      _checkCompletion();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      data.userLetter = '';
      const cellEl = _container.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`);
      const letterSpan = cellEl?.querySelector('.crossword-cell__letter');
      if (letterSpan) letterSpan.textContent = '';
      _moveToPrev(r, c);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      _activeDirection = 'across';
      _moveToNext(r, c);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      _activeDirection = 'down';
      _moveToNext(r, c);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      _activeDirection = 'across';
      _moveToPrev(r, c);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      _activeDirection = 'down';
      _moveToPrev(r, c);
    }
  }

  function _moveToNext(r, c) {
    const nr = _activeDirection === 'down' ? r + 1 : r;
    const nc = _activeDirection === 'across' ? c + 1 : c;
    if (nr < _gridSize && nc < _gridSize && _grid[nr]?.[nc]) {
      _selectCell(nr, nc);
    }
  }

  function _moveToPrev(r, c) {
    const nr = _activeDirection === 'down' ? r - 1 : r;
    const nc = _activeDirection === 'across' ? c - 1 : c;
    if (nr >= 0 && nc >= 0 && _grid[nr]?.[nc]) {
      _selectCell(nr, nc);
    }
  }

  function _checkCompletion() {
    let allCorrect = true;
    let allFilled = true;

    for (let r = 0; r < _gridSize; r++) {
      for (let c = 0; c < _gridSize; c++) {
        const data = _grid[r][c];
        if (!data) continue;
        if (!data.revealed && !data.userLetter) { allFilled = false; allCorrect = false; }
        else if (!data.revealed && data.userLetter !== data.letter) { allCorrect = false; }
      }
    }

    if (allFilled && allCorrect) {
      // Mark all correct
      _container.querySelectorAll('.crossword-cell:not(.empty)').forEach(el => {
        el.classList.add('correct');
      });
      Audio.playMissionComplete();
      setTimeout(() => {
        if (_onComplete) _onComplete({ hintsUsed: _hintsUsed, mistakes: 0 });
      }, 800);
    }
  }

  function checkAnswers() {
    let mistakes = 0;
    for (let r = 0; r < _gridSize; r++) {
      for (let c = 0; c < _gridSize; c++) {
        const data = _grid[r][c];
        if (!data || data.revealed) continue;

        const cellEl = _container.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`);
        if (!cellEl) continue;

        if (data.userLetter === data.letter) {
          cellEl.classList.add('correct');
          cellEl.classList.remove('incorrect');
        } else if (data.userLetter) {
          cellEl.classList.add('incorrect');
          cellEl.classList.remove('correct');
          mistakes++;
        }
      }
    }
    if (mistakes > 0) Audio.playWrong();
    else {
      Audio.playCorrect();
      setTimeout(() => {
        if (_onComplete) _onComplete({ hintsUsed: _hintsUsed, mistakes: 0 });
      }, 600);
    }
    return mistakes;
  }

  function giveHint() {
    // Reveal one unrevealed, unfilled cell
    for (const pw of _placedWords) {
      for (const { r, c } of pw.cells) {
        const data = _grid[r][c];
        if (data && !data.revealed && data.userLetter !== data.letter) {
          data.revealed = true;
          data.userLetter = data.letter;
          _hintsUsed++;

          const cellEl = _container.querySelector(`.crossword-cell[data-row="${r}"][data-col="${c}"]`);
          const letterSpan = cellEl?.querySelector('.crossword-cell__letter');
          if (letterSpan) letterSpan.textContent = data.letter;
          if (cellEl) {
            cellEl.classList.add('correct');
            cellEl.style.color = 'var(--clr-accent-gold)';
          }

          Audio.playHint();
          _checkCompletion();
          return;
        }
      }
    }
  }

  function getStats() {
    let filled = 0, total = 0, correct = 0;
    for (let r = 0; r < _gridSize; r++) {
      for (let c = 0; c < _gridSize; c++) {
        if (!_grid[r][c]) continue;
        total++;
        if (_grid[r][c].userLetter || _grid[r][c].revealed) filled++;
        if (_grid[r][c].userLetter === _grid[r][c].letter || _grid[r][c].revealed) correct++;
      }
    }
    return { total, filled, correct, hintsUsed: _hintsUsed };
  }

  function destroy() {
    if (_container) _container.innerHTML = '';
  }

  return { init, checkAnswers, giveHint, getStats, destroy };
})();
