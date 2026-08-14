import React, { useState } from 'react';
import { Check, Shuffle, RotateCcw, User } from 'lucide-react';
import AvatarSVG from './avatar/AvatarSVG';
import {
  SKIN_TONES, HAIR_STYLES, HAIR_COLORS, EYE_STYLES, EYE_COLORS,
  BROW_STYLES, MOUTH_STYLES, FACIAL_HAIR, OUTFITS, ACCESSORIES,
  BACKGROUNDS, ACADEMIC_ROLES, randomAvatar,
} from './avatar/parts';
import { saveProfile, DEFAULT_AVATAR } from '../utils/storage';
import { usePlayer } from '../hooks/usePlayer';
import { Audio } from '../utils/audio';

// Re-exported so existing imports keep working.
export { default as AvatarSVG } from './avatar/AvatarSVG';

const TABS = [
  { id: 'face', label: 'Face' },
  { id: 'hair', label: 'Hair' },
  { id: 'style', label: 'Style' },
];

/** A row of colour swatches. */
function Swatches({ options, value, onChange, label }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold text-slate-300">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            title={opt.name}
            aria-label={opt.name}
            aria-pressed={value === i}
            className={`w-8 h-8 rounded-full transition-all cursor-pointer ${
              value === i
                ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-amber-400 scale-110'
                : 'ring-1 ring-white/20 hover:scale-105'
            }`}
            style={{
              background: opt.color
                ? opt.color
                : `linear-gradient(135deg, ${opt.from}, ${opt.to})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** A wrapping row of named option chips. */
function Chips({ options, value, onChange, label }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold text-slate-300">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            aria-pressed={value === i}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              value === i
                ? 'bg-teal-400 text-slate-950 shadow-md'
                : 'bg-white/5 border border-white/12 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {opt.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AvatarEditor({ onSave }) {
  const player = usePlayer();

  const [name, setName] = useState(player.name);
  const [role, setRole] = useState(player.role);
  const [avatar, setAvatar] = useState(player.avatar);
  const [tab, setTab] = useState('face');
  const [saved, setSaved] = useState(false);

  const set = (key) => (value) => {
    Audio.playClick();
    setAvatar(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    Audio.playStar();
    saveProfile({ name, role, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    if (onSave) onSave({ name, role, avatar });
  };

  const handleRandomise = () => {
    Audio.playClick();
    setAvatar(randomAvatar());
    setSaved(false);
  };

  const handleReset = () => {
    Audio.playClick();
    setAvatar({ ...DEFAULT_AVATAR });
    setSaved(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto grid lg:grid-cols-[300px_1fr] gap-6 items-start">
      {/* ── Preview ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 lg:sticky lg:top-4">
        <div className="rounded-full overflow-hidden ring-4 ring-white/10 shadow-2xl">
          <AvatarSVG {...avatar} size={200} />
        </div>

        <div className="text-center">
          <p className="font-heading font-bold text-lg text-white break-words max-w-[240px]">
            {name || 'Unnamed'}
          </p>
          <p className="text-xs text-teal-300 font-semibold mt-0.5">{role}</p>
        </div>

        <div className="flex gap-2 w-full">
          <button
            onClick={handleRandomise}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/12 text-slate-200 text-xs font-semibold hover:bg-white/10 cursor-pointer transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" /> Randomise
          </button>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/12 text-slate-200 text-xs font-semibold hover:bg-white/10 cursor-pointer transition-colors"
            aria-label="Reset avatar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={handleSave}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            saved
              ? 'bg-emerald-400 text-slate-950'
              : 'bg-gradient-to-r from-teal-400 to-fuchsia-500 text-slate-950 hover:brightness-110 shadow-lg'
          }`}
        >
          {saved ? <><Check className="w-4 h-4" /> Saved</> : <><User className="w-4 h-4" /> Save profile</>}
        </button>
      </div>

      {/* ── Controls ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        {/* Identity */}
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-300">Name</span>
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); setSaved(false); }}
              maxLength={40}
              placeholder="Your name"
              className="px-3 py-2.5 rounded-lg bg-slate-900 border border-white/12 text-white text-sm focus:outline-none focus:border-teal-400 transition-colors"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-slate-300">Academic level</span>
            <select
              value={role}
              onChange={(e) => { setRole(e.target.value); setSaved(false); }}
              className="px-3 py-2.5 rounded-lg bg-slate-900 border border-white/12 text-white text-sm cursor-pointer focus:outline-none focus:border-teal-400 transition-colors"
            >
              {ACADEMIC_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </label>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                tab === t.id
                  ? 'bg-teal-400 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
          {tab === 'face' && (
            <>
              <Swatches label="Skin tone" options={SKIN_TONES} value={avatar.skinTone} onChange={set('skinTone')} />
              <Chips label="Eye shape" options={EYE_STYLES} value={avatar.eyeStyle} onChange={set('eyeStyle')} />
              <Swatches label="Eye colour" options={EYE_COLORS} value={avatar.eyeColor} onChange={set('eyeColor')} />
              <Chips label="Eyebrows" options={BROW_STYLES} value={avatar.brows} onChange={set('brows')} />
              <Chips label="Expression" options={MOUTH_STYLES} value={avatar.mouth} onChange={set('mouth')} />
            </>
          )}

          {tab === 'hair' && (
            <>
              <Chips label="Hair style" options={HAIR_STYLES} value={avatar.hairStyle} onChange={set('hairStyle')} />
              <Swatches label="Hair colour" options={HAIR_COLORS} value={avatar.hairColor} onChange={set('hairColor')} />
              <Chips label="Facial hair" options={FACIAL_HAIR} value={avatar.facialHair} onChange={set('facialHair')} />
            </>
          )}

          {tab === 'style' && (
            <>
              <Chips label="Outfit" options={OUTFITS} value={avatar.outfit} onChange={set('outfit')} />
              <Chips label="Accessory" options={ACCESSORIES} value={avatar.accessory} onChange={set('accessory')} />
              <Swatches label="Background" options={BACKGROUNDS} value={avatar.background} onChange={set('background')} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
