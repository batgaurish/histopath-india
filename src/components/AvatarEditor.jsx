import React, { useState } from 'react';
import { User, Check, Sparkles } from 'lucide-react';
import { saveAvatar, getAvatar, getCurrentPlayer, updatePlayer } from '../utils/storage';
import { Audio } from '../utils/audio';

// ═══════════════════════════════════════════════════════════
// Pure CSS/SVG–Drawn Avatar Creator
// No emojis — full interactive character builder
// ═══════════════════════════════════════════════════════════

const SKIN_TONES = [
  { name: 'Light', color: '#FDDCB5', shadow: '#E8C49A' },
  { name: 'Medium', color: '#E0AC69', shadow: '#C89550' },
  { name: 'Tan', color: '#C68642', shadow: '#A87035' },
  { name: 'Deep', color: '#8D5524', shadow: '#6E3F1A' },
];

const HAIR_STYLES = [
  { name: 'Short Crop', id: 'short' },
  { name: 'Side Part', id: 'sidepart' },
  { name: 'Long', id: 'long' },
  { name: 'Curly', id: 'curly' },
  { name: 'Tied Back', id: 'tied' },
  { name: 'Buzz Cut', id: 'buzz' },
];

const HAIR_COLORS = [
  { name: 'Black', color: '#1a1a2e' },
  { name: 'Dark Brown', color: '#3d2b1f' },
  { name: 'Auburn', color: '#6B3A2A' },
  { name: 'Gray', color: '#6b7280' },
];

const ACCESSORIES = [
  { name: 'None', id: 'none' },
  { name: 'Glasses', id: 'glasses' },
  { name: 'Dental Mask', id: 'mask' },
  { name: 'Stethoscope', id: 'stethoscope' },
  { name: 'Lab Coat', id: 'labcoat' },
];

const EYE_STYLES = [
  { name: 'Round', id: 'round' },
  { name: 'Almond', id: 'almond' },
  { name: 'Narrow', id: 'narrow' },
];

