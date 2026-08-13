// ============================================================
// HistoPath India — Avatar System
// SVG-based avatar builder with customization
// ============================================================

const AvatarSystem = (() => {
  const SKIN_TONES = ['#FFDBB4', '#EDB98A', '#D08B5B', '#AE5D29', '#694D3D', '#3B2219'];
  const HAIR_COLORS = ['#090806', '#2C222B', '#71635A', '#B7A69E', '#D6C4C2', '#CABFB1', '#A55728', '#B55239', '#8D4A43', '#CB6D51'];
  const HAIR_STYLES = ['short', 'medium', 'long', 'curly', 'bun', 'ponytail'];
  const FACE_SHAPES = ['round', 'oval', 'square'];
  const ACCESSORIES = ['none', 'glasses', 'mask', 'stethoscope'];

  const EXPRESSIONS = {
    neutral: { eyeH: 4, mouthCurve: 0 },
    happy: { eyeH: 3, mouthCurve: 5 },
    thinking: { eyeH: 5, mouthCurve: -2 },
    celebrating: { eyeH: 2, mouthCurve: 8 },
  };

  let _current = {
    face: 0,
    skinTone: 2,
    hair: 0,
    hairColor: 0,
    accessory: 0,
    expression: 'neutral',
  };

  function generateSVG(options = {}, size = 120) {
    const o = { ..._current, ...options };
    const skin = SKIN_TONES[o.skinTone] || SKIN_TONES[0];
    const hairClr = HAIR_COLORS[o.hairColor] || HAIR_COLORS[0];
    const expr = EXPRESSIONS[o.expression] || EXPRESSIONS.neutral;
    const cx = size / 2;
    const cy = size / 2;
    const r = size * 0.38;

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;

    // Background circle
    svg += `<circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="url(#avatarGrad)" opacity="0.3"/>`;
    svg += `<defs><linearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38E0BB"/>
      <stop offset="100%" stop-color="#9B64FF"/>
    </linearGradient></defs>`;

    // Face
    svg += `<circle cx="${cx}" cy="${cy + 4}" r="${r}" fill="${skin}"/>`;

    // Hair (simplified styles)
    const hairTop = cy - r + 2;
    if (o.hair <= 1) {
      // Short/medium
      svg += `<path d="M${cx - r} ${cy - 4} Q${cx - r} ${hairTop - 8} ${cx} ${hairTop - 10} Q${cx + r} ${hairTop - 8} ${cx + r} ${cy - 4}" fill="${hairClr}" />`;
    } else if (o.hair === 2) {
      // Long
      svg += `<path d="M${cx - r} ${cy - 4} Q${cx - r} ${hairTop - 12} ${cx} ${hairTop - 14} Q${cx + r} ${hairTop - 12} ${cx + r} ${cy - 4}" fill="${hairClr}" />`;
      svg += `<path d="M${cx - r - 3} ${cy - 4} Q${cx - r - 5} ${cy + r} ${cx - r + 8} ${cy + r + 10}" fill="${hairClr}" stroke="none"/>`;
      svg += `<path d="M${cx + r + 3} ${cy - 4} Q${cx + r + 5} ${cy + r} ${cx + r - 8} ${cy + r + 10}" fill="${hairClr}" stroke="none"/>`;
    } else if (o.hair === 3) {
      // Curly
      for (let a = -140; a <= -40; a += 15) {
        const rad = a * Math.PI / 180;
        const hx = cx + (r + 5) * Math.cos(rad);
        const hy = cy + 4 + (r + 5) * Math.sin(rad);
        svg += `<circle cx="${hx}" cy="${hy}" r="8" fill="${hairClr}"/>`;
      }
    } else if (o.hair === 4) {
      // Bun
      svg += `<path d="M${cx - r} ${cy - 4} Q${cx - r} ${hairTop - 8} ${cx} ${hairTop - 10} Q${cx + r} ${hairTop - 8} ${cx + r} ${cy - 4}" fill="${hairClr}" />`;
      svg += `<circle cx="${cx}" cy="${hairTop - 16}" r="12" fill="${hairClr}"/>`;
    } else {
      // Ponytail
      svg += `<path d="M${cx - r} ${cy - 4} Q${cx - r} ${hairTop - 8} ${cx} ${hairTop - 10} Q${cx + r} ${hairTop - 8} ${cx + r} ${cy - 4}" fill="${hairClr}" />`;
      svg += `<path d="M${cx + r - 5} ${cy - 10} Q${cx + r + 15} ${cy + 5} ${cx + r + 10} ${cy + 25}" stroke="${hairClr}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
    }

    // Eyes
    const eyeY = cy + 2;
    const eyeSpacing = r * 0.3;
    svg += `<ellipse cx="${cx - eyeSpacing}" cy="${eyeY}" rx="3" ry="${expr.eyeH}" fill="#333"/>`;
    svg += `<ellipse cx="${cx + eyeSpacing}" cy="${eyeY}" rx="3" ry="${expr.eyeH}" fill="#333"/>`;

    // Eye shine
    svg += `<circle cx="${cx - eyeSpacing + 1}" cy="${eyeY - 1}" r="1.2" fill="white" opacity="0.7"/>`;
    svg += `<circle cx="${cx + eyeSpacing + 1}" cy="${eyeY - 1}" r="1.2" fill="white" opacity="0.7"/>`;

    // Mouth
    const mouthY = cy + r * 0.4;
    if (expr.mouthCurve > 0) {
      svg += `<path d="M${cx - 8} ${mouthY} Q${cx} ${mouthY + expr.mouthCurve} ${cx + 8} ${mouthY}" stroke="#333" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    } else if (expr.mouthCurve < 0) {
      svg += `<path d="M${cx - 6} ${mouthY + 2} Q${cx} ${mouthY + expr.mouthCurve} ${cx + 6} ${mouthY + 2}" stroke="#333" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
    } else {
      svg += `<line x1="${cx - 6}" y1="${mouthY}" x2="${cx + 6}" y2="${mouthY}" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>`;
    }

    // Nose
    svg += `<path d="M${cx} ${eyeY + 4} Q${cx + 3} ${eyeY + 9} ${cx} ${eyeY + 10}" stroke="${_darken(skin, 20)}" stroke-width="1.2" fill="none"/>`;

    // Accessories
    if (o.accessory === 1) {
      // Glasses
      svg += `<circle cx="${cx - eyeSpacing}" cy="${eyeY}" r="7" fill="none" stroke="#555" stroke-width="1.5"/>`;
      svg += `<circle cx="${cx + eyeSpacing}" cy="${eyeY}" r="7" fill="none" stroke="#555" stroke-width="1.5"/>`;
      svg += `<line x1="${cx - eyeSpacing + 7}" y1="${eyeY}" x2="${cx + eyeSpacing - 7}" y2="${eyeY}" stroke="#555" stroke-width="1.5"/>`;
    } else if (o.accessory === 2) {
      // Mask
      svg += `<path d="M${cx - r * 0.6} ${mouthY - 8} Q${cx} ${mouthY + 12} ${cx + r * 0.6} ${mouthY - 8}" fill="#87CEEB" opacity="0.8"/>`;
    } else if (o.accessory === 3) {
      // Stethoscope
      svg += `<path d="M${cx - 4} ${cy + r + 2} Q${cx - 10} ${cy + r + 15} ${cx} ${cy + r + 18} Q${cx + 10} ${cy + r + 15} ${cx + 4} ${cy + r + 2}" stroke="#666" stroke-width="2" fill="none"/>`;
      svg += `<circle cx="${cx}" cy="${cy + r + 19}" r="3" fill="#666"/>`;
    }

    // White coat collar
    svg += `<path d="M${cx - r * 0.5} ${cy + r - 2} L${cx - 4} ${cy + r + 10} L${cx} ${cy + r + 6} L${cx + 4} ${cy + r + 10} L${cx + r * 0.5} ${cy + r - 2}" fill="white" opacity="0.9" stroke="#ddd" stroke-width="0.5"/>`;

    svg += '</svg>';
    return svg;
  }

  function _darken(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0x00FF) - amount);
    const b = Math.max(0, (num & 0x0000FF) - amount);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  function renderEditor(container) {
    const saved = Storage.getAvatar();
    if (saved) Object.assign(_current, saved);

    container.innerHTML = '';
    container.className = 'avatar-editor';

    // Preview
    const preview = document.createElement('div');
    preview.className = 'avatar-preview';
    const display = document.createElement('div');
    display.className = 'avatar-preview__display';
    display.id = 'avatar-display';
    display.innerHTML = generateSVG(_current, 180);
    preview.appendChild(display);

    // Name input
    const player = Storage.getCurrentPlayer();
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'name-input';
    nameInput.placeholder = 'Enter your name';
    nameInput.value = player?.name || '';
    nameInput.id = 'avatar-name-input';
    preview.appendChild(nameInput);

    container.appendChild(preview);

    // Options
    const options = document.createElement('div');
    options.className = 'avatar-options';

    // Skin tone
    _addColorGroup(options, 'Skin Tone', SKIN_TONES, _current.skinTone, (i) => {
      _current.skinTone = i;
      _updatePreview();
    });

    // Hair style
    _addChoiceGroup(options, 'Hair Style', ['✂️', '💇', '💇‍♀️', '🌀', '👩‍🦱', '🎀'], _current.hair, (i) => {
      _current.hair = i;
      _updatePreview();
    });

    // Hair color
    _addColorGroup(options, 'Hair Color', HAIR_COLORS, _current.hairColor, (i) => {
      _current.hairColor = i;
      _updatePreview();
    });

    // Accessories
    _addChoiceGroup(options, 'Accessories', ['❌', '👓', '😷', '🩺'], _current.accessory, (i) => {
      _current.accessory = i;
      _updatePreview();
    });

    container.appendChild(options);
  }

  function _addColorGroup(parent, label, colors, selected, onChange) {
    const group = document.createElement('div');
    group.className = 'avatar-option-group';
    group.innerHTML = `<div class="avatar-option-group__label">${label}</div>`;
    const choices = document.createElement('div');
    choices.className = 'avatar-option-group__choices';

    colors.forEach((color, i) => {
      const el = document.createElement('div');
      el.className = 'avatar-color-choice' + (i === selected ? ' selected' : '');
      el.style.background = color;
      el.addEventListener('click', () => {
        choices.querySelectorAll('.avatar-color-choice').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        onChange(i);
      });
      choices.appendChild(el);
    });

    group.appendChild(choices);
    parent.appendChild(group);
  }

  function _addChoiceGroup(parent, label, icons, selected, onChange) {
    const group = document.createElement('div');
    group.className = 'avatar-option-group';
    group.innerHTML = `<div class="avatar-option-group__label">${label}</div>`;
    const choices = document.createElement('div');
    choices.className = 'avatar-option-group__choices';

    icons.forEach((icon, i) => {
      const el = document.createElement('div');
      el.className = 'avatar-choice' + (i === selected ? ' selected' : '');
      el.textContent = icon;
      el.addEventListener('click', () => {
        choices.querySelectorAll('.avatar-choice').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        onChange(i);
      });
      choices.appendChild(el);
    });

    group.appendChild(choices);
    parent.appendChild(group);
  }

  function _updatePreview() {
    const display = document.getElementById('avatar-display');
    if (display) display.innerHTML = generateSVG(_current, 180);
  }

  function save() {
    const nameInput = document.getElementById('avatar-name-input');
    const name = nameInput?.value?.trim() || 'Student';

    let player = Storage.getCurrentPlayer();
    if (!player) {
      player = Storage.createPlayer(name);
    } else {
      Storage.updatePlayer(player.id, { name, avatar: { ..._current } });
    }
    Storage.saveAvatar({ ..._current });
  }

  function getCurrent() {
    return { ..._current };
  }

  function setExpression(expr) {
    _current.expression = expr;
  }

  function getSmallSVG(size = 48) {
    return generateSVG(_current, size);
  }

  return {
    generateSVG,
    renderEditor,
    save,
    getCurrent,
    setExpression,
    getSmallSVG,
    SKIN_TONES,
    HAIR_COLORS,
  };
})();
