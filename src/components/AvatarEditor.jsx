import React, { useState } from 'react';
import { User, Check, Sparkles } from 'lucide-react';
import { saveAvatar, getAvatar, getCurrentPlayer, updatePlayer } from '../utils/storage';
import { Audio } from '../utils/audio';

export default function AvatarEditor({ onSave }) {
  const player = getCurrentPlayer() || { name: 'Dental Student' };
  const initialAvatar = getAvatar() || { skinTone: 0, hair: 0, accessory: 0 };

  const [name, setName] = useState(player.name || 'Dental Student');
  const [avatar, setAvatar] = useState(initialAvatar);
  const [saved, setSaved] = useState(false);

  const skinTones = [
    { name: 'Light', color: '#F5D0A9' },
    { name: 'Medium', color: '#E0AC69' },
    { name: 'Tan', color: '#C68642' },
    { name: 'Deep', color: '#8D5524' },
  ];

  const hairstyles = [
    { label: 'Doctor 👨‍⚕️', icon: '👨‍⚕️' },
    { label: 'Female Doctor 👩‍⚕️', icon: '👩‍⚕️' },
    { label: 'Short Hair 🧑', icon: '🧑' },
    { label: 'Curly Hair 🧑‍🦱', icon: '🧑‍🦱' },
  ];

  const accessories = [
    { label: 'None', icon: '' },
    { label: 'Glasses 👓', icon: '👓' },
    { label: 'Dental Mask 😷', icon: '😷' },
    { label: 'Stethoscope 🩺', icon: '🩺' },
  ];

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

  const currentHairIcon = hairstyles[avatar.hair || 0]?.icon || '👨‍⚕️';
  const currentAccIcon = accessories[avatar.accessory || 0]?.icon || '';

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-panel border border-white/10 rounded-3xl flex flex-col items-center gap-6 shadow-2xl">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-400/10 border border-teal-400/30 text-teal-300 mb-2">
          <User className="w-5 h-5" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-gradient">Dental Student Profile</h2>
        <p className="text-xs text-gray-400">Customize your persona & avatar</p>
      </div>

      {/* Avatar Live Interactive Preview */}
      <div className="flex flex-col items-center gap-3">
        <div 
          className="w-28 h-28 rounded-full border-4 border-teal-400/80 shadow-2xl shadow-teal-500/30 flex items-center justify-center relative overflow-hidden transition-all duration-300 transform hover:scale-105"
          style={{ backgroundColor: skinTones[avatar.skinTone || 0]?.color || '#F5D0A9' }}
        >
          <span className="text-5xl select-none">{currentHairIcon}</span>
          {currentAccIcon && (
            <span className="absolute bottom-2 right-2 text-2xl select-none bg-slate-900/80 p-1 rounded-full border border-white/20">
              {currentAccIcon}
            </span>
          )}
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
          {skinTones.map((st, idx) => (
            <button
              key={`skin-${idx}`}
              onClick={() => { Audio.playClick(); setAvatar({ ...avatar, skinTone: idx }); }}
              className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                avatar.skinTone === idx ? 'border-amber-400 scale-110 shadow-lg ring-2 ring-amber-400/40' : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: st.color }}
            />
          ))}
        </div>
      </div>

      {/* Hairstyle / Persona Selector */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Avatar Style</label>
        <div className="grid grid-cols-2 gap-2">
          {hairstyles.map((style, idx) => (
            <button
              key={`hair-${idx}`}
              onClick={() => { Audio.playClick(); setAvatar({ ...avatar, hair: idx }); }}
              className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                avatar.hair === idx
                  ? 'border-teal-400 bg-teal-500/20 text-teal-200 ring-1 ring-teal-400/40'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dental Equipment Selector */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Dental Equipment</label>
        <div className="grid grid-cols-2 gap-2">
          {accessories.map((acc, idx) => (
            <button
              key={`acc-${idx}`}
              onClick={() => { Audio.playClick(); setAvatar({ ...avatar, accessory: idx }); }}
              className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                avatar.accessory === idx
                  ? 'border-purple-400 bg-purple-500/20 text-purple-200 ring-1 ring-purple-400/40'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              <span>{acc.label}</span>
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
