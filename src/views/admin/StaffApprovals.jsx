import React, { useState, useEffect } from 'react';
import { Check, X, Clock, ShieldCheck, Users, RotateCcw } from 'lucide-react';
import { watchStaffList, decideStaff, isOwner } from '../../lib/staff';
import { friendlyError } from '../../lib/firebase';

// ═══════════════════════════════════════════════════════════
// Owner-only review of access requests.
// ═══════════════════════════════════════════════════════════

const STATUS = {
  pending:  { label: 'Pending',  bg: 'var(--gold-soft)',    ink: 'var(--gold-ink)' },
  approved: { label: 'Approved', bg: 'var(--accent-soft)',  ink: 'var(--accent-ink)' },
  rejected: { label: 'Rejected', bg: 'var(--danger-soft)',  ink: 'var(--danger-ink)' },
};

function when(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString(undefined, {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

export default function StaffApprovals({ staff, user }) {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [busyUid, setBusyUid] = useState(null);

  useEffect(
    () => watchStaffList(setRows, (err) => setError(friendlyError(err))),
    []
  );

  if (!isOwner(staff)) {
    return (
      <p className="text-sm text-[var(--text-secondary)]">
        Only an owner account can review access requests.
      </p>
    );
  }

  const decide = async (uid, status) => {
    setBusyUid(uid);
    setError('');
    try {
      await decideStaff(uid, status, user?.email);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setBusyUid(null);
    }
  };

  const pending = (rows || []).filter(r => r.status === 'pending');
  const decided = (rows || []).filter(r => r.status !== 'pending');

  const Row = ({ r }) => {
    const s = STATUS[r.status] || STATUS.pending;
    const isSelf = r.uid === user?.uid;
    return (
      <li className="card flex flex-wrap items-center gap-3 p-3.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm truncate">{r.name || r.email}</span>
            {r.role === 'owner' && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold"
                    style={{ background: 'var(--accent-2-soft)', color: 'var(--accent-2-ink)' }}>
                <ShieldCheck className="w-3 h-3" /> Owner
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                  style={{ background: s.bg, color: s.ink }}>
              {s.label}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] font-mono truncate mt-0.5">{r.email}</p>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Requested {when(r.requestedAt)}
            {r.decidedAt ? ` · decided ${when(r.decidedAt)}` : ''}
          </p>
        </div>

        {isSelf ? (
          <span className="text-[11px] text-[var(--text-muted)] italic">your account</span>
        ) : (
          <div className="flex gap-2 shrink-0">
            {r.status !== 'approved' && (
              <button
                onClick={() => decide(r.uid, 'approved')}
                disabled={busyUid === r.uid}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
                style={{ background: 'var(--accent)', color: 'var(--text-on-accent)' }}
              >
                <Check className="w-3.5 h-3.5" /> Approve
              </button>
            )}
            {r.status === 'approved' && (
              <button
                onClick={() => decide(r.uid, 'pending')}
                disabled={busyUid === r.uid}
                className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-xs cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Suspend
              </button>
            )}
            {r.status !== 'rejected' && (
              <button
                onClick={() => decide(r.uid, 'rejected')}
                disabled={busyUid === r.uid}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-50"
                style={{ background: 'var(--danger-soft)', color: 'var(--danger-ink)' }}
              >
                <X className="w-3.5 h-3.5" /> Reject
              </button>
            )}
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-heading font-bold text-lg flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--accent-ink)]" /> Staff access
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Approve an account and that person can publish slides to the live site
          immediately. Suspending returns them to pending without deleting their work.
        </p>
      </div>

      {error && (
        <p className="px-3.5 py-2.5 rounded-lg text-xs font-semibold"
           style={{ background: 'var(--danger-soft)', color: 'var(--danger-ink)' }}>
          {error}
        </p>
      )}

      {rows === null ? (
        <p className="text-sm text-[var(--text-muted)]">Loading requests…</p>
      ) : (
        <>
          <section className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Awaiting approval ({pending.length})
            </h4>
            {pending.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)] py-3">Nothing waiting.</p>
            ) : (
              <ul className="flex flex-col gap-2.5">
                {pending.map(r => <Row key={r.uid} r={r} />)}
              </ul>
            )}
          </section>

          {decided.length > 0 && (
            <section className="flex flex-col gap-2.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                Everyone else ({decided.length})
              </h4>
              <ul className="flex flex-col gap-2.5">
                {decided.map(r => <Row key={r.uid} r={r} />)}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}
