// ============================================================
// HistoPath India — Application Controller
// SPA router, view management, game flow orchestration
// ============================================================

const App = (() => {
  let _mainContent = null;
  let _currentView = null;
  let _currentGame = null;

  function init() {
    _mainContent = document.getElementById('main-content');

    // Hash routing
    window.addEventListener('hashchange', _onRoute);
    window.addEventListener('DOMContentLoaded', _onRoute);

    // Init guide
    Guide.init();

    // First run check
    _onRoute();
  }

  function _onRoute() {
    const hash = location.hash.slice(1) || '';
    const [view, ...params] = hash.split('/');

    // Clean up current game
    if (_currentGame) {
      if (_currentGame.destroy) _currentGame.destroy();
      _currentGame = null;
    }

    switch (view) {
      case 'play':
        _showTopics();
        break;
      case 'topic':
        _showTopic(params[0]);
        break;
      case 'mission':
        _showMission(params[0], params[1]);
        break;
      case 'quiz':
        _showQuiz(params[0], params[1]);
        break;
      case 'leaderboard':
        _showLeaderboard();
        break;
      case 'avatar':
        _showAvatarEditor();
        break;
      case 'about':
        _showAbout();
        break;
      default:
        _showHome();
        break;
    }
  }

  // ─── HOME ────────────────────────────────────────────────
  function _showHome() {
    _currentView = 'home';
    const player = Storage.getCurrentPlayer();
    const stats = Storage.getOverallStats();

    _mainContent.innerHTML = `
      <div class="home-hero">
        <div class="hero-glow"></div>
        <div class="hero-content fade-in">
          <div class="hero-icon">🔬</div>
          <h1 class="hero-title">
            <span class="text-gradient">HistoPath</span>
            <span style="color:var(--clr-accent-gold);">India</span>
          </h1>
          <p class="hero-subtitle">Master Oral Histology & Pathology Through Play</p>
          <p class="hero-reference">Based on <em>Shafer's Textbook of Oral Pathology</em></p>

          ${player ? `
            <div class="hero-player glass-card glass-card--no-hover">
              <div class="hero-player__avatar">${AvatarSystem.getSmallSVG(56)}</div>
              <div class="hero-player__info">
                <div class="hero-player__name">${player.name}</div>
                <div class="hero-player__stats">
                  ⭐ ${stats.totalStars} stars · ${stats.missionsCompleted}/${stats.totalMissions} missions
                </div>
                <div class="progress-bar" style="width:120px;margin-top:4px;">
                  <div class="progress-bar__fill" style="width:${(stats.missionsCompleted / stats.totalMissions) * 100}%"></div>
                </div>
              </div>
            </div>
          ` : ''}

          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" id="btn-start">
              ${player ? '▶ Continue Learning' : '🎮 Start Learning'}
            </button>
            ${!player ? '<button class="btn btn-ghost btn-lg" id="btn-avatar">🎭 Create Avatar</button>' : ''}
          </div>

          <div class="hero-features">
            <div class="feature-card">
              <div class="feature-card__icon">🧩</div>
              <div class="feature-card__label">Jigsaw Puzzles</div>
            </div>
            <div class="feature-card">
              <div class="feature-card__icon">🔍</div>
              <div class="feature-card__label">Find Differences</div>
            </div>
            <div class="feature-card">
              <div class="feature-card__icon">🔗</div>
              <div class="feature-card__label">Matching Games</div>
            </div>
            <div class="feature-card">
              <div class="feature-card__icon">✏️</div>
              <div class="feature-card__label">Crosswords</div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-start')?.addEventListener('click', () => {
      if (!player) {
        location.hash = '#avatar';
      } else {
        location.hash = '#play';
      }
    });

    document.getElementById('btn-avatar')?.addEventListener('click', () => {
      location.hash = '#avatar';
    });

    Guide.show();
    setTimeout(() => Guide.say("Namaste! 🙏 I'm Dantika, your oral histology guide! Ready to explore the microscopic world of teeth and tissues?", 6000), 800);
  }

  // ─── AVATAR EDITOR ───────────────────────────────────────
  function _showAvatarEditor() {
    _currentView = 'avatar';
    _mainContent.innerHTML = `
      <div class="view-container fade-in">
        <div class="view-header">
          <button class="btn btn-ghost btn-sm" onclick="location.hash='#'">← Back</button>
          <h2 class="view-title text-gradient">Create Your Avatar</h2>
        </div>
        <div id="avatar-editor-root"></div>
        <div style="text-align:center;margin-top:var(--sp-6);">
          <button class="btn btn-primary btn-lg" id="btn-save-avatar">✨ Save & Start</button>
        </div>
      </div>
    `;

    AvatarSystem.renderEditor(document.getElementById('avatar-editor-root'));

    document.getElementById('btn-save-avatar').addEventListener('click', () => {
      AvatarSystem.save();
      Audio.playMissionComplete();
      location.hash = '#play';
    });
  }

  // ─── TOPIC SELECT ────────────────────────────────────────
  function _showTopics() {
    _currentView = 'topics';

    let topicsHTML = '';
    TOPICS.forEach((topic, i) => {
      const progress = Storage.getTopicProgress(topic.id);
      const missions = getTopicMissions(topic.id);
      const completed = missions.filter(m => progress[m.id]?.completed).length;
      const totalStars = missions.reduce((sum, m) => sum + (progress[m.id]?.stars || 0), 0);
      const maxStars = missions.length * 3;
      const pct = missions.length > 0 ? Math.round((completed / missions.length) * 100) : 0;

      topicsHTML += `
        <div class="topic-card glass-card" data-topic="${topic.id}" style="animation-delay:${i * 0.08}s">
          <div class="topic-card__icon">${topic.icon}</div>
          <div class="topic-card__body">
            <h3 class="topic-card__title">${topic.title}</h3>
            <p class="topic-card__desc">${topic.description}</p>
            <div class="topic-card__stats">
              <span>⭐ ${totalStars}/${maxStars}</span>
              <span>📋 ${completed}/${missions.length} missions</span>
            </div>
            <div class="progress-bar">
              <div class="progress-bar__fill" style="width:${pct}%"></div>
            </div>
          </div>
          <div class="topic-card__arrow">→</div>
        </div>
      `;
    });

    _mainContent.innerHTML = `
      <div class="view-container fade-in">
        <nav class="view-nav">
          <button class="btn btn-ghost btn-sm" onclick="location.hash='#'">← Home</button>
          <div class="view-nav__right">
            <button class="btn btn-ghost btn-sm" onclick="location.hash='#leaderboard'">🏆 Leaderboard</button>
            <button class="btn btn-ghost btn-sm" onclick="location.hash='#avatar'">🎭 Avatar</button>
          </div>
        </nav>
        <h2 class="view-title text-gradient">Choose a Topic</h2>
        <p class="view-subtitle">Select a topic to explore its missions and games</p>
        <div class="topics-grid">${topicsHTML}</div>
      </div>
    `;

    // Click handlers
    _mainContent.querySelectorAll('.topic-card').forEach(card => {
      card.addEventListener('click', () => {
        const topicId = card.dataset.topic;
        Audio.playClick();
        location.hash = `#topic/${topicId}`;
      });
    });

    Guide.show();
  }

  // ─── TOPIC DETAIL (MISSIONS) ─────────────────────────────
  function _showTopic(topicId) {
    _currentView = 'topic';
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) { location.hash = '#play'; return; }

    const missions = getTopicMissions(topicId);
    const progress = Storage.getTopicProgress(topicId);

    let missionsHTML = '';
    let stageNumber = 0;

    // Group by stage
    const stages = {};
    missions.forEach(m => {
      if (!stages[m.stageId]) stages[m.stageId] = [];
      stages[m.stageId].push(m);
    });

    Object.entries(stages).forEach(([stageId, stageMissions]) => {
      stageNumber++;
      const stage = topic.stages.find(s => s.id === stageId);

      missionsHTML += `<div class="stage-group fade-in" style="animation-delay:${stageNumber * 0.1}s">
        <h3 class="stage-title">
          <span class="stage-number">Stage ${stageNumber}</span>
          ${stage?.title || stageId}
        </h3>
        <div class="mission-cards">`;

      stageMissions.forEach((m, mi) => {
        const mp = progress[m.id] || {};
        const locked = mi > 0 && !progress[stageMissions[mi - 1]?.id]?.completed;
        const stars = mp.stars || 0;
        const starsHTML = '★'.repeat(stars) + '☆'.repeat(3 - stars);
        const gameIcon = m.gameType === 'jigsaw' ? '🧩' : m.gameType === 'differences' ? '🔍' : m.gameType === 'matching' ? '🔗' : '✏️';

        missionsHTML += `
          <div class="mission-card glass-card ${locked ? 'locked' : ''} ${mp.completed ? 'completed' : ''}" data-mission="${m.id}" data-topic="${topicId}" ${locked ? '' : ''}>
            <div class="mission-card__game-icon">${gameIcon}</div>
            <div class="mission-card__body">
              <div class="mission-card__title">${m.title}</div>
              <div class="mission-card__type">${m.gameType.charAt(0).toUpperCase() + m.gameType.slice(1)} Game</div>
              <div class="mission-card__stars ${stars > 0 ? 'text-gold' : ''}">${starsHTML}</div>
            </div>
            ${locked ? '<div class="mission-card__lock">🔒</div>' : '<div class="mission-card__arrow">▶</div>'}
          </div>
        `;
      });

      missionsHTML += '</div></div>';
    });

    _mainContent.innerHTML = `
      <div class="view-container fade-in">
        <div class="view-header">
          <button class="btn btn-ghost btn-sm" onclick="location.hash='#play'">← Topics</button>
          <h2 class="view-title">${topic.icon} <span class="text-gradient">${topic.title}</span></h2>
        </div>
        <p class="view-subtitle">${topic.description}</p>
        ${missionsHTML}
      </div>
    `;

    _mainContent.querySelectorAll('.mission-card:not(.locked)').forEach(card => {
      card.addEventListener('click', () => {
        const mId = card.dataset.mission;
        const tId = card.dataset.topic;
        Audio.playClick();
        location.hash = `#mission/${tId}/${mId}`;
      });
    });

    Guide.show();
    Guide.sayWelcome(topic.title);
  }

  // ─── MISSION (GAME + QUIZ) ───────────────────────────────
  function _showMission(topicId, missionId) {
    _currentView = 'mission';
    const topic = TOPICS.find(t => t.id === topicId);
    const mission = getTopicMissions(topicId).find(m => m.id === missionId);
    if (!topic || !mission) { location.hash = '#play'; return; }

    _mainContent.innerHTML = `
      <div class="view-container fade-in">
        <div class="view-header">
          <button class="btn btn-ghost btn-sm" onclick="location.hash='#topic/${topicId}'">← ${topic.title}</button>
          <h2 class="view-title text-gradient">${mission.title}</h2>
        </div>
        <p class="view-subtitle">${mission.description || 'Complete the game, then answer the quiz!'}</p>

        <div class="mission-tabs">
          <button class="mission-tab active" id="tab-game">🎮 Game</button>
          <button class="mission-tab" id="tab-quiz">📝 Quiz</button>
        </div>

        <div class="game-toolbar">
          <button class="btn btn-ghost btn-sm" id="btn-hint">💡 Hint</button>
          <div id="game-timer" class="game-timer"></div>
          ${mission.gameType === 'crossword' ? '<button class="btn btn-ghost btn-sm" id="btn-check-crossword">✅ Check</button>' : ''}
        </div>

        <div id="game-area" class="game-area"></div>
      </div>
    `;

    const gameArea = document.getElementById('game-area');
    const timerEl = document.getElementById('game-timer');
    const timer = Timer.createStopwatch((time) => {
      timerEl.textContent = `⏱ ${Timer.format(time)}`;
    });

    // Start game
    _startGame(mission, gameArea, timer, topicId);

    // Hint button
    document.getElementById('btn-hint')?.addEventListener('click', () => {
      if (_currentGame?.giveHint) {
        _currentGame.giveHint();
        Guide.sayHint(mission.gameType);
      }
    });

    // Crossword check button
    document.getElementById('btn-check-crossword')?.addEventListener('click', () => {
      if (_currentGame?.checkAnswers) {
        _currentGame.checkAnswers();
      }
    });

    // Tab handlers
    document.getElementById('tab-game')?.addEventListener('click', () => {
      document.getElementById('tab-game').classList.add('active');
      document.getElementById('tab-quiz')?.classList.remove('active');
      const toolbar = document.querySelector('.game-toolbar');
      if (toolbar) toolbar.style.display = 'flex';
      _startGame(mission, gameArea, timer, topicId);
    });

    document.getElementById('tab-quiz')?.addEventListener('click', () => {
      document.getElementById('tab-quiz').classList.add('active');
      document.getElementById('tab-game').classList.remove('active');
      _startQuiz(topicId, mission.id, gameArea);
    });

    Guide.show();
  }

  function _startGame(mission, container, timer, topicId) {
    if (_currentGame && _currentGame.destroy) {
      _currentGame.destroy();
      _currentGame = null;
    }
    container.innerHTML = '';

    timer.start();

    const onComplete = (stats) => {
      timer.stop();
      Audio.playMissionComplete();

      // Highlight quiz tab
      const quizTab = document.getElementById('tab-quiz');
      if (quizTab) {
        quizTab.classList.add('pulse');
      }

      Guide.say("Game complete! 🎉 Now let's test your knowledge — click the Quiz tab! 📝", 5000);

      // Show transition
      const overlay = document.createElement('div');
      overlay.className = 'game-complete-overlay fade-in';
      overlay.innerHTML = `
        <div class="glass-card" style="text-align:center;padding:var(--sp-8);max-width:400px;">
          <div style="font-size:3rem;margin-bottom:var(--sp-4);">🎯</div>
          <h3 class="text-gradient" style="margin-bottom:var(--sp-2);">Game Complete!</h3>
          <p style="color:var(--clr-text-muted);margin-bottom:var(--sp-6);">Now test your knowledge with the quiz</p>
          <button class="btn btn-primary btn-lg" id="btn-go-quiz">📝 Start Quiz</button>
        </div>
      `;
      container.appendChild(overlay);

      document.getElementById('btn-go-quiz')?.addEventListener('click', () => {
        overlay.remove();
        _startQuiz(topicId, mission.id, container);
        document.getElementById('tab-quiz')?.classList.add('active');
        document.getElementById('tab-game')?.classList.remove('active');
      });
    };

    switch (mission.gameType) {
      case 'jigsaw':
        _currentGame = JigsawGame;
        JigsawGame.init(container, {
          gridSize: mission.puzzleData?.gridSize || 3,
          imageDesc: mission.puzzleData?.imageDesc || mission.title,
          onComplete,
        });
        break;

      case 'differences':
        _currentGame = DifferencesGame;
        DifferencesGame.init(container, {
          differences: mission.puzzleData?.differences || [],
          onComplete,
        });
        break;

      case 'matching':
        _currentGame = MatchingGame;
        MatchingGame.init(container, {
          pairs: mission.puzzleData?.pairs || mission.matchPairs || _generateMatchPairs(mission),
          onComplete,
        });
        break;

      case 'crossword':
        _currentGame = CrosswordGame;
        CrosswordGame.init(container, {
          words: mission.puzzleData?.words || mission.crosswordWords || _generateCrosswordWords(mission),
          onComplete,
        });
        break;
    }
  }

  function _generateMatchPairs(mission) {
    // Generate pairs from mission content
    const allPairs = [
      { image: 'Stratum basale', label: 'Deepest epithelial layer with mitotic cells' },
      { image: 'Stratum spinosum', label: 'Prickle cell layer with desmosomes' },
      { image: 'Stratum granulosum', label: 'Layer with keratohyalin granules' },
      { image: 'Stratum corneum', label: 'Outermost keratinized layer' },
      { image: 'Melanocyte', label: 'Neural crest-derived pigment cell' },
      { image: 'Langerhans cell', label: 'Antigen-presenting dendritic cell' },
      { image: 'Merkel cell', label: 'Mechanoreceptor in basal layer' },
      { image: 'Odontoblast', label: 'Dentin-forming cell from dental papilla' },
      { image: 'Ameloblast', label: 'Enamel-forming cell from IEE' },
      { image: 'Cementoblast', label: 'Cementum-forming cell from dental follicle' },
      { image: 'Osteoblast', label: 'Bone-forming cell on bone surface' },
      { image: 'Osteoclast', label: 'Large multinucleated bone-resorbing cell' },
      { image: 'Serous acinus', label: 'Enzyme-rich watery secretion' },
      { image: 'Mucous acinus', label: 'Viscous mucin-containing secretion' },
      { image: 'Striated duct', label: 'Duct with basal infoldings for ion transport' },
      { image: 'Intercalated duct', label: 'Smallest duct lined by cuboidal cells' },
      { image: 'Parotid gland', label: 'Purely serous major salivary gland' },
      { image: 'Sublingual gland', label: 'Predominantly mucous salivary gland' },
      { image: 'Enamel rod', label: 'Basic structural unit of enamel' },
      { image: 'Dentinal tubule', label: 'Contains the odontoblastic process' },
      { image: 'Sharpey fibers', label: 'PDL fibers embedded in cementum/bone' },
      { image: 'TMJ disc', label: 'Biconcave fibrocartilaginous structure' },
      { image: 'Junctional epithelium', label: 'Attaches to tooth via hemidesmosomes' },
      { image: 'Oblique fibers', label: 'Most numerous PDL fiber group' },
    ];

    // Shuffle and pick 6
    const shuffled = allPairs.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }

  function _generateCrosswordWords(mission) {
    const allWords = [
      { word: 'AMELOBLAST', clue: 'Enamel-forming cell derived from IEE' },
      { word: 'ODONTOBLAST', clue: 'Dentin-forming cell from dental papilla' },
      { word: 'ENAMEL', clue: 'Hardest tissue in the body, 96% inorganic' },
      { word: 'DENTIN', clue: 'Tubular calcified tissue forming bulk of tooth' },
      { word: 'PULP', clue: 'Soft connective tissue within the tooth' },
      { word: 'CEMENTUM', clue: 'Thin calcified layer covering root surface' },
      { word: 'MUCOSA', clue: 'Membrane lining the oral cavity' },
      { word: 'KERATIN', clue: 'Tough protein in surface epithelial cells' },
      { word: 'ACINUS', clue: 'Secretory unit of salivary gland' },
      { word: 'PAPILLA', clue: 'Tongue projection containing taste buds' },
      { word: 'SEROUS', clue: 'Type of acinus producing watery secretion' },
      { word: 'COLLAGEN', clue: 'Most abundant protein in connective tissue' },
      { word: 'LAMINA', clue: '___ propria: connective tissue below epithelium' },
      { word: 'OSTEON', clue: 'Haversian system — structural unit of compact bone' },
      { word: 'DISC', clue: 'Biconcave fibrocartilage in the TMJ' },
      { word: 'RETZIUS', clue: 'Striae of ___: incremental lines in enamel' },
      { word: 'MALASSEZ', clue: 'Epithelial rests of ___ from HERS remnants' },
      { word: 'BASALE', clue: 'Stratum ___: deepest epithelial layer' },
      { word: 'AMYLASE', clue: 'Salivary enzyme that digests starch' },
      { word: 'PAROTID', clue: 'Purely serous major salivary gland' },
      { word: 'GINGIVA', clue: 'Keratinized tissue surrounding teeth' },
      { word: 'FOLLICLE', clue: 'Dental ___: forms cementum, PDL, and bone' },
    ];

    const shuffled = allWords.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }

  function _startQuiz(topicId, missionId, container) {
    container.innerHTML = '';
    container.className = 'game-area';

    // Hide game toolbar
    const toolbar = document.querySelector('.game-toolbar');
    if (toolbar) toolbar.style.display = 'none';

    Quiz.init(container, missionId, (result) => {
      // Save progress
      Storage.saveMissionProgress(missionId, {
        completed: true,
        stars: result.stars,
        score: result.score,
      });

      if (result.action === 'retry') {
        location.hash = `#mission/${topicId}/${missionId}`;
      } else {
        // Go to next mission or back to topic
        const missions = getTopicMissions(topicId);
        const currentIdx = missions.findIndex(m => m.id === missionId);
        if (currentIdx < missions.length - 1) {
          location.hash = `#mission/${topicId}/${missions[currentIdx + 1].id}`;
        } else {
          location.hash = `#topic/${topicId}`;
        }
      }
    });
  }

  // ─── LEADERBOARD ─────────────────────────────────────────
  function _showLeaderboard() {
    _currentView = 'leaderboard';
    _mainContent.innerHTML = `
      <div class="view-container fade-in">
        <div class="view-header">
          <button class="btn btn-ghost btn-sm" onclick="location.hash='#play'">← Topics</button>
          <h2 class="view-title text-gradient">🏆 Leaderboard</h2>
        </div>
        <div id="leaderboard-root"></div>
      </div>
    `;

    Leaderboard.render(document.getElementById('leaderboard-root'));
    Guide.show();
  }

  // ─── ABOUT ───────────────────────────────────────────────
  function _showAbout() {
    _currentView = 'about';
    _mainContent.innerHTML = `
      <div class="view-container fade-in">
        <div class="view-header">
          <button class="btn btn-ghost btn-sm" onclick="location.hash='#'">← Home</button>
          <h2 class="view-title text-gradient">About HistoPath India</h2>
        </div>

        <div class="glass-card glass-card--no-hover" style="max-width:700px;margin:0 auto;">
          <h3>🎓 Educational Purpose</h3>
          <p>HistoPath India is a serious educational game designed specifically for Indian dental students
          to learn Oral Histology & Pathology through interactive gameplay.</p>

          <h3 style="margin-top:var(--sp-6);">📖 Academic Reference</h3>
          <p><em>Shafer's Textbook of Oral Pathology</em> — the gold standard reference
          used across Indian dental colleges for BDS and MDS education.</p>

          <h3 style="margin-top:var(--sp-6);">🎮 Game Design</h3>
          <p>Inspired by Amir et al. (2023) — "Serious game as a learning strategy for
          oral histology and embryology", incorporating evidence-based gamification principles
          including puzzle-based learning, immediate feedback, and spaced repetition.</p>

          <h3 style="margin-top:var(--sp-6);">📚 Topics Covered</h3>
          <ul style="color:var(--clr-text-secondary);line-height:1.8;">
            <li>🫁 Oral Mucosa — Classification, epithelial layers, lamina propria</li>
            <li>🦷 Tooth Development — Stages, enamel organ, root formation</li>
            <li>🔬 Tooth Structure — Enamel, dentin, pulp, cementum</li>
            <li>💧 Salivary Glands — Acini, ducts, major and minor glands</li>
            <li>🦴 Periodontium — PDL, alveolar bone, gingiva, junctional epithelium</li>
            <li>🏗️ TMJ & Bone — Articular disc, condyle, bone cells, remodeling</li>
          </ul>

          <h3 style="margin-top:var(--sp-6);">⚖️ Disclaimer</h3>
          <p style="color:var(--clr-text-muted);font-size:var(--fs-sm);">This game is for educational purposes only
          and is not a substitute for textbook study. All content is aligned with Shafer's Textbook
          and standard oral histology curricula in Indian dental colleges.</p>
        </div>
      </div>
    `;
  }

  // ─── HELPERS ─────────────────────────────────────────────
  function _showQuiz(topicId, missionId) {
    const gameArea = document.createElement('div');
    gameArea.className = 'game-area';
    _mainContent.innerHTML = '';
    _mainContent.appendChild(gameArea);
    _startQuiz(topicId, missionId, gameArea);
  }

  return { init };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
