import React, { useState } from 'react';
import { User, Check } from 'lucide-react';
import { saveAvatar, getAvatar } from '../utils/storage';

export default function AvatarEditor({ onSave }) {
  const initial = getAvatar() || { face: 0, skinTone: 0, hair: 0, hairColor: 0, accessory: 0 };
  const [avatar, setAvatar] = useState(initial);

  const skinTones = ['#F5D0A9', '#E0AC69', '#C68642', '#8D5524'];
  const hairColors = ['#2C1A1D', '#4A3728', '#A52A2A', '#D4AF37'];
  const accessories = ['None', 'Glasses 👓', 'Dentist Mask 😷', 'Stethoscope 🩺'];

  const handleSave = () => {
    saveAvatar(avatar);
    if (onSave) onSave(avatar);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 glass-panel border border-white/10 rounded-3xl flex flex-col items-center gap-6">
      <div className="text-center">
        <h2 className="font-heading font-extrabold text-2xl text-gradient">Dental Student Avatar</h2>
        <p className="text-xs text-gray-400">Customize your academic profile persona</p>
      </div>

      {/* Avatar Preview */}
      <div 
        className="w-28 h-28 rounded-full border-4 border-teal-400/80 shadow-xl shadow-teal-500/20 flex items-center justify-center text-4xl relative overflow-hidden transition-all"
        style={{ backgroundColor: skinTones[avatar.skinTone] }}
      >
        <span>👨‍⚕️</span>
      </div>

      {/* Skin Tone Selector */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Skin Tone</label>
        <div className="flex items-center gap-3">
          {skinTones.map((color, idx) => (
            <button
              key={`skin-${idx}`}
              onClick={() => setAvatar({ ...avatar, skinTone: idx })}
              className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                avatar.skinTone === idx ? 'border-amber-400 scale-110 shadow-lg' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Hair Color Selector */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Hair Style</label>
        <div className="flex items-center gap-3">
          {hairColors.map((color, idx) => (
            <button
              key={`hair-${idx}`}
              onClick={() => setAvatar({ ...avatar, hairColor: idx })}
              className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                avatar.hairColor === idx ? 'border-amber-400 scale-110 shadow-lg' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Accessory Selector */}
      <div className="w-full flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-300">Dental Equipment</label>
        <div className="grid grid-cols-2 gap-2">
          {accessories.map((acc, idx) => (
            <button
              key={`acc-${idx}`}
              onClick={() => setAvatar({ ...avatar, accessory: idx })}
              className={`p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                avatar.accessory === idx
                  ? 'border-teal-400 bg-teal-500/20 text-teal-200'
                  : 'glass-panel border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {acc}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 hover:from-teal-300 hover:to-purple-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        <Check className="w-4 h-4" /> Save Profile Avatar
      </button>
    </div>
  );
}
