import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';
import { Check, Sparkles, Trophy } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// Detailed SVG Histology Slide Images per Topic
// H&E–stained tissue cross-sections (Neville's textbook)
// ═══════════════════════════════════════════════════════════

const HISTOLOGY_SLIDES = {
  om: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fce7f3"/><stop offset="1" stop-color="#831843"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#bg)"/>
    <rect y="0" width="600" height="60" fill="#f9a8d4" opacity=".8"/>
    <text x="300" y="38" fill="#831843" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stratum Corneum (Keratinized Layer)</text>
    <path d="M0 60 Q80 90 160 65 T320 75 T480 60 T600 72 L600 140 L0 140Z" fill="#ec4899" opacity=".7"/>
    <text x="300" y="110" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stratum Granulosum</text>
    <rect y="140" width="600" height="120" fill="#be185d" opacity=".8"/>
    ${[80,180,280,380,500].map(x=>`<ellipse cx="${x}" cy="${185}" rx="18" ry="12" fill="#9d174d" stroke="#f472b6" stroke-width="1.5"/><circle cx="${x}" cy="${185}" r="5" fill="#4a044e"/>`).join('')}
    <text x="300" y="235" fill="#fbcfe8" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stratum Spinosum (Prickle Cell Layer)</text>
    <path d="M0 260 Q100 290 200 265 T400 280 T600 260 L600 310 L0 310Z" fill="#9d174d"/>
    ${[60,150,240,340,440,540].map(x=>`<ellipse cx="${x}" cy="${290}" rx="14" ry="9" fill="#701a75" stroke="#d946ef" stroke-width="1"/><circle cx="${x}" cy="${290}" r="4" fill="#3b0764"/>`).join('')}
    <text x="300" y="305" fill="#e879f9" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stratum Basale</text>
    <path d="M0 310 Q50 340 100 315 T200 330 T300 310 T400 325 T500 310 T600 320 L600 320 L0 320Z" fill="#7c3aed" stroke="#a855f7" stroke-width="2"/>
    <text x="300" y="345" fill="#ddd6fe" font-size="11" text-anchor="middle" font-family="sans-serif">— Basement Membrane —</text>
    <rect y="355" width="600" height="245" fill="#581c87" opacity=".85"/>
    ${[100,250,400,520].map(x=>`<circle cx="${x}" cy="${420}" r="22" fill="none" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="${x}" cy="${420}" r="8" fill="#f472b6" opacity=".6"/>`).join('')}
    <text x="300" y="470" fill="#d8b4fe" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Lamina Propria</text>
    ${[80,200,350,480].map(x=>`<path d="M${x} 500 Q${x+20} 480 ${x+40} 510 T${x+80} 500" fill="none" stroke="#f87171" stroke-width="2" opacity=".6"/>`).join('')}
    <text x="300" y="560" fill="#fca5a5" font-size="12" text-anchor="middle" font-family="sans-serif">Blood Vessels & Capillary Loops</text>
  </svg>`)}`,

  td: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><radialGradient id="eg" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#1e3a5f"/></radialGradient></defs>
    <rect width="600" height="600" fill="#0f172a"/>
    <circle cx="300" cy="280" r="200" fill="url(#eg)" opacity=".9"/>
    <circle cx="300" cy="280" r="140" fill="#bfdbfe" stroke="#3b82f6" stroke-width="2"/>
    <text x="300" y="260" fill="#1e3a8a" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">Inner Enamel</text>
    <text x="300" y="280" fill="#1e3a8a" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">Epithelium</text>
    <circle cx="300" cy="280" r="80" fill="#93c5fd" stroke="#2563eb" stroke-width="2"/>
    <text x="300" y="275" fill="#1e40af" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stellate</text>
    <text x="300" y="293" fill="#1e40af" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Reticulum</text>
    <circle cx="300" cy="280" r="40" fill="#60a5fa" stroke="#1d4ed8" stroke-width="2"/>
    <text x="300" y="284" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Dental Papilla</text>
    <text x="300" y="70" fill="#93c5fd" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Bell Stage — Enamel Organ</text>
    <text x="300" y="520" fill="#60a5fa" font-size="14" text-anchor="middle" font-family="sans-serif">Outer Enamel Epithelium</text>
    <path d="M300 480 L300 500" stroke="#60a5fa" stroke-width="1.5"/>
    <text x="300" y="560" fill="#94a3b8" font-size="13" text-anchor="middle" font-family="sans-serif">Dental Follicle (Ectomesenchyme)</text>
    ${[140,200,260,340,400,460].map(x=>`<circle cx="${x}" cy="${280}" r="3" fill="#1e40af" opacity=".5"/>`).join('')}
  </svg>`)}`,

  en: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#f0f9ff"/>
    <rect x="0" y="0" width="600" height="80" fill="#e0f2fe"/>
    <text x="300" y="50" fill="#0c4a6e" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Enamel Cross-Section (Ground Section)</text>
    ${Array.from({length:20}).map((_,i)=>`<line x1="${30+i*28}" y1="100" x2="${30+i*28}" y2="520" stroke="#7dd3fc" stroke-width="2" opacity=".4"/>`).join('')}
    ${Array.from({length:8}).map((_,i)=>{const y=120+i*50;return`<path d="M20 ${y} Q150 ${y+20} 300 ${y-10} T600 ${y}" fill="none" stroke="#38bdf8" stroke-width="1.5" opacity=".5"/>`;}).join('')}
    <text x="300" y="140" fill="#0369a1" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Enamel Rods (Prisms)</text>
    <rect x="50" y="200" width="500" height="30" fill="#bae6fd" opacity=".4" rx="4"/>
    <text x="300" y="222" fill="#075985" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Hunter-Schreger Bands</text>
    <rect x="50" y="300" width="500" height="25" fill="#7dd3fc" opacity=".3" rx="4"/>
    <text x="300" y="320" fill="#0c4a6e" font-size="12" text-anchor="middle" font-family="sans-serif">Lines of Retzius (Growth Lines)</text>
    <path d="M0 450 L600 450" stroke="#f97316" stroke-width="3" stroke-dasharray="8 4"/>
    <text x="300" y="475" fill="#ea580c" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">DEJ (Dentinoenamel Junction)</text>
    <rect y="490" width="600" height="110" fill="#fef3c7" opacity=".8"/>
    <text x="300" y="550" fill="#92400e" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Dentin (Mantle Dentin Region)</text>
  </svg>`)}`,

  dp: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#fefce8"/>
    <rect y="0" width="600" height="250" fill="#fef9c3"/>
    <text x="300" y="40" fill="#713f12" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">Dentin — Dentinal Tubules</text>
    ${Array.from({length:30}).map((_,i)=>`<line x1="${20+i*19}" y1="60" x2="${20+i*19}" y2="240" stroke="#ca8a04" stroke-width="1" opacity=".5"/>`).join('')}
    ${Array.from({length:6}).map((_,i)=>{const y=80+i*25;return`<path d="M0 ${y} Q300 ${y+15} 600 ${y}" fill="none" stroke="#eab308" stroke-width="1" opacity=".4"/>`;}).join('')}
    <text x="300" y="140" fill="#854d0e" font-size="12" text-anchor="middle" font-family="sans-serif">Peritubular Dentin (Hypermineralized)</text>
    <text x="300" y="210" fill="#a16207" font-size="12" text-anchor="middle" font-family="sans-serif">Intertubular Dentin Matrix</text>
    <path d="M0 250 L600 250" stroke="#f59e0b" stroke-width="3"/>
    <text x="300" y="275" fill="#b45309" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Predentin Zone</text>
    <rect y="290" width="600" height="40" fill="#fde68a" opacity=".6"/>
    ${[60,140,220,300,380,460,540].map(x=>`<rect x="${x-8}" y="295" width="16" height="30" rx="4" fill="#92400e" opacity=".7"/><circle cx="${x}" cy="300" r="4" fill="#451a03"/>`).join('')}
    <text x="300" y="355" fill="#78350f" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Odontoblast Layer</text>
    <rect y="370" width="600" height="230" fill="#fef3c7" opacity=".5"/>
    <text x="300" y="420" fill="#92400e" font-size="16" font-weight="bold" text-anchor="middle" font-family="sans-serif">Dental Pulp</text>
    ${[120,300,480].map(x=>`<path d="M${x} 440 Q${x+30} 470 ${x+60} 440 T${x+120} 460" fill="none" stroke="#dc2626" stroke-width="2" opacity=".5"/>`).join('')}
    <text x="300" y="510" fill="#b91c1c" font-size="12" text-anchor="middle" font-family="sans-serif">Blood Vessels & Nerve Fibers</text>
    ${[100,250,420].map(x=>`<circle cx="${x}" cy="${540}" r="12" fill="none" stroke="#7c3aed" stroke-width="1.5"/><circle cx="${x}" cy="${540}" r="4" fill="#7c3aed" opacity=".5"/>`).join('')}
    <text x="300" y="575" fill="#6d28d9" font-size="11" text-anchor="middle" font-family="sans-serif">Fibroblasts & Undifferentiated Mesenchymal Cells</text>
  </svg>`)}`,

  sg: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#f0fdf4"/>
    <text x="300" y="40" fill="#14532d" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">Salivary Gland — Mixed Acini (H&amp;E)</text>
    ${[{x:120,y:150,r:55,t:'Serous',c:'#86efac',sc:'#16a34a',tc:'#14532d'},{x:320,y:150,r:55,t:'Mucous',c:'#d1fae5',sc:'#059669',tc:'#064e3b'},{x:500,y:150,r:55,t:'Serous',c:'#86efac',sc:'#16a34a',tc:'#14532d'}].map((a,i)=>`<circle cx="${a.x}" cy="${a.y}" r="${a.r}" fill="${a.c}" stroke="${a.sc}" stroke-width="2"/>${Array.from({length:6}).map((_,j)=>{const angle=(j/6)*Math.PI*2;const cx2=a.x+Math.cos(angle)*25;const cy2=a.y+Math.sin(angle)*25;return`<circle cx="${cx2}" cy="${cy2}" r="6" fill="${a.sc}" opacity=".4"/>`;}).join('')}<text x="${a.x}" y="${a.y+5}" fill="${a.tc}" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">${a.t} Acinus</text>`).join('')}
    <text x="320" y="230" fill="#065f46" font-size="12" text-anchor="middle" font-family="sans-serif">Serous Demilune (Crescentic Cap)</text>
    <path d="M265 120 Q320 100 375 120" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="4 3"/>
    <rect x="100" y="290" width="400" height="50" rx="20" fill="#bbf7d0" stroke="#22c55e" stroke-width="2"/>
    <text x="300" y="320" fill="#15803d" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Intercalated Duct</text>
    <rect x="150" y="370" width="300" height="45" rx="18" fill="#86efac" stroke="#16a34a" stroke-width="2"/>
    <text x="300" y="398" fill="#166534" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Striated Duct</text>
    <rect x="200" y="445" width="200" height="40" rx="16" fill="#4ade80" stroke="#15803d" stroke-width="2.5"/>
    <text x="300" y="470" fill="#052e16" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Excretory Duct</text>
    <text x="300" y="530" fill="#14532d" font-size="12" text-anchor="middle" font-family="sans-serif">Myoepithelial Cells (Basket Cells)</text>
    ${[120,300,480].map(x=>`<path d="M${x-20} 550 Q${x} 535 ${x+20} 550" fill="none" stroke="#15803d" stroke-width="1.5"/>`).join('')}
  </svg>`)}`,

  pd: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#fff7ed"/>
    <text x="300" y="40" fill="#7c2d12" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">Periodontium — PDL Cross-Section</text>
    <rect x="0" y="60" width="200" height="540" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
    <text x="100" y="330" fill="#92400e" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif" transform="rotate(-90,100,330)">Cementum</text>
    <rect x="400" y="60" width="200" height="540" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
    <text x="500" y="330" fill="#475569" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif" transform="rotate(90,500,330)">Alveolar Bone</text>
    <rect x="200" y="60" width="200" height="540" fill="#fed7aa" opacity=".5"/>
    <text x="300" y="100" fill="#9a3412" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">PDL Space</text>
    ${Array.from({length:12}).map((_,i)=>{const y=120+i*38;return`<line x1="210" y1="${y}" x2="390" y2="${y+15}" stroke="#ea580c" stroke-width="1.5" opacity=".5"/>`;}).join('')}
    <text x="300" y="250" fill="#c2410c" font-size="12" text-anchor="middle" font-family="sans-serif">Principal Fiber Groups</text>
    ${[250,300,350].map(x=>`<circle cx="${x}" cy="${350}" r="8" fill="none" stroke="#dc2626" stroke-width="1.5"/><circle cx="${x}" cy="${350}" r="3" fill="#dc2626" opacity=".5"/>`).join('')}
    <text x="300" y="390" fill="#991b1b" font-size="12" text-anchor="middle" font-family="sans-serif">Blood Vessels</text>
    <text x="300" y="450" fill="#9a3412" font-size="12" text-anchor="middle" font-family="sans-serif">Fibroblasts (Most Abundant)</text>
    <text x="300" y="520" fill="#7c2d12" font-size="12" text-anchor="middle" font-family="sans-serif">Sharpey's Fibers →</text>
  </svg>`)}`,

  tb: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#faf5ff"/>
    <text x="300" y="40" fill="#581c87" font-size="17" font-weight="bold" text-anchor="middle" font-family="sans-serif">Compact Bone — Haversian System</text>
    ${[{x:180,y:200},{x:420,y:200},{x:300,y:380}].map((c,i)=>`<circle cx="${c.x}" cy="${c.y}" r="100" fill="none" stroke="#a855f7" stroke-width="1" opacity=".3"/><circle cx="${c.x}" cy="${c.y}" r="80" fill="none" stroke="#a855f7" stroke-width="1" opacity=".4"/><circle cx="${c.x}" cy="${c.y}" r="60" fill="none" stroke="#a855f7" stroke-width="1" opacity=".5"/><circle cx="${c.x}" cy="${c.y}" r="40" fill="none" stroke="#a855f7" stroke-width="1.5" opacity=".6"/><circle cx="${c.x}" cy="${c.y}" r="20" fill="#c084fc" opacity=".3"/><circle cx="${c.x}" cy="${c.y}" r="8" fill="#7c3aed"/>${Array.from({length:8}).map((_,j)=>{const angle=(j/8)*Math.PI*2;const ox=c.x+Math.cos(angle)*55;const oy=c.y+Math.sin(angle)*55;return`<ellipse cx="${ox}" cy="${oy}" rx="6" ry="3" fill="#581c87" opacity=".5" transform="rotate(${j*45},${ox},${oy})"/>`;}).join('')}`).join('')}
    <text x="180" y="120" fill="#6b21a8" font-size="11" text-anchor="middle" font-family="sans-serif">Osteon 1</text>
    <text x="420" y="120" fill="#6b21a8" font-size="11" text-anchor="middle" font-family="sans-serif">Osteon 2</text>
    <text x="300" y="500" fill="#7c3aed" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Haversian Canal (Central)</text>
    <text x="300" y="530" fill="#9333ea" font-size="12" text-anchor="middle" font-family="sans-serif">Concentric Lamellae</text>
    <text x="300" y="555" fill="#a855f7" font-size="11" text-anchor="middle" font-family="sans-serif">Lacunae with Osteocytes</text>
    <text x="300" y="580" fill="#c084fc" font-size="11" text-anchor="middle" font-family="sans-serif">Canaliculi (Interconnecting)</text>
  </svg>`)}`,
};

