import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Upload, Trash2, Save, Download, FileJson, Crosshair,
  MousePointerClick, AlertTriangle, Check, Play, Globe, CloudOff,
} from 'lucide-react';
import { TOPICS } from '../../data/topics';
import { publishExercise, unpublishExercise, isPublished } from '../../lib/publish';
import { friendlyError } from '../../lib/firebase';
import {
  getExercise, saveExercise, deleteExercise, moveExercise, isPlayable,
  processImageFile, exportExercises, importExercises,
  storageFootprint, getAllExercises,
} from '../../utils/labelling';

// ═══════════════════════════════════════════════════════════
// Slide Labeller — authoring tool
//
// Upload a micrograph, click on it to drop markers, name each one. The
// result is saved as a labelling exercise for the chosen mission and is
// immediately playable.
// ═══════════════════════════════════════════════════════════

function missionsOf(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return [];
  // Only labelling missions are offered: saving a slide against a matching
  // or crossword mission would store it where no game ever reads it.
  return (topic.stages || []).flatMap(s =>
    (s.missions || [])
      .filter(m => isLabellingMission(m.gameType))
      .map(m => ({ id: m.id, title: m.title, stage: s.title, gameType: m.gameType }))
  );
}

export const isLabellingMission = (t) => t === 'labelling' || t === 'jigsaw';

/** Every mission that can hold a labelling exercise, across all topics. */
function allLabellingMissions() {
  return TOPICS.flatMap(t => (t.stages || []).flatMap(s =>
    (s.missions || [])
      .filter(m => isLabellingMission(m.gameType))
      .map(m => ({ id: m.id, title: m.title, topic: t.title, topicId: t.id }))));
}

/** Exercises saved against missions that no longer accept them. */
function findOrphans() {
  const valid = new Set(allLabellingMissions().map(m => m.id));
  return Object.keys(getAllExercises()).filter(id => !valid.has(id));
}

/**
 * Best destination for a stranded exercise: the first free labelling
 * mission in the same topic, since a slide saved to otc_m1 was almost
 * certainly meant for an otc_* labelling slot.
 */
function suggestTarget(orphanId) {
  const prefix = String(orphanId).split('_')[0];
  const candidates = allLabellingMissions();
  const sameTopic = candidates.filter(m => m.id.startsWith(prefix + '_'));
  const free = sameTopic.find(m => !getExercise(m.id));
  return (free || sameTopic[0] || candidates[0])?.id || '';
}

/** One stranded exercise, with a destination picker. */
function OrphanRow({ orphanId, missions, onMove }) {
  const [target, setTarget] = useState(() => suggestTarget(orphanId));

  return (
    <div className="flex flex-wrap items-center gap-2">
      <code className="px-1.5 py-0.5 rounded bg-[var(--surface-card)] border border-[var(--border-default)] font-mono text-[11px]">
        {orphanId}
      </code>
      <span className="text-[11px]">→</span>
      <select
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="px-2 py-1 rounded-md bg-[var(--surface-card)] border border-[var(--border-default)] text-[11px] cursor-pointer max-w-[260px]"
      >
        {missions.map(m => (
          <option key={m.id} value={m.id} disabled={Boolean(getExercise(m.id))}>
            {m.title}{getExercise(m.id) ? ' — occupied' : ''}
          </option>
        ))}
      </select>
      <button
        onClick={() => onMove(orphanId, target)}
        disabled={!target}
        className="px-2.5 py-1 rounded-md bg-[var(--accent)] text-[var(--text-on-accent)] text-[11px] font-bold cursor-pointer disabled:opacity-40 hover:brightness-110"
      >
        Move
      </button>
    </div>
  );
}

