// ═══════════════════════════════════════════════════════════
// Firebase project configuration
//
// Paste the values from the Firebase console here:
//   Project settings → General → Your apps → SDK setup and configuration
//
// These values are NOT secrets. Firebase web config ships to every visitor
// by design; access is controlled by the security rules in
// `firebase/firestore.rules` and `firebase/storage.rules`, not by hiding
// these strings. See docs/FIREBASE_SETUP.md.
//
// While `apiKey` is blank the app runs in local-only mode: the Slide
// Labeller still works and saves to the browser, but nothing publishes.
// ═══════════════════════════════════════════════════════════

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY || '',
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FB_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FB_SENDER_ID || '',
  appId: import.meta.env.VITE_FB_APP_ID || '',
};

/**
 * Email addresses that may approve staff accounts.
 *
 * This list is a convenience for the UI only — the authoritative check is
 * `role == 'owner'` on the signer's own `staff` document, enforced in the
 * Firestore rules. Add your address here and set the same role in the
 * console once, as described in the setup guide.
 */
export const OWNER_EMAILS = [
  'stremio4385@proton.me',
];

export const isFirebaseConfigured = () =>
  Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