function getSlideForMission(missionId) {
  const prefix = missionId?.substring(0, 2) || 'om';
  return HISTOLOGY_SLIDES[prefix] || HISTOLOGY_SLIDES.om;
}

export default function JigsawGame({ gridSize = 3, imageDesc = '', puzzleData, onComplete, giveHintRef }) {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [placedCount, setPlacedCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [missionId, setMissionId] = useState('');

  const labels = puzzleData?.labels || [
    'Stratum Basale',
    'Stratum Spinosum',
    'Stratum Granulosum',
    'Stratum Corneum',
    'Lamina Propria',
    'Submucosa',
    'Basement Membrane',
    'Capillary Loop',
    'Fibroblasts',
  ];

  const totalPieces = gridSize * gridSize;

  // Detect mission ID from URL hash
  useEffect(() => {
    const hash = window.location.hash || '';
    const match = hash.match(/mission\/([a-z]+_m\d+)/);
    if (match) setMissionId(match[1]);
  }, []);

  const slideImageUrl = puzzleData?.slideImage || getSlideForMission(missionId);

  useEffect(() => {
    const initialPieces = [];
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const id = r * gridSize + c;
        const label = labels[id % labels.length] || `Layer ${id + 1}`;
        
        const bgPosX = c * 50;
        const bgPosY = r * 50;

        initialPieces.push({
          id,
          r,
          c,
          label,
          placed: false,
          bgPosX: `${bgPosX}%`,
          bgPosY: `${bgPosY}%`,
        });
      }
    }

    const shuffled = [...initialPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setPlacedCount(0);
    setSelectedPiece(null);
    setIsCompleted(false);
  }, [gridSize, imageDesc, puzzleData]);

  useEffect(() => {
    if (giveHintRef) {
      giveHintRef.current = () => {
        setPieces(prev => {
          const unplaced = prev.filter(p => !p.placed);
          if (unplaced.length > 0) {
            const target = unplaced[0];
            Audio.playHint();
            return prev.map(p => (p.id === target.id ? { ...p, placed: true } : p));
          }
          return prev;
        });

        setPlacedCount(prev => {
          const next = prev + 1;
          if (next >= totalPieces) {
            Audio.playStar();
            setIsCompleted(true);
          }
          return next;
        });
      };
    }
  }, [giveHintRef, totalPieces]);

  const handlePieceClick = (piece) => {
    if (piece.placed) return;
    Audio.playClick();
    if (selectedPiece?.id === piece.id) {
      setSelectedPiece(null);
    } else {
      setSelectedPiece(piece);
    }
  };

  const handleSlotClick = (r, c) => {
    if (!selectedPiece) return;

    if (selectedPiece.r === r && selectedPiece.c === c) {
      placePieceOnBoard(selectedPiece.id);
    } else {
      Audio.playWrong();
    }
  };

  const placePieceOnBoard = (pieceId) => {
    setPieces(prev =>
      prev.map(p => (p.id === pieceId ? { ...p, placed: true } : p))
    );
    setSelectedPiece(null);
    Audio.playPiecePlaced();

    setPlacedCount(prev => {
      const nextCount = prev + 1;
      if (nextCount === totalPieces) {
        Audio.playStar();
        setIsCompleted(true);
      }
      return nextCount;
    });
  };

  const handleFinish = () => {
    if (onComplete) onComplete({ hintsUsed: 0, mistakes: 0 });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center gap-6 relative">
      {/* Victory Celebration Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel border border-emerald-500/40 p-8 rounded-3xl max-w-md w-full flex flex-col items-center gap-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 text-3xl shadow-xl shadow-emerald-500/30">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-2xl text-gradient">
                Histology Slide Reconstructed!
              </h3>
              <p className="text-xs text-gray-300 mt-1">
                All microscopic tissue slide sections assembled accurately!
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4" /> +300 EXP Earned
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-teal-500/20 cursor-pointer hover:scale-[1.02] transition-transform"
            >
              Proceed to Neville's MCQs Quiz →
            </button>
          </div>
        </div>
      )}

      {/* Assembly Grid Frame */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="text-xs uppercase font-bold tracking-wider text-teal-400 text-center">
          Histology Slide Frame — Tap fragment below, then tap matching slot
        </div>

        <div 
          className="grid gap-1.5 p-3 glass-panel border-2 border-teal-500/40 rounded-2xl aspect-square w-full max-w-[360px] md:max-w-[420px] shadow-2xl shadow-teal-500/20 relative overflow-hidden"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {Array.from({ length: totalPieces }).map((_, idx) => {
            const r = Math.floor(idx / gridSize);
            const c = idx % gridSize;
            const placedPiece = pieces.find(p => p.placed && p.r === r && p.c === c);

            return (
              <button
                key={`slot-${r}-${c}`}
                onClick={() => handleSlotClick(r, c)}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all cursor-pointer overflow-hidden p-0.5 ${
                  placedPiece
                    ? 'border-teal-300 shadow-xl'
                    : selectedPiece
                    ? 'border-dashed border-amber-400 bg-amber-400/20 hover:bg-amber-400/30'
                    : 'border-dashed border-white/20 bg-slate-900/90'
                }`}
                style={
                  placedPiece
                    ? { 
                        backgroundImage: `url("${slideImageUrl}")`, 
                        backgroundSize: '300% 300%', 
                        backgroundPosition: `${placedPiece.bgPosX} ${placedPiece.bgPosY}` 
                      }
                    : undefined
                }
              >
                {placedPiece ? (
                  <div className="flex flex-col items-center justify-center text-center bg-slate-950/50 p-0.5 rounded-lg w-full h-full">
                    <span className="text-[9px] font-extrabold text-white leading-tight drop-shadow-md">
                      {placedPiece.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-0.5">
                    <span className="text-[10px] font-bold">Slot {idx + 1}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Piece Tray Container */}
      <div className="w-full glass-panel border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-3">
        <div className="text-xs uppercase tracking-wider font-bold text-gray-300">
          Unplaced Histology Slide Fragments ({pieces.filter(p => !p.placed).length} remaining)
        </div>

        <div className="grid grid-cols-3 gap-2.5 w-full max-w-[420px]">
          {pieces.filter(p => !p.placed).map((piece) => {
            const isSelected = selectedPiece?.id === piece.id;

            return (
              <button
                key={`piece-${piece.id}`}
                onClick={() => handlePieceClick(piece)}
                className={`aspect-video p-0.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-amber-400 ring-4 ring-amber-400/50 scale-105 shadow-xl font-bold'
                    : 'border-white/20 hover:scale-105 hover:border-teal-400/60'
                }`}
                style={{ 
                  backgroundImage: `url("${slideImageUrl}")`, 
                  backgroundSize: '300% 300%', 
                  backgroundPosition: `${piece.bgPosX} ${piece.bgPosY}` 
                }}
              >
                <div className="bg-slate-950/70 p-1 rounded-lg border border-white/10 w-full h-full flex items-center justify-center">
                  <span className="text-[9px] font-extrabold text-white text-center leading-tight drop-shadow-md">
                    {piece.label}
                  </span>
                </div>
              </button>
            );
          })}

          {pieces.filter(p => !p.placed).length === 0 && (
            <div className="col-span-3 text-sm font-bold text-teal-300 text-center py-2 flex items-center justify-center gap-2">
              🎉 All histology slide fragments assembled cleanly!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
