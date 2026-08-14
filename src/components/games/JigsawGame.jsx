import React, { useState, useEffect } from 'react';
import { Audio } from '../../utils/audio';
import { Check, Sparkles, Trophy } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// Detailed SVG Histology Slide Images per Topic
// H&E–stained tissue cross-sections (Neville's textbook)
// ═══════════════════════════════════════════════════════════

const HISTOLOGY_SLIDES = {
  otc: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="bg_otc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="#312e81"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#bg_otc)"/>
    <text x="300" y="38" fill="#a5b4fc" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Ameloblastoma &amp; OKC (Neville Ch. 15)</text>
    
    <!-- Ameloblastoma Follicle 1 -->
    <path d="M 60 80 Q 280 60 280 260 Q 180 340 60 260 Z" fill="#3730a3" stroke="#818cf8" stroke-width="3"/>
    <!-- Peripheral Tall Columnar Palisading (Vickers-Gorlin) -->
    ${[80,110,140,170,200,230,260].map(x=>`<rect x="${x}" y="75" width="16" height="28" rx="3" fill="#4338ca" stroke="#a5b4fc" stroke-width="1.5"/><circle cx="${x+8}" cy="85" r="4" fill="#e0e7ff"/>`).join('')}
    <text x="170" y="140" fill="#c7d2fe" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Reversed Nuclear Polarity</text>
    <!-- Central Stellate Reticulum -->
    ${[100,150,200,240].map(x=>`<polygon points="${x},180 ${x+12},200 ${x-12},200" fill="#6366f1" opacity=".7"/><circle cx="${x}" cy="195" r="3" fill="#e0e7ff"/>`).join('')}
    <text x="170" y="240" fill="#e0e7ff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Stellate Reticulum Core</text>

    <!-- OKC Wavy Parakeratin Cyst Wall -->
    <rect x="330" y="80" width="230" height="240" rx="12" fill="#1e1b4b" stroke="#c084fc" stroke-width="2.5"/>
    <path d="M 340 110 Q 380 95 420 115 T 500 100 T 550 115" fill="none" stroke="#f472b6" stroke-width="6"/>
    <text x="445" y="145" fill="#fbcfe8" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Wavy Corrugated Parakeratin</text>
    ${[350,380,410,440,470,500,530].map(x=>`<rect x="${x}" y="160" width="14" height="24" rx="2" fill="#581c87" stroke="#d8b4fe" stroke-width="1"/><circle cx="${x+7}" cy="168" r="3" fill="#fae8ff"/>`).join('')}
    <text x="445" y="215" fill="#e9d5ff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Tombstone Basal Layer (6-8 cells)</text>
    <text x="445" y="270" fill="#f43f5e" font-size="12" text-anchor="middle" font-family="sans-serif">Satellite Daughter Microcysts</text>

    <!-- Bottom Stroma & Rushton Bodies -->
    <rect y="360" width="600" height="240" fill="#312e81" opacity=".9"/>
    <text x="300" y="395" fill="#fbcfe8" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Fibrovascular Connective Tissue Stroma</text>
    ${[100,250,400,520].map(x=>`<path d="M ${x} 440 Q ${x+30} 410 ${x+60} 450 T ${x+100} 430" fill="none" stroke="#fb7185" stroke-width="4"/><text x="${x+50}" y="470" fill="#fda4af" font-size="11" text-anchor="middle" font-family="sans-serif">Rushton Body</text>`).join('')}
    ${[150,350,500].map(x=>`<circle cx="${x}" cy="${530}" r="22" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 3"/><circle cx="${x}" cy="${530}" r="8" fill="#e11d48" opacity=".7"/>`).join('')}
    <text x="300" y="575" fill="#bae6fd" font-size="12" text-anchor="middle" font-family="sans-serif">Angiogenesis &amp; Chronic Inflammatory Infiltrate</text>
  </svg>`)}`,

  ep: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="bg_ep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#831843"/><stop offset="1" stop-color="#4c0519"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#bg_ep)"/>
    <text x="300" y="38" fill="#fbcfe8" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Well-Differentiated OSCC (Neville Ch. 10)</text>

    <!-- Invasive Epithelial Island 1 with Keratin Pearl -->
    <path d="M 50 80 Q 280 50 280 270 Q 180 330 50 260 Z" fill="#9d174d" stroke="#f472b6" stroke-width="2"/>
    <!-- Concentric Keratin Pearl -->
    <circle cx="160" cy="180" r="55" fill="#f43f5e" stroke="#fb7185" stroke-width="3"/>
    <circle cx="160" cy="180" r="40" fill="#fda4af" stroke="#f43f5e" stroke-width="2"/>
    <circle cx="160" cy="180" r="25" fill="#ffe4e6" stroke="#fb7185" stroke-width="2"/>
    <circle cx="160" cy="180" r="10" fill="#fff"/>
    <text x="160" y="260" fill="#ffe4e6" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Concentric Keratin Pearl</text>

    <!-- Cellular Atypia & Mitoses -->
    <rect x="330" y="80" width="230" height="230" rx="12" fill="#701a75" stroke="#e879f9" stroke-width="2"/>
    ${[360,420,480,530].map(x=>`<ellipse cx="${x}" cy="120" rx="14" ry="10" fill="#4a044e" stroke="#f0abfc" stroke-width="1.5"/><circle cx="${x}" cy="120" r="4" fill="#fae8ff"/>`).join('')}
    <text x="445" y="160" fill="#f5d0fe" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Nuclear Pleomorphism</text>
    <!-- Atypical Mitosis -->
    <polygon points="430,190 460,190 445,215" fill="#f43f5e"/>
    <polygon points="430,230 460,230 445,205" fill="#f43f5e"/>
    <text x="445" y="255" fill="#fb7185" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Atypical Multipolar Mitosis</text>

    <!-- Desmoplastic Stroma & Perineural Invasion -->
    <rect y="340" width="600" height="260" fill="#500724" opacity=".95"/>
    <text x="300" y="375" fill="#fbcfe8" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Dense Desmoplastic Collagenous Stroma</text>
    <!-- Nerve Bundle with Tumor Wrapping -->
    <circle cx="180" cy="480" r="40" fill="#fde047" stroke="#ca8a04" stroke-width="3"/>
    <text x="180" y="485" fill="#713f12" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Nerve Trunk</text>
    ${Array.from({length:8}).map((_,i)=>{const a=(i/8)*Math.PI*2;return`<ellipse cx="${180+Math.cos(a)*55}" cy="${480+Math.sin(a)*55}" rx="9" ry="7" fill="#e11d48" stroke="#fff" stroke-width="1"/>`;}).join('')}
    <text x="180" y="565" fill="#fca5a5" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Perineural Invasion</text>

    <!-- Intercellular Bridges -->
    <rect x="350" y="430" width="200" height="100" rx="8" fill="#831843" stroke="#f472b6" stroke-width="1.5"/>
    <text x="450" y="465" fill="#fbcfe8" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Intercellular Prickle Bridges</text>
    <text x="450" y="495" fill="#f9a8d4" font-size="11" text-anchor="middle" font-family="sans-serif">Dyskeratotic Epithelial Island</text>
  </svg>`)}`,

  sp: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="bg_sp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#042f2e"/><stop offset="1" stop-color="#134e4a"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#bg_sp)"/>
    <text x="300" y="38" fill="#5eead4" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Salivary Gland Neoplasms (Neville Ch. 11)</text>

    <!-- Pleomorphic Adenoma Chondromyxoid Zone -->
    <rect x="40" y="70" width="240" height="240" rx="14" fill="#115e59" stroke="#2dd4bf" stroke-width="2"/>
    <text x="160" y="105" fill="#99f6e4" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Pleomorphic Adenoma</text>
    <!-- Ducts -->
    <circle cx="100" cy="160" r="22" fill="#0d9488" stroke="#ccfbf1" stroke-width="2"/><circle cx="100" cy="160" r="10" fill="#f0fdfa"/>
    <circle cx="210" cy="160" r="22" fill="#0d9488" stroke="#ccfbf1" stroke-width="2"/><circle cx="210" cy="160" r="10" fill="#f0fdfa"/>
    <text x="160" y="210" fill="#ccfbf1" font-size="12" text-anchor="middle" font-family="sans-serif">Ducts + Plasmacytoid Myoepithelium</text>
    <path d="M 60 240 Q 160 210 260 240 L 260 290 L 60 290 Z" fill="#14b8a6" opacity=".5"/>
    <text x="160" y="275" fill="#f0fdfa" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Chondromyxoid Matrix</text>

    <!-- Adenoid Cystic Carcinoma Swiss Cheese -->
    <rect x="320" y="70" width="240" height="240" rx="14" fill="#0f766e" stroke="#14b8a6" stroke-width="2"/>
    <text x="440" y="105" fill="#99f6e4" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Adenoid Cystic Carcinoma</text>
    <!-- Cribriform Spaces -->
    ${[{x:370,y:150},{x:440,y:150},{x:510,y:150},{x:400,y:210},{x:480,y:210}].map(p=>`<circle cx="${p.x}" cy="${p.y}" r="18" fill="#ccfbf1" stroke="#042f2e" stroke-width="3"/><circle cx="${p.x}" cy="${p.y}" r="12" fill="#99f6e4" opacity=".6"/>`).join('')}
    <text x="440" y="275" fill="#ccfbf1" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Cribriform Swiss-Cheese</text>

    <!-- Mucoepidermoid Carcinoma & Warthin Below -->
    <rect y="340" width="600" height="260" fill="#134e4a" opacity=".95"/>
    <text x="300" y="375" fill="#5eead4" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mucoepidermoid Carcinoma Trilineage Spectrum</text>
    <!-- Mucous Cells -->
    <circle cx="120" cy="450" r="32" fill="#cffafe" stroke="#06b6d4" stroke-width="2"/>
    <text x="120" y="455" fill="#0e7490" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mucous Cell</text>
    <text x="120" y="510" fill="#a5f3fc" font-size="11" text-anchor="middle" font-family="sans-serif">Mucicarmine (+)</text>
    <!-- Squamoid Epidermoid -->
    <rect x="230" y="420" width="140" height="70" rx="8" fill="#0d9488" stroke="#5eead4" stroke-width="1.5"/>
    <text x="300" y="450" fill="#f0fdfa" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Epidermoid (Squamoid)</text>
    <text x="300" y="475" fill="#ccfbf1" font-size="11" text-anchor="middle" font-family="sans-serif">Intercellular Bridges</text>
    <!-- Intermediate Basaloid -->
    <circle cx="480" cy="450" r="32" fill="#0f766e" stroke="#2dd4bf" stroke-width="2"/>
    <text x="480" y="455" fill="#f0fdfa" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Intermediate</text>
    <text x="480" y="510" fill="#99f6e4" font-size="11" text-anchor="middle" font-family="sans-serif">Progenitor Basaloid</text>
  </svg>`)}`,

  bf: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="bg_bf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#451a03"/><stop offset="1" stop-color="#78350f"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#bg_bf)"/>
    <text x="300" y="38" fill="#fde68a" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Bone Pathology &amp; Osteosarcoma (Neville Ch. 14)</text>

    <!-- Fibrous Dysplasia Chinese Script -->
    <rect x="40" y="70" width="240" height="240" rx="14" fill="#92400e" stroke="#f59e0b" stroke-width="2"/>
    <text x="160" y="105" fill="#fef3c7" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Fibrous Dysplasia</text>
    <!-- C-shaped and V-shaped bone trabeculae -->
    <path d="M 70 140 Q 120 120 140 160 T 110 210" fill="none" stroke="#fde68a" stroke-width="8" stroke-linecap="round"/>
    <path d="M 180 140 L 220 180 L 190 220" fill="none" stroke="#fde68a" stroke-width="8" stroke-linecap="round"/>
    <text x="160" y="260" fill="#fef3c7" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Chinese Script Woven Bone</text>
    <text x="160" y="285" fill="#fcd34d" font-size="10" text-anchor="middle" font-family="sans-serif">(No Osteoblastic Rimming)</text>

    <!-- Paget Disease Mosaic Pattern -->
    <rect x="320" y="70" width="240" height="240" rx="14" fill="#92400e" stroke="#f59e0b" stroke-width="2"/>
    <text x="440" y="105" fill="#fef3c7" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Paget Disease of Bone</text>
    <!-- Mosaic Jigsaw Reversal Lines -->
    <rect x="340" y="130" width="200" height="110" fill="#d97706" rx="6"/>
    <path d="M 350 160 Q 400 145 450 170 T 530 155" fill="none" stroke="#1e1b4b" stroke-width="3"/>
    <path d="M 390 135 L 410 235" fill="none" stroke="#1e1b4b" stroke-width="3"/>
    <path d="M 470 135 L 460 235" fill="none" stroke="#1e1b4b" stroke-width="3"/>
    <text x="440" y="270" fill="#fef3c7" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Mosaic Jigsaw Reversal Lines</text>

    <!-- Osteosarcoma Malignant Osteoid Below -->
    <rect y="340" width="600" height="260" fill="#78350f" opacity=".95"/>
    <text x="300" y="375" fill="#fde68a" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Osteosarcoma — Neoplastic Osteoid Synthesis</text>
    <!-- Malignant Osteoid -->
    <path d="M 60 450 Q 200 400 350 470 T 550 430 L 550 510 L 60 510 Z" fill="#b45309" stroke="#fbbf24" stroke-width="3"/>
    <text x="300" y="475" fill="#fffbeb" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Malignant Osteoid Matrix</text>
    ${[100,200,300,400,500].map(x=>`<circle cx="${x}" cy="420" r="14" fill="#451a03" stroke="#f87171" stroke-width="2"/><circle cx="${x}" cy="420" r="5" fill="#fef08a"/>`).join('')}
    <text x="300" y="555" fill="#fde68a" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Atypical Pleomorphic Osteoblasts</text>
  </svg>`)}`,

  ii: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="bg_ii" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#064e3b"/><stop offset="1" stop-color="#022c22"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#bg_ii)"/>
    <text x="300" y="38" fill="#6ee7b7" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Infectious &amp; Immunopathology (Neville Ch. 5, 6, 16)</text>

    <!-- Pemphigus Vulgaris Suprabasal Split -->
    <rect x="40" y="70" width="240" height="240" rx="14" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="160" y="105" fill="#a7f3d0" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Pemphigus Vulgaris</text>
    <rect x="60" y="125" width="200" height="40" rx="4" fill="#065f46"/>
    <text x="160" y="150" fill="#ecfdf5" font-size="11" text-anchor="middle" font-family="sans-serif">Superficial Spinous Layer</text>
    <!-- Intraepithelial Cleft with Tzanck Cells -->
    <rect x="60" y="170" width="200" height="45" fill="#022c22" stroke="#34d399" stroke-width="1.5" stroke-dasharray="3 3"/>
    ${[90,130,170,210,235].map(x=>`<circle cx="${x}" cy="192" r="9" fill="#a7f3d0" stroke="#064e3b" stroke-width="1"/><circle cx="${x}" cy="192" r="3" fill="#022c22"/>`).join('')}
    <text x="160" y="235" fill="#6ee7b7" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Acantholytic Tzanck Cells</text>
    <!-- Tombstone Basal Row -->
    ${[70,95,120,145,170,195,220,245].map(x=>`<rect x="${x}" y="250" width="16" height="25" rx="3" fill="#065f46" stroke="#a7f3d0" stroke-width="1"/>`).join('')}
    <text x="160" y="295" fill="#d1fae5" font-size="10" text-anchor="middle" font-family="sans-serif">Tombstone Basal Cells</text>

    <!-- Tuberculosis Caseating Granuloma -->
    <rect x="320" y="70" width="240" height="240" rx="14" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="440" y="105" fill="#a7f3d0" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Oral Tuberculosis</text>
    <!-- Caseation Core -->
    <circle cx="440" cy="180" r="45" fill="#fecdd3" stroke="#f43f5e" stroke-width="2"/>
    <text x="440" y="185" fill="#9f1239" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">Caseous Necrosis</text>
    <!-- Langhans Giant Cell -->
    <path d="M 370 240 Q 400 220 430 240" fill="none" stroke="#f43f5e" stroke-width="5"/>
    <text x="440" y="275" fill="#ecfdf5" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Langhans Giant Cells</text>

    <!-- Candida Hyphae & Actinomyces Below -->
    <rect y="340" width="600" height="260" fill="#064e3b" opacity=".95"/>
    <text x="300" y="375" fill="#6ee7b7" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Microbial Identifiers: Candida &amp; Actinomyces</text>
    <!-- Candida Pseudohyphae -->
    ${[100,160,220].map(x=>`<path d="M ${x} 420 Q ${x+20} 450 ${x+40} 490 T ${x+60} 540" fill="none" stroke="#e11d48" stroke-width="3.5"/><circle cx="${x+20}" cy="450" r="4" fill="#fda4af"/><circle cx="${x+40}" cy="490" r="4" fill="#fda4af"/>`).join('')}
    <text x="170" y="570" fill="#fda4af" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">PAS (+) Candida Hyphae</text>
    <!-- Actinomyces Sulfur Granule -->
    <circle cx="440" cy="470" r="45" fill="#eab308" stroke="#ca8a04" stroke-width="3"/>
    ${Array.from({length:12}).map((_,i)=>{const a=(i/12)*Math.PI*2;return`<line x1="440" y1="470" x2="${440+Math.cos(a)*65}" y2="${470+Math.sin(a)*65}" stroke="#ca8a04" stroke-width="2"/>`;}).join('')}
    <text x="440" y="570" fill="#fef08a" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Actinomyces Sulfur Granule</text>
  </svg>`)}`,

  st: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="bg_st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b0764"/><stop offset="1" stop-color="#581c87"/></linearGradient></defs>
    <rect width="600" height="600" fill="url(#bg_st)"/>
    <text x="300" y="38" fill="#d8b4fe" font-size="18" font-weight="bold" text-anchor="middle" font-family="sans-serif">Soft Tissue &amp; Hematologic Neoplasms (Neville Ch. 12 &amp; 13)</text>

    <!-- Schwannoma Antoni A and Verocay Body -->
    <rect x="40" y="70" width="240" height="240" rx="14" fill="#6b21a8" stroke="#c084fc" stroke-width="2"/>
    <text x="160" y="105" fill="#f3e8ff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Schwannoma (Neurilemoma)</text>
    <!-- Top Palisade -->
    ${[70,95,120,145,170,195,220,245].map(x=>`<rect x="${x}" y="130" width="12" height="24" rx="3" fill="#3b0764" stroke="#e9d5ff" stroke-width="1"/>`).join('')}
    <!-- Verocay Acellular Zone -->
    <rect x="60" y="160" width="200" height="35" fill="#c084fc" opacity=".4"/>
    <text x="160" y="182" fill="#faf5ff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">Verocay Body (Antoni A)</text>
    <!-- Bottom Palisade -->
    ${[70,95,120,145,170,195,220,245].map(x=>`<rect x="${x}" y="200" width="12" height="24" rx="3" fill="#3b0764" stroke="#e9d5ff" stroke-width="1"/>`).join('')}
    <text x="160" y="275" fill="#e9d5ff" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">S-100 Strongly Positive</text>

    <!-- Burkitt Lymphoma Starry Sky -->
    <rect x="320" y="70" width="240" height="240" rx="14" fill="#1e1b4b" stroke="#818cf8" stroke-width="2"/>
    <text x="440" y="105" fill="#c7d2fe" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Burkitt Lymphoma</text>
    <!-- Dark Sea of B Lymphoblasts -->
    <rect x="340" y="125" width="200" height="120" fill="#312e81" rx="6"/>
    <!-- Tingible Macrophage Stars -->
    ${[{x:370,y:150},{x:480,y:145},{x:420,y:185},{x:510,y:200},{x:360,y:220}].map(p=>`<circle cx="${p.x}" cy="${p.y}" r="12" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/><circle cx="${p.x}" cy="${p.y}" r="3" fill="#713f12"/>`).join('')}
    <text x="440" y="275" fill="#fde047" font-size="13" font-weight="bold" text-anchor="middle" font-family="sans-serif">Starry Sky Pattern (t[8;14])</text>

    <!-- Multiple Myeloma & Granular Cell Below -->
    <rect y="340" width="600" height="260" fill="#581c87" opacity=".95"/>
    <text x="300" y="375" fill="#e9d5ff" font-size="15" font-weight="bold" text-anchor="middle" font-family="sans-serif">Multiple Myeloma &amp; Plasmacytoma</text>
    <!-- Atypical Plasma Cells with Clock-face chromatin -->
    ${[120,240,360,480].map(x=>`<circle cx="${x}" cy="450" r="32" fill="#7e22ce" stroke="#e9d5ff" stroke-width="2"/><circle cx="${x-8}" cy="445" r="16" fill="#3b0764"/><circle cx="${x+12}" cy="455" r="8" fill="#f3e8ff" opacity=".6"/><circle cx="${x}" cy="470" r="6" fill="#e11d48"/>`).join('')}
    <text x="300" y="525" fill="#faf5ff" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">Monoclonal Plasma Cells with Clock-Face Chromatin</text>
    <text x="300" y="560" fill="#fbcfe8" font-size="12" text-anchor="middle" font-family="sans-serif">Russell Bodies &amp; Punched-Out Osteolytic Lesions</text>
  </svg>`)}`,
};

function getSlideForMission(missionId) {
  if (!missionId) return HISTOLOGY_SLIDES.otc;
  if (missionId.startsWith('otc')) return HISTOLOGY_SLIDES.otc;
  if (missionId.startsWith('ep')) return HISTOLOGY_SLIDES.ep;
  if (missionId.startsWith('sp')) return HISTOLOGY_SLIDES.sp;
  if (missionId.startsWith('bf')) return HISTOLOGY_SLIDES.bf;
  if (missionId.startsWith('ii')) return HISTOLOGY_SLIDES.ii;
  if (missionId.startsWith('st')) return HISTOLOGY_SLIDES.st;
  return HISTOLOGY_SLIDES.otc;
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
