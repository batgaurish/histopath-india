// ============================================================
// HistoPath India — Quiz Session Component
// 5 MCQs per mission with immediate feedback
// ============================================================

const Quiz = (() => {
  let _container = null;
  let _questions = [];
  let _currentIdx = 0;
  let _score = 0;
  let _answered = [];
  let _onComplete = null;

  function init(container, missionId, onComplete) {
    _container = container;
    _questions = shuffleArray(getQuestions(missionId));
    _currentIdx = 0;
    _score = 0;
    _answered = [];
    _onComplete = onComplete;

    if (_questions.length === 0) {
      container.innerHTML = '<p style="text-align:center;color:var(--clr-text-muted);">No questions available for this mission.</p>';
      return;
    }

    _render();
  }

  function _render() {
    _container.innerHTML = '';
    _container.className = 'game-area quiz-container';

    // Progress steps
    const progress = document.createElement('div');
    progress.className = 'quiz-progress';

    _questions.forEach((_, i) => {
      if (i > 0) {
        const line = document.createElement('div');
        line.className = 'quiz-progress__line';
        progress.appendChild(line);
      }

      const step = document.createElement('div');
      step.className = 'quiz-progress__step';
      if (i < _answered.length) {
        step.classList.add(_answered[i] ? 'correct' : 'wrong');
        step.textContent = _answered[i] ? '✓' : '✗';
      } else if (i === _currentIdx) {
        step.classList.add('current');
        step.textContent = i + 1;
      } else {
        step.textContent = i + 1;
      }
      progress.appendChild(step);
    });

    _container.appendChild(progress);

    // Score
    const scoreEl = document.createElement('div');
    scoreEl.style.cssText = 'text-align:right;font-size:var(--fs-sm);color:var(--clr-text-muted);margin-bottom:var(--sp-4);';
    scoreEl.textContent = `Score: ${_score} / ${_questions.length}`;
    _container.appendChild(scoreEl);

    if (_currentIdx >= _questions.length) {
      _showResults();
      return;
    }

    // Question
    const q = _questions[_currentIdx];
    const questionEl = document.createElement('div');
    questionEl.className = 'quiz-question fade-in';

    const qText = document.createElement('div');
    qText.className = 'quiz-question__text';
    qText.textContent = `Q${_currentIdx + 1}. ${q.q}`;
    questionEl.appendChild(qText);

    // Options
    const optionsEl = document.createElement('div');
    optionsEl.className = 'quiz-options';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, i) => {
      const optEl = document.createElement('div');
      optEl.className = 'quiz-option';
      optEl.innerHTML = `<div class="quiz-option__letter">${letters[i]}</div><span>${opt}</span>`;
      optEl.addEventListener('click', () => _selectAnswer(i, q, optionsEl, questionEl));
      optionsEl.appendChild(optEl);
    });

    questionEl.appendChild(optionsEl);
    _container.appendChild(questionEl);
  }

  function _selectAnswer(idx, question, optionsEl, questionEl) {
    // Prevent double-click
    if (optionsEl.querySelector('.disabled')) return;

    const isCorrect = idx === question.correct;
    const options = optionsEl.querySelectorAll('.quiz-option');

    options.forEach((opt, i) => {
      opt.classList.add('disabled');
      if (i === question.correct) {
        opt.classList.add('correct');
      }
      if (i === idx && !isCorrect) {
        opt.classList.add('wrong');
      }
    });

    if (isCorrect) {
      _score++;
      _answered.push(true);
      Audio.playCorrect();
      Guide.sayCorrect();
    } else {
      _answered.push(false);
      Audio.playWrong();
      Guide.sayWrong();
    }

    // Feedback
    const feedback = document.createElement('div');
    feedback.className = `quiz-feedback quiz-feedback--${isCorrect ? 'correct' : 'wrong'}`;
    feedback.innerHTML = `
      <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong><br>
      ${question.explanation}
    `;
    questionEl.appendChild(feedback);

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.style.cssText = 'margin-top:var(--sp-4);width:100%;';
    nextBtn.textContent = _currentIdx < _questions.length - 1 ? 'Next Question →' : 'See Results';
    nextBtn.addEventListener('click', () => {
      _currentIdx++;
      _render();
    });
    questionEl.appendChild(nextBtn);
  }

  function _showResults() {
    const stars = _score >= 5 ? 3 : _score >= 3 ? 2 : _score >= 1 ? 1 : 0;

    const results = document.createElement('div');
    results.className = 'results-container fade-in';

    // Stars
    const starsEl = document.createElement('div');
    starsEl.className = 'results-stars';
    for (let i = 0; i < 3; i++) {
      const star = document.createElement('div');
      star.className = 'results-star';
      star.textContent = '★';
      if (i < stars) {
        setTimeout(() => {
          star.classList.add('earned');
          Audio.playStar();
        }, (i + 1) * 400);
      }
      starsEl.appendChild(star);
    }
    results.appendChild(starsEl);

    // Score
    const scoreEl = document.createElement('div');
    scoreEl.className = 'results-score text-gradient';
    scoreEl.textContent = `${_score} / ${_questions.length}`;
    results.appendChild(scoreEl);

    const label = document.createElement('div');
    label.className = 'results-label';
    label.textContent = stars === 3 ? 'Perfect Score!' : stars === 2 ? 'Great Job!' : stars === 1 ? 'Good Effort!' : 'Keep Practicing!';
    results.appendChild(label);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'results-actions';

    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn btn-ghost';
    retryBtn.textContent = '🔄 Retry Mission';
    retryBtn.addEventListener('click', () => {
      if (_onComplete) _onComplete({ score: _score, stars, action: 'retry' });
    });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = 'Continue →';
    nextBtn.addEventListener('click', () => {
      if (_onComplete) _onComplete({ score: _score, stars, action: 'next' });
    });

    actions.appendChild(retryBtn);
    actions.appendChild(nextBtn);
    results.appendChild(actions);

    _container.appendChild(results);

    // Dantika feedback
    setTimeout(() => Guide.sayMissionComplete(stars), 1500);

    // Confetti for 3 stars
    if (stars === 3) {
      setTimeout(_showConfetti, 800);
    }

    Audio.playMissionComplete();
  }

  function _showConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#38E0BB', '#9B64FF', '#FFD700', '#FF6B8A', '#00D4FF', '#FF8C42'];

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'confetti-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      particle.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      particle.style.animationDelay = Math.random() * 0.5 + 's';
      particle.style.width = (4 + Math.random() * 8) + 'px';
      particle.style.height = (4 + Math.random() * 8) + 'px';
      container.appendChild(particle);
    }

    setTimeout(() => container.remove(), 4000);
  }

  function getScore() {
    return { score: _score, total: _questions.length };
  }

  return { init, getScore };
})();
