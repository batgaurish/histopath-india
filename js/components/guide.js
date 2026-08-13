// ============================================================
// HistoPath India — Dantika Guide Character
// Floating guide with speech bubbles and typewriter text
// ============================================================

const Guide = (() => {
  let _wrapper = null;
  let _bubble = null;
  let _character = null;
  let _typeTimer = null;
  let _visible = false;
  let _autoHideTimer = null;

  function init() {
    if (_wrapper) return;

    _wrapper = document.createElement('div');
    _wrapper.className = 'guide-wrapper';
    _wrapper.id = 'guide-wrapper';
    _wrapper.style.display = 'none';

    _bubble = document.createElement('div');
    _bubble.className = 'guide-bubble';
    _bubble.style.display = 'none';
    _bubble.innerHTML = '<div class="guide-bubble__text" id="guide-text"></div>';

    _character = document.createElement('div');
    _character.className = 'guide-character';
    _character.innerHTML = '🦷';
    _character.title = 'Dantika — Your Guide';
    _character.addEventListener('click', () => {
      if (_bubble.style.display === 'none') {
        say("Hi! I'm Dantika, your oral histology guide! 🦷✨ Click on me anytime for hints!", 6000);
      } else {
        hideBubble();
      }
    });

    _wrapper.appendChild(_bubble);
    _wrapper.appendChild(_character);
    document.body.appendChild(_wrapper);
  }

  function show() {
    init();
    _wrapper.style.display = 'flex';
    _visible = true;
  }

  function hide() {
    if (_wrapper) {
      _wrapper.style.display = 'none';
      _visible = false;
    }
  }

  function say(text, duration = 5000) {
    init();
    show();

    clearTimeout(_typeTimer);
    clearTimeout(_autoHideTimer);

    const textEl = document.getElementById('guide-text');
    if (!textEl) return;

    _bubble.style.display = 'block';
    _bubble.style.animation = 'none';
    _bubble.offsetHeight; // reflow
    _bubble.style.animation = 'scaleIn 0.3s var(--ease-spring)';

    // Typewriter effect
    textEl.textContent = '';
    let i = 0;
    const speed = 20;

    function typeChar() {
      if (i < text.length) {
        textEl.textContent += text[i];
        i++;
        _typeTimer = setTimeout(typeChar, speed);
      }
    }
    typeChar();

    if (duration > 0) {
      _autoHideTimer = setTimeout(hideBubble, duration + text.length * speed);
    }
  }

  function hideBubble() {
    if (_bubble) {
      _bubble.style.display = 'none';
    }
    clearTimeout(_typeTimer);
    clearTimeout(_autoHideTimer);
  }

  function sayWelcome(topicTitle) {
    say(`Welcome to ${topicTitle}! Let's explore the microscopic world together. Complete the puzzle first, then answer the quiz! 🔬`, 7000);
  }

  function sayHint(gameType) {
    const hints = {
      jigsaw: "Tip: Look at the colors and cell patterns to find where each piece belongs! 🧩",
      differences: "Tip: Compare the cell shapes and colors carefully. Look at the nuclei! 🔍",
      matching: "Tip: Read the descriptions carefully — think about what each tissue looks like under a microscope! 🤔",
      crossword: "Tip: Use the clues to recall your histology terms. Try the ones you're sure about first! ✏️",
    };
    say(hints[gameType] || "Need a hint? Click the hint button! 💡", 5000);
  }

  function sayCorrect() {
    const msgs = [
      "Excellent! That's correct! 🎉",
      "Well done! Your histology knowledge is growing! ⭐",
      "Perfect answer! Keep it up! 💪",
      "Absolutely right! Shafer would be proud! 📖",
      "Correct! You're mastering oral histology! 🦷✨",
    ];
    say(msgs[Math.floor(Math.random() * msgs.length)], 3000);
  }

  function sayWrong() {
    const msgs = [
      "Not quite! But don't worry — let's learn from this! 📚",
      "Good try! Review the explanation carefully. 🤔",
      "Almost! Check the feedback to understand better. 💡",
    ];
    say(msgs[Math.floor(Math.random() * msgs.length)], 3500);
  }

  function sayMissionComplete(stars) {
    const msgs = {
      3: "Outstanding! 3 stars! You've truly mastered this topic! 🌟🌟🌟",
      2: "Great job! 2 stars! Almost perfect — try again for 3! ⭐⭐",
      1: "Good effort! 1 star! Practice makes perfect — give it another go! ⭐",
    };
    say(msgs[stars] || msgs[1], 5000);
  }

  function sayFeedback(explanation) {
    say(`📖 ${explanation}`, 8000);
  }

  function setExpression(expr) {
    if (!_character) return;
    const faces = {
      neutral: '🦷',
      happy: '😊',
      thinking: '🤔',
      celebrating: '🎉',
      hint: '💡',
    };
    _character.innerHTML = faces[expr] || '🦷';
  }

  return {
    init,
    show,
    hide,
    say,
    hideBubble,
    sayWelcome,
    sayHint,
    sayCorrect,
    sayWrong,
    sayMissionComplete,
    sayFeedback,
    setExpression,
  };
})();