export default function SlideLabeller({ canPublish = false, user = null }) {
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const missions = useMemo(() => missionsOf(topicId), [topicId]);
  const [missionId, setMissionId] = useState(missions[0]?.id || '');

  const [image, setImage] = useState('');
  const [markerStyle, setMarkerStyle] = useState('numbered');
  const [caption, setCaption] = useState('');
  const [credit, setCredit] = useState('');
  const [markers, setMarkers] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const fileRef = useRef(null);
  const importRef = useRef(null);
  const imgWrapRef = useRef(null);
  const nextId = useRef(0);

  // Keep the mission selector valid when the topic changes.
  useEffect(() => {
    if (!missions.some(m => m.id === missionId)) {
      setMissionId(missions[0]?.id || '');
    }
  }, [missions, missionId]);

  // Load whatever is already authored for this mission.
  useEffect(() => {
    if (!missionId) return;
    const ex = getExercise(missionId);
    if (ex) {
      setImage(ex.image || '');
      setMarkerStyle(ex.markerStyle || 'numbered');
      setCaption(ex.caption || '');
      setCredit(ex.credit || '');
      setMarkers(ex.markers || []);
      nextId.current = Math.max(0, ...(ex.markers || []).map(m => m.id)) + 1;
    } else {
      setImage('');
      setMarkerStyle('numbered');
      setCaption('');
      setCredit('');
      setMarkers([]);
      nextId.current = 0;
    }
    setActiveMarker(null);
    setStatus(null);
  }, [missionId]);

  const flash = (type, text) => {
    setStatus({ type, text });
    setTimeout(() => setStatus(null), 3500);
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const { dataUrl, width, height, originalWidth } = await processImageFile(file);
      setImage(dataUrl);
      setMarkers([]);
      nextId.current = 0;
      flash('ok', `Loaded ${file.name} — ${originalWidth}px resized to ${width}×${height}.`);
    } catch (err) {
      flash('err', err.message);
    } finally {
      setBusy(false);
      e.target.value = '';
    }
  };

  // Click anywhere on the slide to drop a marker at that point.
  const handleImageClick = (e) => {
    if (!image) return;
    const rect = imgWrapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = nextId.current++;
    setMarkers(prev => [...prev, { id, x: +x.toFixed(2), y: +y.toFixed(2), label: '' }]);
    setActiveMarker(id);
  };

  const updateMarker = (id, patch) =>
    setMarkers(prev => prev.map(m => (m.id === id ? { ...m, ...patch } : m)));

  const removeMarker = (id) => {
    setMarkers(prev => prev.filter(m => m.id !== id));
    if (activeMarker === id) setActiveMarker(null);
  };

  // Drag an existing marker to fine-tune its position.
  const dragMarker = (id) => (e) => {
    e.stopPropagation();
    e.preventDefault();
    const rect = imgWrapRef.current.getBoundingClientRect();
    const move = (ev) => {
      const p = ev.touches ? ev.touches[0] : ev;
      const x = Math.min(100, Math.max(0, ((p.clientX - rect.left) / rect.width) * 100));
      const y = Math.min(100, Math.max(0, ((p.clientY - rect.top) / rect.height) * 100));
      updateMarker(id, { x: +x.toFixed(2), y: +y.toFixed(2) });
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    setActiveMarker(id);
  };

  const handleSave = () => {
    if (!missionId) return flash('err', 'Pick a mission first.');
    if (!image) return flash('err', 'Upload a slide image first.');
    const named = markers.filter(m => m.label.trim());
    if (named.length < 2) return flash('err', 'Add at least two markers with labels.');
    if (named.length !== markers.length) {
      return flash('err', `${markers.length - named.length} marker(s) still have no label.`);
    }
    try {
      saveExercise(missionId, { image, markerStyle, caption, credit, markers });
      const kb = Math.round(storageFootprint() / 1024);
      flash('ok', `Saved to ${missionId}. Stored exercises now ${kb} KB.`);
    } catch (err) {
      flash('err', `Save failed: ${err.message}`);
    }
  };

  const handlePublish = async () => {
    if (!missionId) return flash('err', 'Pick a mission first.');
    if (!ready) return flash('err', 'Add a slide and label every marker first.');
    setBusy(true);
    try {
      // Save locally first so the work survives a failed upload.
      saveExercise(missionId, { image, markerStyle, caption, credit, markers });
      await publishExercise(
        missionId,
        { image, markerStyle, caption, credit, markers },
        { author: user?.email }
      );
      flash('ok', `Published to ${missionId}. Every student sees it now.`);
    } catch (err) {
      flash('err', `Publish failed: ${friendlyError(err)}`);
    } finally {
      setBusy(false);
    }
  };

  const handleUnpublish = async () => {
    setBusy(true);
    try {
      await unpublishExercise(missionId);
      flash('ok', `Removed ${missionId} from the live site.`);
    } catch (err) {
      flash('err', `Could not unpublish: ${friendlyError(err)}`);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = () => {
    deleteExercise(missionId);
    setImage(''); setMarkers([]); setCaption(''); setCredit('');
    flash('ok', `Removed the exercise for ${missionId}.`);
  };

  const download = (text, filename, type) => {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const n = Object.keys(getAllExercises()).length;
    if (!n) return flash('err', 'Nothing to export yet.');
    download(exportExercises(), 'histopath-labelling.json', 'application/json');
    flash('ok', `Exported ${n} exercise(s).`);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const n = importExercises(await file.text());
      flash('ok', `Imported ${n} exercise(s). Reselect a mission to view.`);
    } catch (err) {
      flash('err', `Import failed: ${err.message}`);
    } finally {
      e.target.value = '';
    }
  };

  const named = markers.filter(m => m.label.trim()).length;
  const ready = image && named >= 2 && named === markers.length;
  const footprintKb = Math.round(storageFootprint() / 1024);
  const orphans = findOrphans();
  const labellingMissions = allLabellingMissions();

  const handleMove = (from, to) => {
    try {
      moveExercise(from, to);
      setMissionId(to);
      flash('ok', `Moved ${from} → ${to}. Slide and markers preserved.`);
    } catch (err) {
      flash('err', err.message);
    }
  };

  const clearOrphans = () => {
    orphans.forEach(deleteExercise);
    flash('ok', `Removed ${orphans.length} stranded exercise(s).`);
  };

  return (
    <div className="flex flex-col gap-5">
      {orphans.length > 0 && (
        <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-[var(--gold-soft)] border border-[var(--gold)]/40 text-[var(--text-primary)] text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-px text-[var(--gold-ink)]" />
          <div className="flex-1 flex flex-col gap-2">
            <p>
              <strong className="font-semibold">
                {orphans.length} slide{orphans.length === 1 ? '' : 's'} saved to a
                non-labelling mission.
              </strong>{' '}
              Those missions run a different game, so the slide never appears.
              Move each one to a labelling mission — the image and markers are
              carried over.
            </p>

            {orphans.map(id => (
              <OrphanRow
                key={id}
                orphanId={id}
                missions={labellingMissions}
                onMove={handleMove}
              />
            ))}

            <button
              onClick={clearOrphans}
              className="self-start text-[11px] font-semibold underline text-[var(--danger-ink)] cursor-pointer"
            >
              Discard instead
            </button>
          </div>
        </div>
      )}

      {/* Target mission */}
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Topic</span>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm cursor-pointer focus:outline-none focus:border-[var(--accent-border)]"
          >
            {TOPICS.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-[var(--text-secondary)]">Mission</span>
          <select
            value={missionId}
            onChange={(e) => setMissionId(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm cursor-pointer focus:outline-none focus:border-[var(--accent-border)]"
          >
            {missions.map(m => (
              <option key={m.id} value={m.id}>
                {m.title}{getExercise(m.id) ? '   · has slide' : ''}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Upload */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent-ink)] text-sm font-semibold hover:bg-[var(--accent-soft)] disabled:opacity-50 cursor-pointer transition-colors"
        >
          <Upload className="w-4 h-4" /> {image ? 'Replace slide' : 'Upload slide'}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm font-semibold hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors"
        >
          <Download className="w-4 h-4" /> Export all
        </button>

        <button
          onClick={() => importRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-sm font-semibold hover:bg-[var(--surface-sunken)] cursor-pointer transition-colors"
        >
          <FileJson className="w-4 h-4" /> Import
        </button>
        <input ref={importRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />

        <span className="text-xs text-[var(--text-muted)] ml-auto">Stored: {footprintKb} KB</span>
      </div>

      {status && (
        <div className={`flex items-start gap-2 px-3.5 py-2.5 rounded-lg text-xs border ${
          status.type === 'ok'
            ? 'bg-[var(--success-soft)] border-[var(--success)]/40 text-[var(--success-ink)]'
            : 'bg-[var(--danger-soft)] border-[var(--danger)]/40 text-[var(--danger-ink)]'
        }`}>
          {status.type === 'ok' ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
          {status.text}
        </div>
      )}

      {footprintKb > 3500 && (
        <div className="flex items-start gap-2 px-3.5 py-2.5 rounded-lg bg-[var(--gold-soft)] border border-[var(--gold)]/40 text-[var(--gold-ink)] text-xs">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          Stored slides are approaching the browser's ~5 MB limit. Export your work,
          then move the images into <code className="font-mono">public/histology/</code> to ship them.
        </div>
      )}

      {/* Canvas */}
      {image ? (
        <div className="grid lg:grid-cols-[1fr_300px] gap-5 items-start">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <MousePointerClick className="w-3.5 h-3.5 text-[var(--accent-ink)]" />
              Click the slide to drop a marker. Drag a marker to reposition it.
            </div>

            <div
              ref={imgWrapRef}
              onClick={handleImageClick}
              className="relative rounded-xl overflow-hidden border border-[var(--border-subtle)] cursor-crosshair select-none bg-[var(--surface-sunken)]"
            >
              <img src={image} alt="Slide being labelled" className="w-full block" draggable={false} />

              {markers.map((m, i) => (
                <div
                  key={m.id}
                  onPointerDown={dragMarker(m.id)}
                  onClick={(e) => { e.stopPropagation(); setActiveMarker(m.id); }}
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-move transition-all ${
                    activeMarker === m.id
                      ? 'bg-[var(--gold)] text-[var(--text-primary)] ring-4 ring-[var(--gold)] scale-110 z-20'
                      : m.label.trim()
                      ? 'bg-[var(--accent)] text-[var(--text-on-accent)] ring-2 ring-[var(--accent-border)] z-10'
                      : 'bg-[var(--danger)] text-[var(--text-primary)] ring-2 ring-[var(--danger)] z-10'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[var(--text-secondary)]">Caption (optional)</span>
                <input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Pleomorphic adenoma, H&E ×100"
                  className="px-3 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-border)]"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-[var(--text-secondary)]">Image credit / licence</span>
                <input
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  placeholder="e.g. Dept. of Oral Pathology, own slide"
                  className="px-3 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-border)]"
                />
              </label>
            </div>

            <label className="flex items-center gap-2.5 mt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={markerStyle === 'hotspot'}
                onChange={(e) => setMarkerStyle(e.target.checked ? 'hotspot' : 'numbered')}
                className="w-4 h-4 accent-[var(--accent)] cursor-pointer"
              />
              <span className="text-xs text-[var(--text-secondary)]">
                My slide already has arrows and numbers drawn on it
                <span className="block text-[var(--text-muted)]">
                  Hides the app's pins so students read your annotations instead.
                </span>
              </span>
            </label>
          </div>

          {/* Marker list */}
          <div className="flex flex-col gap-3 lg:sticky lg:top-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-[var(--accent-ink)]" /> Markers
              </h4>
              <span className={`text-xs font-semibold ${ready ? 'text-[var(--success-ink)]' : 'text-[var(--text-muted)]'}`}>
                {named}/{markers.length} labelled
              </span>
            </div>

            {markers.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-6 text-center border border-dashed border-[var(--border-subtle)] rounded-lg">
                No markers yet — click the slide to add one.
              </p>
            ) : (
              <div className="flex flex-col gap-2 max-h-[420px] overflow-y-auto pr-1">
                {markers.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={() => setActiveMarker(m.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                      activeMarker === m.id
                        ? 'border-[var(--gold)]/40 bg-[var(--gold-soft)]'
                        : 'border-[var(--border-subtle)] bg-[var(--surface-sunken)]'
                    }`}
                  >
                    <span className="w-6 h-6 shrink-0 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent-ink)] text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <input
                      value={m.label}
                      onChange={(e) => updateMarker(m.id, { label: e.target.value })}
                      onFocus={() => setActiveMarker(m.id)}
                      placeholder="Structure name…"
                      className="flex-1 min-w-0 px-2 py-1.5 rounded-md bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-xs focus:outline-none focus:border-[var(--accent-border)]"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); removeMarker(m.id); }}
                      className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--danger-ink)] hover:bg-[var(--danger-soft)] cursor-pointer shrink-0"
                      aria-label={`Remove marker ${i + 1}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {canPublish ? (
              <>
                <button
                  onClick={handlePublish}
                  disabled={!ready || busy}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--accent)] text-[var(--text-on-accent)] text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:brightness-110 transition-all"
                >
                  <Globe className="w-4 h-4" /> {busy ? 'Publishing…' : 'Publish to students'}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!ready || busy}
                  className="btn-ghost flex items-center justify-center gap-2 px-4 py-2.5 text-xs cursor-pointer disabled:opacity-40"
                >
                  <Save className="w-3.5 h-3.5" /> Save draft on this device
                </button>
              </>
            ) : (
              <button
                onClick={handleSave}
                disabled={!ready}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--accent)] text-[var(--text-on-accent)] text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:brightness-110 transition-all"
              >
                <Save className="w-4 h-4" /> Save exercise
              </button>
            )}

            {isPlayable(getExercise(missionId)) && (
              <a
                href={`#mission/${missionId}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs font-semibold hover:bg-[var(--surface-sunken)] transition-colors"
              >
                <Play className="w-3.5 h-3.5" /> Play this mission
              </a>
            )}

            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-[var(--danger-ink)]/80 text-xs font-semibold hover:bg-[var(--danger-soft)] cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete this exercise
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center gap-3 py-16 rounded-xl border-2 border-dashed border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--accent-border)] hover:text-[var(--accent-ink)] cursor-pointer transition-colors"
        >
          <Upload className="w-8 h-8" />
          <span className="text-sm font-semibold">Upload a slide to start labelling</span>
          <span className="text-xs text-[var(--text-muted)]">JPG or PNG — resized automatically</span>
        </button>
      )}
    </div>
  );
}
