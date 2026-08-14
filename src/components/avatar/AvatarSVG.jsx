import React, { useId } from 'react';
import {
  SKIN_TONES, HAIR_COLORS, HAIR_STYLES, EYE_STYLES, EYE_COLORS,
  BROW_STYLES, MOUTH_STYLES, FACIAL_HAIR, OUTFITS, ACCESSORIES, BACKGROUNDS,
} from './parts';

// Vector avatar on a 200×200 canvas. Head centred at (100, 88).
const pick = (arr, i) => arr[i] ?? arr[0];

export default function AvatarSVG({
  skinTone = 0, hairStyle = 0, hairColor = 0, eyeStyle = 0, eyeColor = 0,
  brows = 0, mouth = 0, facialHair = 0, outfit = 0, accessory = 0,
  background = 0, size = 200, showBackground = true, className = '',
}) {
  const uid = useId().replace(/:/g, '');
  const skin = pick(SKIN_TONES, skinTone);
  const hair = pick(HAIR_COLORS, hairColor);
  const eyes = pick(EYE_STYLES, eyeStyle).id;
  const iris = pick(EYE_COLORS, eyeColor).color;
  const brow = pick(BROW_STYLES, brows).id;
  const lips = pick(MOUTH_STYLES, mouth).id;
  const beard = pick(FACIAL_HAIR, facialHair).id;
  const fit = pick(OUTFITS, outfit);
  const acc = pick(ACCESSORIES, accessory).id;
  const bg = pick(BACKGROUNDS, background);

  const hairId = pick(HAIR_STYLES, hairStyle).id;
  const isCovered = hairId === 'turban' || hairId === 'hijab';

  const eyeY = 88, lx = 82, rx = 118;

  // ── Hair ───────────────────────────────────────────────────────────
  const renderHairBack = () => {
    switch (hairId) {
      case 'long':
        return <path d="M44 78 Q40 140 46 168 Q58 150 56 108 Z M156 78 Q160 140 154 168 Q142 150 144 108 Z" fill={hair.color} />;
      case 'bob':
        return <path d="M46 82 Q42 122 50 140 Q66 130 62 100 Z M154 82 Q158 122 150 140 Q134 130 138 100 Z" fill={hair.color} />;
      case 'ponytail':
        return <path d="M148 66 Q176 74 172 112 Q168 140 156 150 Q166 124 160 100 Q156 78 142 72 Z" fill={hair.color} />;
      case 'braid':
        return <>
          <path d="M100 150 Q94 172 100 192 Q106 172 100 150 Z" fill={hair.color} />
          {[156, 170, 184].map((y, i) => <ellipse key={i} cx={100} cy={y} rx={9 - i} ry={7} fill={hair.color} stroke={hair.hi} strokeWidth="1" />)}
        </>;
      case 'curly':
        return <>{[[48,70],[44,92],[50,114],[152,70],[156,92],[150,114]].map(([x,y],i) =>
          <circle key={i} cx={x} cy={y} r={15} fill={hair.color} />)}</>;
      default:
        return null;
    }
  };

  const renderHairFront = () => {
    switch (hairId) {
      case 'bald':
        return null;
      case 'buzz':
        return <path d="M52 82 Q52 42 100 36 Q148 42 148 82 Q142 56 100 50 Q58 56 52 82 Z" fill={hair.color} opacity="0.85" />;
      case 'short':
        return <path d="M50 84 Q48 40 100 32 Q152 40 150 84 Q144 54 100 46 Q56 54 50 84 Z" fill={hair.color} />;
      case 'sidepart':
        return <>
          <path d="M50 84 Q48 38 100 32 Q152 38 150 82 Q146 52 112 44 Q76 40 62 62 Q54 72 50 84 Z" fill={hair.color} />
          <path d="M62 62 Q80 44 112 44 Q88 50 70 70 Z" fill={hair.hi} opacity="0.5" />
        </>;
      case 'bob':
        return <path d="M46 88 Q44 36 100 30 Q156 36 154 88 Q148 52 100 44 Q52 52 46 88 Z" fill={hair.color} />;
      case 'long':
        return <path d="M44 88 Q42 34 100 28 Q158 34 156 88 Q150 50 100 42 Q50 50 44 88 Z" fill={hair.color} />;
      case 'curly':
        return <>
          <path d="M50 84 Q48 38 100 32 Q152 38 150 84 Q144 52 100 44 Q56 52 50 84 Z" fill={hair.color} />
          {[58,74,90,106,122,138].map((x,i) =>
            <circle key={i} cx={x} cy={38 + Math.sin(i * 1.4) * 6} r={11} fill={hair.color} />)}
        </>;
      case 'bun':
        return <>
          <path d="M50 84 Q48 40 100 34 Q152 40 150 84 Q144 54 100 46 Q56 54 50 84 Z" fill={hair.color} />
          <circle cx={100} cy={22} r={16} fill={hair.color} />
          <circle cx={100} cy={22} r={16} fill="none" stroke={hair.hi} strokeWidth="1.5" opacity="0.6" />
        </>;
      case 'ponytail':
        return <path d="M50 84 Q48 40 100 34 Q152 40 150 84 Q144 54 100 46 Q56 54 50 84 Z" fill={hair.color} />;
      case 'braid':
        return <path d="M50 84 Q48 38 100 32 Q152 38 150 84 Q144 52 100 44 Q56 52 50 84 Z" fill={hair.color} />;
      case 'turban':
        return <>
          <path d="M44 82 Q40 30 100 24 Q160 30 156 82 Q150 44 100 38 Q50 44 44 82 Z" fill={fit.base} />
          <path d="M46 70 Q80 46 154 68" fill="none" stroke={fit.trim} strokeWidth="4" />
          <path d="M48 58 Q84 36 152 56" fill="none" stroke={fit.trim} strokeWidth="3" opacity="0.7" />
        </>;
      case 'hijab':
        return <>
          <path d="M42 96 Q38 28 100 22 Q162 28 158 96 Q150 60 100 54 Q50 60 42 96 Z" fill={fit.base} />
          <path d="M42 92 Q40 140 58 168 L142 168 Q160 140 158 92 Q150 118 100 120 Q50 118 42 92 Z" fill={fit.base} />
          <path d="M52 110 Q100 130 148 110" fill="none" stroke={fit.trim} strokeWidth="2.5" opacity="0.6" />
        </>;
      default:
        return <path d="M50 84 Q48 40 100 32 Q152 40 150 84 Q144 54 100 46 Q56 54 50 84 Z" fill={hair.color} />;
    }
  };

  // ── Features ───────────────────────────────────────────────────────
  const renderEyes = () => {
    const shape = {
      round:   { rx: 10, ry: 9.5, pr: 5 },
      almond:  { rx: 11.5, ry: 7, pr: 4.6 },
      narrow:  { rx: 11, ry: 5, pr: 3.8 },
      wide:    { rx: 11, ry: 11, pr: 5.6 },
      focused: { rx: 10, ry: 6, pr: 4.4 },
    }[eyes];

    return [lx, rx].map((cx, i) => (
      <g key={i}>
        <ellipse cx={cx} cy={eyeY} rx={shape.rx} ry={shape.ry} fill="#FFFDF9" />
        <circle cx={cx + 0.8} cy={eyeY} r={shape.pr} fill={iris} />
        <circle cx={cx + 0.8} cy={eyeY} r={shape.pr * 0.45} fill="#120E1A" />
        <circle cx={cx + 2.6} cy={eyeY - 2} r={1.7} fill="#fff" opacity="0.9" />
        <path
          d={`M${cx - shape.rx} ${eyeY - shape.ry * 0.72} Q${cx} ${eyeY - shape.ry * 1.5} ${cx + shape.rx} ${eyeY - shape.ry * 0.72}`}
          fill="none" stroke={skin.line} strokeWidth="1.6" strokeLinecap="round" opacity="0.75"
        />
      </g>
    ));
  };

  const renderBrows = () => {
    const d = {
      natural:  ['M69 71 Q82 65 95 70', 'M105 70 Q118 65 131 71'],
      arched:   ['M69 72 Q82 61 95 71', 'M105 71 Q118 61 131 72'],
      straight: ['M69 69 Q82 67 95 69', 'M105 69 Q118 67 131 69'],
      thick:    ['M68 72 Q82 62 96 71', 'M104 71 Q118 62 132 72'],
    }[brow];
    const w = brow === 'thick' ? 5.5 : 3.4;
    return d.map((path, i) => (
      <path key={i} d={path} fill="none" stroke={hair.color} strokeWidth={w} strokeLinecap="round" />
    ));
  };

  const renderMouth = () => {
    switch (lips) {
      case 'neutral':
        return <path d="M88 122 Q100 125 112 122" fill="none" stroke={skin.line} strokeWidth="2.6" strokeLinecap="round" />;
      case 'grin':
        return <>
          <path d="M84 118 Q100 134 116 118 Z" fill="#7C2D3A" />
          <path d="M87 119 Q100 123 113 119 L113 121 Q100 125 87 121 Z" fill="#FFFDF9" />
        </>;
      case 'focused':
        return <path d="M89 122 L111 121" fill="none" stroke={skin.line} strokeWidth="2.6" strokeLinecap="round" />;
      default:
        return <path d="M86 118 Q100 130 114 118" fill="none" stroke="#A54A52" strokeWidth="3" strokeLinecap="round" />;
    }
  };

  const renderFacialHair = () => {
    switch (beard) {
      case 'stubble':
        return <path d="M60 100 Q60 142 100 148 Q140 142 140 100 Q136 128 100 132 Q64 128 60 100 Z" fill={hair.color} opacity="0.22" />;
      case 'moustache':
        return <path d="M86 113 Q100 108 114 113 Q108 118 100 116 Q92 118 86 113 Z" fill={hair.color} />;
      case 'goatee':
        return <>
          <path d="M87 112 Q100 108 113 112 Q107 117 100 115 Q93 117 87 112 Z" fill={hair.color} />
          <path d="M91 131 Q100 128 109 131 Q106 143 100 145 Q94 143 91 131 Z" fill={hair.color} />
        </>;
      case 'beard':
        return <>
          <path d="M58 96 Q56 140 100 152 Q144 140 142 96 Q138 130 100 136 Q62 130 58 96 Z" fill={hair.color} />
          <path d="M86 112 Q100 107 114 112 Q107 118 100 116 Q93 118 86 112 Z" fill={hair.color} />
        </>;
      default:
        return null;
    }
  };

  const renderAccessory = () => {
    switch (acc) {
      case 'glasses':
        return <>
          <rect x={66} y={78} width={32} height={22} rx={5} fill="#7DD3FC" fillOpacity="0.12" stroke="#2B3444" strokeWidth="2.6" />
          <rect x={102} y={78} width={32} height={22} rx={5} fill="#7DD3FC" fillOpacity="0.12" stroke="#2B3444" strokeWidth="2.6" />
          <line x1={98} y1={87} x2={102} y2={87} stroke="#2B3444" strokeWidth="2.6" />
          <line x1={66} y1={84} x2={48} y2={80} stroke="#2B3444" strokeWidth="2.2" />
          <line x1={134} y1={84} x2={152} y2={80} stroke="#2B3444" strokeWidth="2.2" />
        </>;
      case 'round_specs':
        return <>
          <circle cx={82} cy={89} r={16} fill="#7DD3FC" fillOpacity="0.12" stroke="#3A2E22" strokeWidth="2.6" />
          <circle cx={118} cy={89} r={16} fill="#7DD3FC" fillOpacity="0.12" stroke="#3A2E22" strokeWidth="2.6" />
          <line x1={98} y1={89} x2={102} y2={89} stroke="#3A2E22" strokeWidth="2.6" />
          <line x1={66} y1={85} x2={48} y2={81} stroke="#3A2E22" strokeWidth="2.2" />
          <line x1={134} y1={85} x2={152} y2={81} stroke="#3A2E22" strokeWidth="2.2" />
        </>;
      case 'mask':
        return <>
          <path d="M62 104 Q100 124 138 104 L142 128 Q100 150 58 128 Z" fill="#8FD4E8" />
          <path d="M62 104 Q100 124 138 104 L139 112 Q100 132 61 112 Z" fill="#A8E0F0" />
          {[116, 124, 132].map((y, i) => (
            <path key={i} d={`M63 ${y} Q100 ${y + 14} 137 ${y}`} fill="none" stroke="#6FBBD2" strokeWidth="1.4" />
          ))}
          <line x1={62} y1={104} x2={44} y2={92} stroke="#B9E6F2" strokeWidth="2.4" />
          <line x1={138} y1={104} x2={156} y2={92} stroke="#B9E6F2" strokeWidth="2.4" />
        </>;
      case 'loupes':
        return <>
          <rect x={66} y={78} width={32} height={22} rx={5} fill="#7DD3FC" fillOpacity="0.12" stroke="#2B3444" strokeWidth="2.6" />
          <rect x={102} y={78} width={32} height={22} rx={5} fill="#7DD3FC" fillOpacity="0.12" stroke="#2B3444" strokeWidth="2.6" />
          <line x1={98} y1={87} x2={102} y2={87} stroke="#2B3444" strokeWidth="2.6" />
          <circle cx={82} cy={89} r={7.5} fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx={118} cy={89} r={7.5} fill="#1F2937" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx={82} cy={89} r={3} fill="#60A5FA" opacity="0.7" />
          <circle cx={118} cy={89} r={3} fill="#60A5FA" opacity="0.7" />
        </>;
      case 'stethoscope':
        return <>
          <path d="M78 150 Q72 172 84 186" fill="none" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <path d="M122 150 Q128 172 116 186" fill="none" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
          <circle cx={100} cy={192} r={8} fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
          <circle cx={100} cy={192} r={3.5} fill="#94A3B8" />
        </>;
      case 'headmirror':
        return <>
          <path d="M56 46 Q100 26 144 46" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <circle cx={100} cy={34} r={13} fill="#E2E8F0" stroke="#64748B" strokeWidth="2.5" />
          <circle cx={100} cy={34} r={4.5} fill="#334155" />
        </>;
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} role="img" aria-label="Player avatar">
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bg.from} />
          <stop offset="1" stopColor={bg.to} />
        </linearGradient>
        <clipPath id={`clip-${uid}`}><circle cx="100" cy="100" r="100" /></clipPath>
      </defs>

      <g clipPath={`url(#clip-${uid})`}>
        {showBackground && <rect width="200" height="200" fill={`url(#bg-${uid})`} />}

        {renderHairBack()}

        {/* Neck */}
        <path d="M84 122 L84 150 Q100 158 116 150 L116 122 Z" fill={skin.color} />
        <path d="M84 128 Q100 142 116 128 L116 122 L84 122 Z" fill={skin.shadow} opacity="0.55" />

        {/* Torso */}
        <path d="M52 200 Q52 158 84 148 Q100 166 116 148 Q148 158 148 200 Z" fill={fit.base} />
        <path d="M84 148 Q100 166 116 148 L110 200 L90 200 Z" fill={fit.trim} opacity="0.5" />
        {fit.id === 'labcoat' && (
          <>
            <path d="M98 156 L98 200 M102 156 L102 200" stroke={fit.trim} strokeWidth="1.4" />
            <rect x={118} y={172} width={16} height={12} rx={2} fill="none" stroke={fit.trim} strokeWidth="1.4" />
          </>
        )}

        {/* Ears */}
        {!isCovered && [50, 150].map((cx, i) => (
          <g key={i}>
            <ellipse cx={cx} cy={92} rx={9} ry={13} fill={skin.color} />
            <ellipse cx={cx} cy={92} rx={4.5} ry={7} fill={skin.shadow} opacity="0.5" />
          </g>
        ))}

        {/* Head */}
        <ellipse cx={100} cy={88} rx={50} ry={56} fill={skin.color} />
        <path d="M100 32 Q150 32 150 88 Q150 128 100 144 Q136 122 136 88 Q136 44 100 32 Z" fill={skin.shadow} opacity="0.28" />

        {renderFacialHair()}
        {renderHairFront()}
        {renderBrows()}
        {renderEyes()}

        {/* Nose */}
        <path d="M96 100 Q100 110 105 103" fill="none" stroke={skin.line} strokeWidth="2" strokeLinecap="round" opacity="0.8" />

        {renderMouth()}
        {renderAccessory()}
      </g>
    </svg>
  );
}
