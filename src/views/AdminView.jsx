import React, { useState } from 'react';
import { TOPICS, getTopicMissions } from '../data/topics';
import { 
  addCustomQuestion, 
  addCustomMissionPair, 
  addCustomCrosswordWord, 
  parseTextDocumentToMCQs, 
  parseCrosswordText,
  saveCustomData,
  getCustomData 
} from '../utils/customContent';
import { Audio } from '../utils/audio';
import { Settings, PlusCircle, Upload, Check, FileText, Image as ImageIcon, Sparkles, BookOpen, Lock, ShieldCheck, LogOut, Crosshair } from 'lucide-react';
import SlideLabeller from './admin/SlideLabeller';

const ADMIN_PASSPHRASE = 'histopath-admin-2026';

function AdminLogin({ onLogin }) {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passphrase === ADMIN_PASSPHRASE) {
      sessionStorage.setItem('adminAuthed', 'true');
      onLogin();
    } else {
      setError('Invalid credentials. Contact your professor for access.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-16 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-rose-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
          <Lock className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-heading font-extrabold text-3xl text-gradient">
          Admin Access Required
        </h2>
        <p className="text-sm text-gray-400 max-w-sm">
          This portal is restricted to professors and administrators. Enter your passphrase to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`w-full glass-panel border border-white/10 p-8 rounded-3xl flex flex-col gap-5 shadow-2xl ${shake ? 'animate-shake' : ''}`}>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Admin Passphrase</label>
          <input
            type="password"
            value={passphrase}
            onChange={(e) => { setPassphrase(e.target.value); setError(''); }}
            placeholder="Enter admin passphrase..."
            autoFocus
            className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all"
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-500 hover:from-purple-500 hover:to-rose-400 text-white font-extrabold text-sm shadow-xl shadow-purple-500/20 cursor-pointer transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-5 h-5" /> Authenticate & Enter Portal
        </button>
      </form>
    </div>
  );
}

