// ═══════════════════════════════════════════════════════════
// Avatar part catalogue
//
// Single source of truth for every option the editor offers and every
// value the renderer understands. Keeping them together means the editor
// cannot offer a choice the renderer silently ignores.
// ═══════════════════════════════════════════════════════════

export const SKIN_TONES = [
  { name: 'Porcelain', color: '#F8DCC4', shadow: '#E3BE9E', line: '#C99A76' },
  { name: 'Light', color: '#F0C9A4', shadow: '#D9AA80', line: '#B8845C' },
  { name: 'Medium', color: '#DCA475', shadow: '#C08655', line: '#9C6438' },
  { name: 'Tan', color: '#C08552', shadow: '#A26A3C', line: '#7E4E28' },
  { name: 'Bronze', color: '#A2673F', shadow: '#85502E', line: '#653A1E' },
  { name: 'Deep', color: '#7A4A2B', shadow: '#5E361D', line: '#452612' },
  { name: 'Rich', color: '#563218', shadow: '#3E2210', header: '', line: '#2A1509' },
];

export const HAIR_COLORS = [
  { name: 'Jet Black', color: '#15131C', hi: '#2E2A3D' },
  { name: 'Soft Black', color: '#241F2E', hi: '#3D3650' },
  { name: 'Dark Brown', color: '#3A2618', hi: '#573A26' },
  { name: 'Chestnut', color: '#5C3A21', hi: '#7E5231' },
  { name: 'Auburn', color: '#7B3F2A', hi: '#A0553A' },
  { name: 'Henna', color: '#9C4722', hi: '#C25E31' },
  { name: 'Ash Grey', color: '#7C7A85', hi: '#9E9CA8' },
  { name: 'Silver', color: '#C4C2CC', hi: '#E2E0EA' },
];

export const HAIR_STYLES = [
  { name: 'Short Crop', id: 'short' },
  { name: 'Side Part', id: 'sidepart' },
  { name: 'Buzz', id: 'buzz' },
  { name: 'Wavy Bob', id: 'bob' },
  { name: 'Long', id: 'long' },
  { name: 'Curly', id: 'curly' },
  { name: 'Bun', id: 'bun' },
  { name: 'Ponytail', id: 'ponytail' },
  { name: 'Braided', id: 'braid' },
  { name: 'Turban', id: 'turban' },
  { name: 'Hijab', id: 'hijab' },
  { name: 'Bald', id: 'bald' },
];

export const EYE_STYLES = [
  { name: 'Round', id: 'round' },
  { name: 'Almond', id: 'almond' },
  { name: 'Narrow', id: 'narrow' },
  { name: 'Wide', id: 'wide' },
  { name: 'Focused', id: 'focused' },
];

export const EYE_COLORS = [
  { name: 'Dark Brown', color: '#3B2314' },
  { name: 'Brown', color: '#6B4423' },
  { name: 'Hazel', color: '#8E6B3A' },
  { name: 'Amber', color: '#B67A2E' },
  { name: 'Grey', color: '#5A6270' },
  { name: 'Green', color: '#3F6B4A' },
  { name: 'Blue', color: '#3D5F84' },
];

export const BROW_STYLES = [
  { name: 'Natural', id: 'natural' },
  { name: 'Arched', id: 'arched' },
  { name: 'Straight', id: 'straight' },
  { name: 'Thick', id: 'thick' },
];

export const MOUTH_STYLES = [
  { name: 'Smile', id: 'smile' },
  { name: 'Neutral', id: 'neutral' },
  { name: 'Grin', id: 'grin' },
  { name: 'Focused', id: 'focused' },
];

export const FACIAL_HAIR = [
  { name: 'None', id: 'none' },
  { name: 'Stubble', id: 'stubble' },
  { name: 'Moustache', id: 'moustache' },
  { name: 'Goatee', id: 'goatee' },
  { name: 'Full Beard', id: 'beard' },
];

export const OUTFITS = [
  { name: 'Lab Coat', id: 'labcoat', base: '#F1F3F7', trim: '#D3D8E2' },
  { name: 'Scrubs (Teal)', id: 'scrubs_teal', base: '#6FB3AC', trim: '#5A9A93' },
  { name: 'Scrubs (Navy)', id: 'scrubs_navy', base: '#5E7BA6', trim: '#4C6890' },
  { name: 'Scrubs (Plum)', id: 'scrubs_plum', base: '#A385AB', trim: '#8C7094' },
  { name: 'Kurta', id: 'kurta', base: '#E0B96D', trim: '#C79F55' },
  { name: 'Casual', id: 'casual', base: '#7C8299', trim: '#666C82' },
];

export const ACCESSORIES = [
  { name: 'None', id: 'none' },
  { name: 'Glasses', id: 'glasses' },
  { name: 'Round Specs', id: 'round_specs' },
  { name: 'Surgical Mask', id: 'mask' },
  { name: 'Loupes', id: 'loupes' },
  { name: 'Stethoscope', id: 'stethoscope' },
  { name: 'Head Mirror', id: 'headmirror' },
];

export const BACKGROUNDS = [
  { name: 'Sage', from: '#E0EEE8', to: '#C6DDD2' },
  { name: 'Cream', from: '#F6EFE2', to: '#EADFCE' },
  { name: 'Sand', from: '#F2E8C9', to: '#E6D8AE' },
  { name: 'Blush', from: '#FBE7E7', to: '#F3CFD0' },
  { name: 'Sky', from: '#E3EDF3', to: '#C9DDE8' },
  { name: 'Lilac', from: '#EFE8F3', to: '#DCCBE4' },
];

export const ACADEMIC_ROLES = [
  '3rd Year BDS Student',
  'Final Year BDS Student',
  'Dental Intern (CRRI)',
  'NEET-MDS Aspirant',
  'MDS PG Resident (Oral Pathology)',
  'MDS PG Resident (OMR)',
  'MDS PG Resident (OMFS)',
  'Oral Pathologist / Faculty',
];

/** Every customisable field with its option count, for randomising. */
export const AVATAR_FIELDS = {
  skinTone: SKIN_TONES.length,
  hairStyle: HAIR_STYLES.length,
  hairColor: HAIR_COLORS.length,
  eyeStyle: EYE_STYLES.length,
  eyeColor: EYE_COLORS.length,
  brows: BROW_STYLES.length,
  mouth: MOUTH_STYLES.length,
  facialHair: FACIAL_HAIR.length,
  outfit: OUTFITS.length,
  accessory: ACCESSORIES.length,
  background: BACKGROUNDS.length,
};

export function randomAvatar() {
  const a = {};
  for (const [field, count] of Object.entries(AVATAR_FIELDS)) {
    a[field] = Math.floor(Math.random() * count);
  }
  return a;
}