export function AvatarSVG({ skinTone = 0, hairStyle = 0, hairColor = 0, accessory = 0, eyeStyle = 0, size = 200 }) {
  const skin = SKIN_TONES[skinTone] || SKIN_TONES[0];
  const hair = HAIR_COLORS[hairColor] || HAIR_COLORS[0];

  const renderHair = () => {
    const hc = hair.color;
    switch (HAIR_STYLES[hairStyle]?.id) {
      case 'short':
        return <path d="M30 65 Q30 30 75 20 Q120 10 140 30 Q155 45 155 65 Q155 50 140 38 Q120 25 75 32 Q40 38 35 60 Z" fill={hc} />;
      case 'sidepart':
        return <>
          <path d="M28 70 Q25 25 75 15 Q130 8 155 40 Q158 50 155 65 Q150 45 130 30 Q100 18 60 22 Q35 28 32 65 Z" fill={hc} />
          <path d="M28 70 Q25 55 30 45 Q35 60 45 68 Z" fill={hc} opacity=".8" />
        </>;
      case 'long':
        return <>
          <path d="M25 70 Q20 20 75 10 Q135 5 160 40 Q165 55 160 75 Q155 45 135 28 Q100 12 55 18 Q30 25 28 65 Z" fill={hc} />
          <path d="M25 75 Q22 100 25 130 Q28 120 30 100 Q30 85 28 75 Z" fill={hc} opacity=".7" />
          <path d="M155 75 Q158 100 160 130 Q157 120 155 100 Q153 85 153 75 Z" fill={hc} opacity=".7" />
        </>;
      case 'curly':
        return <>
          <path d="M28 68 Q25 25 75 15 Q130 8 155 40 Q158 55 155 68 Q150 42 125 28 Q90 15 55 22 Q32 30 30 62 Z" fill={hc} />
          {[35,50,65,80,95,110,125,140].map((x,i) => 
            <circle key={`curl-${i}`} cx={x} cy={20 + Math.sin(i*1.2)*8} r={8} fill={hc} opacity=".8" />
          )}
        </>;
      case 'tied':
        return <>
          <path d="M30 68 Q28 30 75 18 Q125 10 150 35 Q155 50 153 68 Q148 40 125 28 Q85 16 50 25 Q33 32 32 62 Z" fill={hc} />
          <ellipse cx="150" cy="40" rx="15" ry="12" fill={hc} />
          <circle cx="158" cy="35" r="4" fill="#f59e0b" />
        </>;
      case 'buzz':
        return <path d="M32 68 Q30 38 75 25 Q125 15 150 38 Q155 50 153 68 Q148 45 125 35 Q85 25 50 32 Q35 40 34 62 Z" fill={hc} opacity=".7" />;
      default:
        return <path d="M30 65 Q30 30 75 20 Q120 10 140 30 Q155 45 155 65 Q155 50 140 38 Q120 25 75 32 Q40 38 35 60 Z" fill={hc} />;
    }
  };

  const renderEyes = () => {
    const style = EYE_STYLES[eyeStyle]?.id || 'round';
    const eyeY = 78;
    const leftX = 65;
    const rightX = 115;

    if (style === 'round') {
      return <>
        <ellipse cx={leftX} cy={eyeY} rx={9} ry={9} fill="white" />
        <circle cx={leftX + 1} cy={eyeY} r={5} fill="#1a1a2e" />
        <circle cx={leftX + 2.5} cy={eyeY - 1.5} r={1.8} fill="white" />
        <ellipse cx={rightX} cy={eyeY} rx={9} ry={9} fill="white" />
        <circle cx={rightX + 1} cy={eyeY} r={5} fill="#1a1a2e" />
        <circle cx={rightX + 2.5} cy={eyeY - 1.5} r={1.8} fill="white" />
        <path d={`M${leftX-10} ${eyeY-5} Q${leftX} ${eyeY-12} ${leftX+10} ${eyeY-5}`} fill="none" stroke={skin.shadow} strokeWidth="2" />
        <path d={`M${rightX-10} ${eyeY-5} Q${rightX} ${eyeY-12} ${rightX+10} ${eyeY-5}`} fill="none" stroke={skin.shadow} strokeWidth="2" />
      </>;
    } else if (style === 'almond') {
      return <>
        <ellipse cx={leftX} cy={eyeY} rx={11} ry={7} fill="white" />
        <circle cx={leftX + 1} cy={eyeY} r={4.5} fill="#1a1a2e" />
        <circle cx={leftX + 2} cy={eyeY - 1} r={1.5} fill="white" />
        <ellipse cx={rightX} cy={eyeY} rx={11} ry={7} fill="white" />
        <circle cx={rightX + 1} cy={eyeY} r={4.5} fill="#1a1a2e" />
        <circle cx={rightX + 2} cy={eyeY - 1} r={1.5} fill="white" />
        <path d={`M${leftX-12} ${eyeY-3} Q${leftX} ${eyeY-10} ${leftX+12} ${eyeY-3}`} fill="none" stroke={skin.shadow} strokeWidth="1.5" />
        <path d={`M${rightX-12} ${eyeY-3} Q${rightX} ${eyeY-10} ${rightX+12} ${eyeY-3}`} fill="none" stroke={skin.shadow} strokeWidth="1.5" />
      </>;
    } else {
      return <>
        <ellipse cx={leftX} cy={eyeY} rx={10} ry={5} fill="white" />
        <circle cx={leftX + 1} cy={eyeY} r={3.5} fill="#1a1a2e" />
        <circle cx={leftX + 2} cy={eyeY - 0.5} r={1.2} fill="white" />
        <ellipse cx={rightX} cy={eyeY} rx={10} ry={5} fill="white" />
        <circle cx={rightX + 1} cy={eyeY} r={3.5} fill="#1a1a2e" />
        <circle cx={rightX + 2} cy={eyeY - 0.5} r={1.2} fill="white" />
      </>;
    }
  };

  const renderAccessory = () => {
    const accId = ACCESSORIES[accessory]?.id || 'none';
    switch (accId) {
      case 'glasses':
        return <>
          <rect x={50} y={70} width={26} height={18} rx={4} fill="none" stroke="#374151" strokeWidth="2.5" />
          <rect x={104} y={70} width={26} height={18} rx={4} fill="none" stroke="#374151" strokeWidth="2.5" />
          <line x1={76} y1={79} x2={104} y2={79} stroke="#374151" strokeWidth="2" />
          <line x1={50} y1={79} x2={35} y2={75} stroke="#374151" strokeWidth="1.5" />
          <line x1={130} y1={79} x2={145} y2={75} stroke="#374151" strokeWidth="1.5" />
        </>;
      case 'mask':
        return <>
          <path d="M45 95 Q90 120 135 95 L140 110 Q90 135 40 110 Z" fill="#60a5fa" opacity=".85" />
          <line x1={55} y1={100} x2={125} y2={100} stroke="#3b82f6" strokeWidth="0.5" opacity=".5" />
          <line x1={55} y1={105} x2={125} y2={105} stroke="#3b82f6" strokeWidth="0.5" opacity=".5" />
          <line x1={55} y1={110} x2={125} y2={110} stroke="#3b82f6" strokeWidth="0.5" opacity=".5" />
          <line x1={45} y1={95} x2={28} y2={80} stroke="#93c5fd" strokeWidth="1.5" />
          <line x1={135} y1={95} x2={152} y2={80} stroke="#93c5fd" strokeWidth="1.5" />
        </>;
      case 'stethoscope':
        return <>
          <path d="M70 140 Q70 155 80 165 Q90 175 90 185" fill="none" stroke="#6b7280" strokeWidth="3" />
          <path d="M110 140 Q110 155 100 165 Q90 175 90 185" fill="none" stroke="#6b7280" strokeWidth="3" />
          <circle cx={90} cy={188} r={5} fill="#374151" />
          <circle cx={90} cy={188} r={3} fill="#9ca3af" />
        </>;
      case 'labcoat':
        return <>
          <path d="M40 135 L30 185 L150 185 L140 135 Q90 148 40 135Z" fill="white" opacity=".9" stroke="#e5e7eb" strokeWidth="1" />
          <line x1={90} y1={135} x2={90} y2={180} stroke="#d1d5db" strokeWidth="0.8" />
          <rect x={70} y={155} width={15} height={10} rx={2} fill="none" stroke="#d1d5db" strokeWidth="0.8" />
        </>;
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 180 200" width={size} height={size} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
      {/* Neck */}
      <rect x={72} y={120} width={36} height={25} rx={8} fill={skin.color} />

      {/* Shoulders/Body */}
      <path d="M35 145 Q55 130 90 133 Q125 130 145 145 L155 185 L25 185 Z" fill="#334155" />
      <path d="M60 133 L90 142 L120 133" fill="none" stroke="#475569" strokeWidth="1" />

      {/* Head */}
      <ellipse cx={90} cy={80} rx={58} ry={65} fill={skin.color} />
      <ellipse cx={90} cy={82} rx={55} ry={62} fill={skin.color} />

      {/* Ears */}
      <ellipse cx={33} cy={82} rx={8} ry={12} fill={skin.color} />
      <ellipse cx={33} cy={82} rx={5} ry={8} fill={skin.shadow} opacity=".4" />
      <ellipse cx={147} cy={82} rx={8} ry={12} fill={skin.color} />
      <ellipse cx={147} cy={82} rx={5} ry={8} fill={skin.shadow} opacity=".4" />

      {/* Hair */}
      {renderHair()}

      {/* Eyebrows */}
      <path d="M55 68 Q65 62 75 66" fill="none" stroke={HAIR_COLORS[hairColor]?.color || '#1a1a2e'} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M105 66 Q115 62 125 68" fill="none" stroke={HAIR_COLORS[hairColor]?.color || '#1a1a2e'} strokeWidth="2.5" strokeLinecap="round" />

      {/* Eyes */}
      {renderEyes()}

      {/* Nose */}
      <path d="M87 88 Q90 96 93 88" fill="none" stroke={skin.shadow} strokeWidth="1.5" strokeLinecap="round" />

      {/* Mouth */}
      <path d="M72 108 Q80 115 90 115 Q100 115 108 108" fill="none" stroke="#c2410c" strokeWidth="2" strokeLinecap="round" />

      {/* Blush */}
      <circle cx={60} cy={100} r={8} fill="#f87171" opacity=".15" />
      <circle cx={120} cy={100} r={8} fill="#f87171" opacity=".15" />

      {/* Accessory overlay */}
      {renderAccessory()}
    </svg>
  );
}

export default function AvatarEditor({ onSave }) {
  const player = getCurrentPlayer() || { name: 'Dental Student' };
  const initialAvatar = getAvatar() || { skinTone: 0, hairStyle: 0, hairColor: 0, accessory: 0, eyeStyle: 0 };

  const [name, setName] = useState(player.name || 'Dental Student');
  const [avatar, setAvatar] = useState(initialAvatar);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    Audio.playStar();
    saveAvatar(avatar);
    if (player?.id) {
      updatePlayer(player.id, { name });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onSave) onSave({ name, avatar });
  };

  const updateAvatar = (key, value) => {
    Audio.playClick();
    setAvatar(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 glass-panel border border-white/10 rounded-3xl flex flex-col items-center gap-6 shadow-2xl">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/30 text-teal-300 mb-2">
          <User className="w-5 h-5" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-gradient">Dental Student Profile</h2>
        <p className="text-xs text-gray-400">Customize your avatar & identity</p>
      </div>

      {/* Avatar Live Interactive Preview */}
      <div className="flex flex-col items-center gap-2 py-2">
        <div className="rounded-full border-4 border-teal-400/60 shadow-2xl shadow-teal-500/30 p-3 bg-gradient-to-br from-slate-800 to-slate-900 transition-all duration-300 hover:scale-105">
          <AvatarSVG
            skinTone={avatar.skinTone || 0}
            hairStyle={avatar.hairStyle || avatar.hair || 0}
            hairColor={avatar.hairColor || 0}
            accessory={avatar.accessory || 0}
            eyeStyle={avatar.eyeStyle || 0}
            size={140}
          />
        </div>
        <span className="text-sm font-bold text-teal-300">{name}</span>
      </div>

      {/* Student Name Field */}
      <div className="w-full flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-gray-300">Student Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
        />
      </div>

      {/* Skin Tone Selector */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Skin Tone</label>
        <div className="flex items-center justify-around gap-2">
          {SKIN_TONES.map((st, idx) => (
            <button
              key={`skin-${idx}`}
              onClick={() => updateAvatar('skinTone', idx)}
              className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                avatar.skinTone === idx ? 'border-amber-400 scale-110 shadow-lg ring-2 ring-amber-400/40' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: st.color }}
              title={st.name}
            />
          ))}
        </div>
      </div>

      {/* Hair Style */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Hair Style</label>
        <div className="grid grid-cols-3 gap-2">
          {HAIR_STYLES.map((style, idx) => (
            <button
              key={`hair-${idx}`}
              onClick={() => updateAvatar('hairStyle', idx)}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                (avatar.hairStyle || avatar.hair || 0) === idx
                  ? 'border-teal-400 bg-teal-500/20 text-teal-200 ring-1 ring-teal-400/40'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {style.name}
            </button>
          ))}
        </div>
      </div>

      {/* Hair Color */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Hair Color</label>
        <div className="flex items-center gap-3">
          {HAIR_COLORS.map((hc, idx) => (
            <button
              key={`hc-${idx}`}
              onClick={() => updateAvatar('hairColor', idx)}
              className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                (avatar.hairColor || 0) === idx ? 'border-amber-400 scale-110 ring-2 ring-amber-400/40' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: hc.color }}
              title={hc.name}
            />
          ))}
        </div>
      </div>

      {/* Eye Shape */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Eye Shape</label>
        <div className="grid grid-cols-3 gap-2">
          {EYE_STYLES.map((es, idx) => (
            <button
              key={`eye-${idx}`}
              onClick={() => updateAvatar('eyeStyle', idx)}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                (avatar.eyeStyle || 0) === idx
                  ? 'border-purple-400 bg-purple-500/20 text-purple-200 ring-1 ring-purple-400/40'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {es.name}
            </button>
          ))}
        </div>
      </div>

      {/* Accessories */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Accessory</label>
        <div className="grid grid-cols-3 gap-2">
          {ACCESSORIES.map((acc, idx) => (
            <button
              key={`acc-${idx}`}
              onClick={() => updateAvatar('accessory', idx)}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                (avatar.accessory || 0) === idx
                  ? 'border-amber-400 bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {acc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${
          saved
            ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
            : 'bg-gradient-to-r from-teal-400 to-purple-600 hover:from-teal-300 hover:to-purple-500 text-slate-950 shadow-teal-500/20 hover:scale-[1.02]'
        }`}
      >
        {saved ? (
          <>
            <Check className="w-4 h-4" /> Profile & Avatar Saved!
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Save Profile Avatar
          </>
        )}
      </button>
    </div>
  );
}