export default function AdminView({ navigateTo }) {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('adminAuthed') === 'true');
  const [activeTab, setActiveTab] = useState('creator');
  const [selectedTopicId, setSelectedTopicId] = useState(TOPICS[0].id);
  const missions = getTopicMissions(selectedTopicId);
  const [selectedMissionId, setSelectedMissionId] = useState(missions[0]?.id || 'om_m1');

  const [contentType, setContentType] = useState('mcq');
  const [mcqData, setMcqData] = useState({
    q: '',
    options: ['', '', '', ''],
    correct: 0,
    explanation: '',
  });
  const [matchData, setMatchData] = useState({ image: '', label: '' });
  const [crosswordData, setCrosswordData] = useState({ word: '', clue: '' });

  const [uploadedText, setUploadedText] = useState('');
  const [parsedPreview, setParsedPreview] = useState(null);
  const [slidePreview, setSlidePreview] = useState(null);

  const [statusMessage, setStatusMessage] = useState('');

  const showStatus = (msg) => {
    Audio.playStar();
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthed');
    setIsAuthed(false);
  };

  // ——— If not authenticated, show login gate ———
  if (!isAuthed) {
    return <AdminLogin onLogin={() => setIsAuthed(true)} />;
  }

  const handleAddMcq = (e) => {
    e.preventDefault();
    if (!mcqData.q || mcqData.options.some(o => !o)) return;

    addCustomQuestion(selectedMissionId, {
      q: mcqData.q,
      options: mcqData.options,
      correct: parseInt(mcqData.correct, 10),
      explanation: mcqData.explanation || 'Neville\'s Pathology Reference',
    });

    setMcqData({ q: '', options: ['', '', '', ''], correct: 0, explanation: '' });
    showStatus('✓ Added new MCQ question successfully!');
  };

  const handleAddMatching = (e) => {
    e.preventDefault();
    if (!matchData.image || !matchData.label) return;

    addCustomMissionPair(selectedMissionId, {
      image: matchData.image,
      label: matchData.label,
    });

    setMatchData({ image: '', label: '' });
    showStatus('✓ Added new Matching Pair successfully!');
  };

  const handleAddCrossword = (e) => {
    e.preventDefault();
    if (!crosswordData.word || !crosswordData.clue) return;

    addCustomCrosswordWord(selectedMissionId, {
      word: crosswordData.word.toUpperCase().replace(/[^A-Z]/g, ''),
      clue: crosswordData.clue,
    });

    setCrosswordData({ word: '', clue: '' });
    showStatus('✓ Added new Crossword Word successfully!');
  };

  const handleDocFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setUploadedText(content);
      const parsedMCQs = parseTextDocumentToMCQs(content);
      const parsedCrosswords = parseCrosswordText(content);

      setParsedPreview({
        mcqs: parsedMCQs,
        crosswords: parsedCrosswords,
      });
    };
    reader.readAsText(file);
  };

  const handleSlideImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setSlidePreview(dataUrl);

      const custom = getCustomData();
      if (!custom.missions[selectedMissionId]) {
        custom.missions[selectedMissionId] = {};
      }
      custom.missions[selectedMissionId].slideImage = dataUrl;
      saveCustomData(custom);

      showStatus('✓ Histology slide image uploaded & converted to Jigsaw Puzzle!');
    };
    reader.readAsDataURL(file);
  };

  const handleImportParsedMCQs = () => {
    if (!parsedPreview?.mcqs?.length) return;

    parsedPreview.mcqs.forEach(q => {
      addCustomQuestion(selectedMissionId, q);
    });

    showStatus(`✓ Imported ${parsedPreview.mcqs.length} MCQs into ${selectedMissionId}!`);
    setParsedPreview(null);
    setUploadedText('');
  };

  const handleImportParsedCrosswords = () => {
    if (!parsedPreview?.crosswords?.length) return;

    parsedPreview.crosswords.forEach(w => {
      addCustomCrosswordWord(selectedMissionId, w);
    });

    showStatus(`✓ Imported ${parsedPreview.crosswords.length} Crossword words into ${selectedMissionId}!`);
    setParsedPreview(null);
    setUploadedText('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-8">
      {/* Portal Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <Settings className="w-4 h-4" /> Professor & Admin Game Creator Portal
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-bold cursor-pointer transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-gradient">
          Content & Game Authoring Engine
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
          Create new MCQs, matching cards, crosswords, and upload raw documents or histology slide images to convert them into interactive games automatically.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex items-center gap-2 glass-panel p-1.5 rounded-2xl border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab('creator')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'creator'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> 1. Manual Form Authoring
        </button>

        <button
          onClick={() => setActiveTab('uploader')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'uploader'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Upload className="w-4 h-4" /> 2. Auto-Document Importer
        </button>

        <button
          onClick={() => setActiveTab('labeller')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'labeller'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Crosshair className="w-4 h-4" /> 3. Slide Labeller
        </button>
      </div>

      {activeTab === 'labeller' && (
        <div className="glass-panel border border-white/10 p-5 rounded-2xl">
          <SlideLabeller />
        </div>
      )}

      {/* Target Mission Selector — the Slide Labeller carries its own. */}
      <div className={`glass-panel border border-white/10 p-5 rounded-2xl flex-col md:flex-row gap-4 items-center justify-between ${activeTab === 'labeller' ? 'hidden' : 'flex'}`}>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full">
          <div className="flex flex-col gap-1 flex-1 w-full">
            <label className="text-xs font-semibold text-gray-300">Target Topic</label>
            <select
              value={selectedTopicId}
              onChange={(e) => {
                const tid = e.target.value;
                setSelectedTopicId(tid);
                const mList = getTopicMissions(tid);
                if (mList.length) setSelectedMissionId(mList[0].id);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-purple-400"
            >
              {TOPICS.map(t => (
                <option key={t.id} value={t.id}>{t.title} ({t.textbookRef})</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 w-full">
            <label className="text-xs font-semibold text-gray-300">Target Mission Module</label>
            <select
              value={selectedMissionId}
              onChange={(e) => setSelectedMissionId(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-purple-400"
            >
              {missions.map(m => (
                <option key={m.id} value={m.id}>{m.stageTitle} → {m.title} ({m.gameType})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <Check className="w-5 h-5 text-emerald-400" /> {statusMessage}
        </div>
      )}

      {/* Tab 1: Manual Creator */}
      {activeTab === 'creator' && (
        <div className="glass-panel border border-white/10 p-6 rounded-3xl flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setContentType('mcq')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                contentType === 'mcq' ? 'bg-teal-500/20 border-teal-400 text-teal-300' : 'border-white/10 text-gray-400'
              }`}
            >
              📝 Add MCQ Question
            </button>

            <button
              onClick={() => setContentType('matching')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                contentType === 'matching' ? 'bg-teal-500/20 border-teal-400 text-teal-300' : 'border-white/10 text-gray-400'
              }`}
            >
              🔗 Add Matching Pair
            </button>

            <button
              onClick={() => setContentType('crossword')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                contentType === 'crossword' ? 'bg-teal-500/20 border-teal-400 text-teal-300' : 'border-white/10 text-gray-400'
              }`}
            >
              ✏️ Add Crossword Word
            </button>
          </div>

          {/* Form: MCQ */}
          {contentType === 'mcq' && (
            <form onSubmit={handleAddMcq} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300">Question Text</label>
                <input
                  type="text"
                  value={mcqData.q}
                  onChange={(e) => setMcqData({ ...mcqData, q: e.target.value })}
                  placeholder="e.g. Which cells produce enamel matrix?"
                  required
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['A', 'B', 'C', 'D'].map((letter, idx) => (
                  <div key={letter} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-400">Option {letter}</label>
                    <input
                      type="text"
                      value={mcqData.options[idx]}
                      onChange={(e) => {
                        const newOpts = [...mcqData.options];
                        newOpts[idx] = e.target.value;
                        setMcqData({ ...mcqData, options: newOpts });
                      }}
                      placeholder={`Option ${letter}`}
                      required
                      className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-xs font-semibold text-gray-300">Correct Option</label>
                  <select
                    value={mcqData.correct}
                    onChange={(e) => setMcqData({ ...mcqData, correct: e.target.value })}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-bold"
                  >
                    <option value={0}>Option A</option>
                    <option value={1}>Option B</option>
                    <option value={2}>Option C</option>
                    <option value={3}>Option D</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 flex-2">
                  <label className="text-xs font-semibold text-gray-300">Neville's Textbook Explanation</label>
                  <input
                    type="text"
                    value={mcqData.explanation}
                    onChange={(e) => setMcqData({ ...mcqData, explanation: e.target.value })}
                    placeholder="Reference rationale for students"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-[1.01] transition-transform"
              >
                + Add MCQ Question to Quiz Bank
              </button>
            </form>
          )}

          {/* Form: Matching */}
          {contentType === 'matching' && (
            <form onSubmit={handleAddMatching} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300">Histological Structure / Description</label>
                <input
                  type="text"
                  value={matchData.image}
                  onChange={(e) => setMatchData({ ...matchData, image: e.target.value })}
                  placeholder="e.g. Biconcave fibrocartilaginous structure"
                  required
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300">Matching Classification / Label</label>
                <input
                  type="text"
                  value={matchData.label}
                  onChange={(e) => setMatchData({ ...matchData, label: e.target.value })}
                  placeholder="e.g. Articular Disc (TMJ)"
                  required
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-[1.01] transition-transform"
              >
                + Add Matching Pair to Game
              </button>
            </form>
          )}

          {/* Form: Crossword */}
          {contentType === 'crossword' && (
            <form onSubmit={handleAddCrossword} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300">Crossword Terminology Word</label>
                <input
                  type="text"
                  value={crosswordData.word}
                  onChange={(e) => setCrosswordData({ ...crosswordData, word: e.target.value })}
                  placeholder="e.g. AMELOBLAST"
                  required
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-300">Clue Description</label>
                <input
                  type="text"
                  value={crosswordData.clue}
                  onChange={(e) => setCrosswordData({ ...crosswordData, clue: e.target.value })}
                  placeholder="e.g. Cell responsible for enamel matrix synthesis"
                  required
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:border-teal-400"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-purple-600 text-slate-950 font-bold text-xs uppercase tracking-wider cursor-pointer hover:scale-[1.01] transition-transform"
              >
                + Add Crossword Word to Game
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Auto Document Importer */}
      {activeTab === 'uploader' && (
        <div className="glass-panel border border-white/10 p-6 rounded-3xl flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Document Parser Box */}
            <div className="glass-panel border border-white/10 p-5 rounded-2xl flex flex-col gap-4 bg-slate-900/60">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-teal-300">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>Upload Word / Text Document (.txt, .doc)</span>
              </div>
              <p className="text-xs text-gray-400">
                Upload a question bank or crossword text document to automatically parse and import MCQs or Crossword clues into the selected mission!
              </p>

              <input
                type="file"
                accept=".txt,.doc,.docx,.csv"
                onChange={handleDocFileUpload}
                className="text-xs text-gray-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-teal-400 file:text-slate-950 hover:file:bg-teal-300 cursor-pointer"
              />

              {parsedPreview && (
                <div className="mt-2 flex flex-col gap-3 p-3 rounded-xl bg-slate-950 border border-white/10 text-xs">
                  <div className="font-bold text-amber-300">
                    Detected: {parsedPreview.mcqs.length} MCQs | {parsedPreview.crosswords.length} Crosswords
                  </div>

                  {parsedPreview.mcqs.length > 0 && (
                    <button
                      onClick={handleImportParsedMCQs}
                      className="py-2.5 rounded-xl bg-teal-400 text-slate-950 font-bold text-xs hover:bg-teal-300 cursor-pointer"
                    >
                      Import {parsedPreview.mcqs.length} MCQs into Quiz Bank
                    </button>
                  )}

                  {parsedPreview.crosswords.length > 0 && (
                    <button
                      onClick={handleImportParsedCrosswords}
                      className="py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs hover:bg-purple-400 cursor-pointer"
                    >
                      Import {parsedPreview.crosswords.length} Crossword Words
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Histology Slide Jigsaw Generator */}
            <div className="glass-panel border border-white/10 p-5 rounded-2xl flex flex-col gap-4 bg-slate-900/60">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-purple-300">
                <ImageIcon className="w-5 h-5 text-purple-400" />
                <span>Upload Histopathological Slide Image</span>
              </div>
              <p className="text-xs text-gray-400">
                Upload a microscopic tissue slide image (.jpg, .png) to convert it into a sliced 3×3 interactive Jigsaw Puzzle!
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleSlideImageUpload}
                className="text-xs text-gray-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-purple-500 file:text-white hover:file:bg-purple-400 cursor-pointer"
              />

              {slidePreview && (
                <div className="mt-2 flex flex-col items-center gap-2 p-2 rounded-xl bg-slate-950 border border-white/10">
                  <img src={slidePreview} alt="Uploaded Slide" className="w-full max-h-40 object-cover rounded-lg" />
                  <span className="text-[10px] text-teal-300 font-bold">✓ Slide Ready for Jigsaw Game</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
