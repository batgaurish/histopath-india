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
  apiKey: import.meta.env.VITE_FB_API_KEY || 'AIzaSyAS2UOqABaAnUoa3MC6GbueqaOnfL5uW0U',
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN || 'histopath-india.firebaseapp.com',
  projectId: import.meta.env.VITE_FB_PROJECT_ID || 'histopath-india',

  // Left empty on purpose: Cloud Storage needs the paid Blaze plan on new
  // projects, so slides are stored inside their Firestore document instead
  // (~700 KB ceiling each). To switch to Storage later, enable it in the
  // console and put the bucket back:
  //   'histopath-india.firebasestorage.app'
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET || '',

  messagingSenderId: import.meta.env.VITE_FB_SENDER_ID || '433372382892',
  appId: import.meta.env.VITE_FB_APP_ID || '1:433372382892:web:b14cd93bef4ad8263d8109',
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
