import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig, isFirebaseConfigured } from '../config/firebase';

// ═══════════════════════════════════════════════════════════
// Lazy Firebase singletons.
//
// The app must work with no Firebase project attached — the Slide Labeller
// then saves to the browser only. So nothing initialises until something
// actually asks for it, and every accessor returns null when unconfigured.
// ═══════════════════════════════════════════════════════════

let _app = null;
let _auth = null;
let _db = null;
let _storage = null;

function app() {
  if (!isFirebaseConfigured()) return null;
  if (!_app) {
    try {
      _app = initializeApp(firebaseConfig);
    } catch (e) {
      console.error('Firebase failed to initialise', e);
      return null;
    }
  }
  return _app;
}

export function auth() {
  if (_auth) return _auth;
  const a = app();
  if (!a) return null;
  _auth = getAuth(a);
  return _auth;
}

export function db() {
  if (_db) return _db;
  const a = app();
  if (!a) return null;
  _db = getFirestore(a);
  return _db;
}

export function storage() {
  if (_storage) return _storage;
  const a = app();
  if (!a) return null;
  // Throws when the project has no default bucket, which is the normal state
  // for projects that never enabled Cloud Storage.
  try {
    _storage = getStorage(a);
  } catch (e) {
    console.warn('Firebase Storage unavailable; publishing will inline images', e);
    return null;
  }
  return _storage;
}

export { isFirebaseConfigured };

/** Human-readable message for the Firebase error codes users actually hit. */
export function friendlyError(err) {
  const code = err?.code || '';
  const map = {
    'auth/invalid-email': 'That does not look like a valid email address.',
    'auth/missing-password': 'Enter a password.',
    'auth/weak-password': 'Use at least six characters.',
    'auth/email-already-in-use': 'An account already exists for that email — sign in instead.',
    'auth/invalid-credential': 'Email or password is incorrect.',
    'auth/wrong-password': 'Email or password is incorrect.',
    'auth/user-not-found': 'No account found for that email.',
    'auth/too-many-requests': 'Too many attempts. Wait a minute and try again.',
    'auth/network-request-failed': 'No connection to the server. Check your internet.',
    'permission-denied': 'Your account is not approved to publish yet.',
    'storage/unauthorized': 'Your account is not approved to upload slides yet.',
    'storage/retry-limit-exceeded': 'The upload timed out. Try a smaller image.',
  };
  return map[code] || err?.message || 'Something went wrong.';
}
