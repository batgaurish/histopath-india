import React, { useState, useEffect } from 'react';
import {
  Lock, ShieldCheck, LogOut, Clock, XCircle, UserPlus, AlertTriangle, Mail,
} from 'lucide-react';
import { isFirebaseConfigured, friendlyError } from '../../lib/firebase';
import { requestAccess, signIn, signOut, watchSession, isApproved } from '../../lib/staff';

// ═══════════════════════════════════════════════════════════
// Access control for the admin area.
//
// With a Firebase project attached, staff sign in with their own account and
// an owner approves them. Without one, the app falls back to the original
// shared passphrase so the tool still opens for local-only authoring.
// ═══════════════════════════════════════════════════════════

const LEGACY_PASSPHRASE = 'histopath-admin-2026';

function Shell({ children }) {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-14 flex flex-col items-center gap-6">
      {children}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="w-full flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-[var(--text-secondary)]">{label}</span>
      <input
        {...props}
        className="field w-full px-4 py-3 text-sm"
      />
    </label>
  );
}

/** Original shared-passphrase gate, used only when Firebase is absent. */
function LegacyGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (value.trim() === LEGACY_PASSPHRASE) {
      sessionStorage.setItem('adminAuthed', 'true');
      onUnlock();
    } else {
      setError('That passphrase is not correct.');
    }
  };

  return (
    <Shell>
      <div className="w-14 h-14 rounded-2xl bg-[var(--accent-2-soft)] border border-[var(--accent-2-border)] flex items-center justify-center text-[var(--accent-2-ink)]">
        <Lock className="w-7 h-7" />
      </div>
      <div className="text-center">
        <h2 className="font-heading font-extrabold text-2xl">Staff area</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Enter the shared passphrase to author content on this device.
        </p>
      </div>

      <form onSubmit={submit} className="w-full flex flex-col gap-3">
        <Field
          label="Passphrase"
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(''); }}
          placeholder="Enter admin passphrase…"
          autoFocus
        />
        {error && (
          <p className="flex items-center gap-2 text-xs font-semibold text-[var(--danger-ink)]">
            <AlertTriangle className="w-4 h-4" /> {error}
          </p>
        )}
        <button type="submit" className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer">
          <ShieldCheck className="w-4 h-4" /> Unlock
        </button>
      </form>

      <p className="text-xs text-[var(--text-muted)] text-center">
        Work saved here stays in this browser. Attach a Firebase project to
        publish to every student.
      </p>
    </Shell>
  );
}

/** Sign in, or request an account. */
function SignInPanel() {
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setError(''); };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (mode === 'signin') {
        await signIn(form);
      } else {
        await requestAccess(form);
        setDone(true);
      }
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <Shell>
        <div className="w-14 h-14 rounded-2xl bg-[var(--gold-soft)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold-ink)]">
          <Clock className="w-7 h-7" />
        </div>
        <div className="text-center">
          <h2 className="font-heading font-extrabold text-2xl">Request sent</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Your account has been created and is waiting to be approved. You will
            be able to publish as soon as it is — no need to sign up again.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent-ink)]">
        <Lock className="w-7 h-7" />
      </div>

      <div className="text-center">
        <h2 className="font-heading font-extrabold text-2xl">Staff sign in</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Anything you publish here appears for every student straight away.
        </p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)]">
        {[['signin', 'Sign in'], ['signup', 'Request access']].map(([id, label]) => (
          <button
            key={id}
            onClick={() => { setMode(id); setError(''); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              mode === id
                ? 'bg-[var(--accent)] text-[var(--text-on-accent)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="w-full flex flex-col gap-3">
        {mode === 'signup' && (
          <Field label="Your name" value={form.name} onChange={set('name')}
                 placeholder="Dr A. Sharma" autoComplete="name" />
        )}
        <Field label="Email" type="email" value={form.email} onChange={set('email')}
               placeholder="you@college.edu" autoComplete="email" required />
        <Field label="Password" type="password" value={form.password} onChange={set('password')}
               placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
               autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required />

        {error && (
          <p className="flex items-start gap-2 text-xs font-semibold text-[var(--danger-ink)]">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-px" /> {error}
          </p>
        )}

        <button type="submit" disabled={busy}
          className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
          {mode === 'signin'
            ? <><ShieldCheck className="w-4 h-4" /> {busy ? 'Signing in…' : 'Sign in'}</>
            : <><UserPlus className="w-4 h-4" /> {busy ? 'Sending…' : 'Request access'}</>}
        </button>
      </form>

      {mode === 'signup' && (
        <p className="text-xs text-[var(--text-muted)] text-center">
          New accounts are approved before they can publish.
        </p>
      )}
    </Shell>
  );
}

function StatusPanel({ user, staff }) {
  const rejected = staff?.status === 'rejected';
  const missing = !staff;

  return (
    <Shell>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
        rejected
          ? 'bg-[var(--danger-soft)] border border-[var(--danger)]/40 text-[var(--danger-ink)]'
          : 'bg-[var(--gold-soft)] border border-[var(--gold)]/40 text-[var(--gold-ink)]'
      }`}>
        {rejected ? <XCircle className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
      </div>

      <div className="text-center">
        <h2 className="font-heading font-extrabold text-2xl">
          {rejected ? 'Access not granted' : missing ? 'Account incomplete' : 'Waiting for approval'}
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {rejected
            ? 'This account is not approved to publish.'
            : missing
            ? 'Your sign-up did not finish. Sign out and request access again.'
            : 'Your account is created but not yet approved. This page will unlock by itself once it is — you can leave it open.'}
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs">
        <Mail className="w-3.5 h-3.5 text-[var(--text-muted)]" />
        <span className="font-mono">{user.email}</span>
      </div>

      <button onClick={signOut}
        className="btn-ghost px-4 py-2.5 text-xs flex items-center gap-2 cursor-pointer">
        <LogOut className="w-3.5 h-3.5" /> Sign out
      </button>
    </Shell>
  );
}

export default function StaffGate({ children }) {
  const [session, setSession] = useState({ ready: false, user: null, staff: null });
  const [legacyOk, setLegacyOk] = useState(
    () => sessionStorage.getItem('adminAuthed') === 'true'
  );

  useEffect(() => watchSession(setSession), []);

  if (!isFirebaseConfigured()) {
    return legacyOk
      ? children({ user: null, staff: null, canPublish: false })
      : <LegacyGate onUnlock={() => setLegacyOk(true)} />;
  }

  if (!session.ready) {
    return (
      <Shell>
        <p className="text-sm text-[var(--text-muted)]">Checking your access…</p>
      </Shell>
    );
  }

  if (!session.user) return <SignInPanel />;
  if (!isApproved(session.staff)) {
    return <StatusPanel user={session.user} staff={session.staff} />;
  }

  return children({
    user: session.user,
    staff: session.staff,
    canPublish: true,
  });
}
