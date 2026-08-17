# Firebase setup — live publishing

This connects the Slide Labeller to a backend so staff can publish exercises
that every student sees, with no rebuild and no intervention from you.

**Cost: ₹0.** The free (Spark) plan covers this comfortably. See
[Storage and the paid plan](#storage-and-the-paid-plan) for the one caveat.

Until you finish this, the app keeps working exactly as before: the Slide
Labeller saves to the browser only, gated by the shared passphrase.

---

## 1. Create the project

1. Go to <https://console.firebase.google.com> and click **Add project**.
2. Name it something like `histopath-india`. Google Analytics is not needed —
   turn it off.

## 2. Register the web app

1. On the project overview, click the **`</>`** (Web) icon.
2. Give it a nickname. **Do not** tick Firebase Hosting — the site stays on
   GitHub Pages.
3. You'll be shown a `firebaseConfig` block. Keep it open for step 6.

## 3. Turn on email sign-in

**Build → Authentication → Get started → Email/Password → Enable → Save.**

Leave "Email link (passwordless sign-in)" off.

## 4. Create the database

**Build → Firestore Database → Create database.**

- Choose **Start in production mode** (locked down; step 5 opens exactly what's
  needed).
- Pick a location near your users — `asia-south1` (Mumbai) for India. This
  cannot be changed later.

## 5. Apply the security rules

This step is what stops a student overwriting the site. Do not skip it.

1. **Firestore Database → Rules**, replace everything with the contents of
   [`firebase/firestore.rules`](../firebase/firestore.rules), then **Publish**.
2. If you enable Storage (step 8), do the same with
   [`firebase/storage.rules`](../firebase/storage.rules) under
   **Storage → Rules**.

What the rules enforce:

- Anyone can *read* published exercises — students are never signed in.
- Only an account whose `staff` record says `status: approved` can publish.
- A new sign-up is pinned to `pending`/`staff`, so registering cannot grant
  approval or ownership no matter what the browser sends.
- `role` cannot be changed through the app at all, so a compromised owner
  account cannot create more owners.

## 6. Paste the config

Open [`src/config/firebase.js`](../src/config/firebase.js) and fill in the
values from step 2:

```js
export const firebaseConfig = {
  apiKey: 'AIza…',
  authDomain: 'histopath-india.firebaseapp.com',
  projectId: 'histopath-india',
  storageBucket: '',            // leave empty unless you did step 8
  messagingSenderId: '…',
  appId: '…',
};
```

These values are **not secrets**. Firebase web config is public by design —
it ships to every visitor. Security comes from the rules in step 5, not from
hiding these strings.

Commit and push. The existing GitHub Action deploys it in about 40 seconds.

## 7. Make yourself the owner

The owner is the only account that can approve others. There's a deliberate
one-time manual step here, because a system that can promote its own first
owner can be tricked into promoting anyone.

1. Open the live site → **Admin** → **Request access**, and sign up with your
   own email.
2. In the Firebase console: **Firestore Database → Data → `staff`**, and open
   the document whose `email` is yours.
3. Change two fields:
   - `status` → `approved`
   - `role` → `owner`
4. Reload the site. You'll now see a **Staff access** tab.

From then on, everything is done in the app: professors sign up, you approve
them from that tab, and they can publish immediately.

## 8. Storage and the paid plan

Firebase projects created since late 2024 require the **Blaze** (pay-as-you-go)
plan to use Cloud Storage. Blaze needs a card on file, but includes a free
allowance — 5 GB of storage — and this app would use a fraction of that. In
practice the bill is ₹0. Set a budget alert of ₹100 if you want a hard
guardrail.

**You can skip Blaze entirely.** Leave `storageBucket` empty in step 6 and the
app stores each slide directly inside its Firestore document instead. The
trade-off is a size ceiling of roughly 700 KB per slide. The Slide Labeller
already shrinks uploads to 1400px, which usually lands at 200–400 KB, so most
slides fit. A slide that doesn't fit gives a clear error telling you to enable
Storage or use a smaller image.

| | Storage enabled (Blaze) | Firestore only (Spark) |
|---|---|---|
| Card required | Yes | No |
| Slide size limit | 8 MB | ~700 KB |
| Realistic cost | ₹0 | ₹0 |

Start without Storage. Turn it on later if you hit the limit — published
exercises keep working either way.

---

## How it fits together

```
staff/{uid}       email, name, status, role      ← who may publish
exercises/{id}    image, markers, caption        ← what students load
slides/{id}       the slide image (Storage only)
```

The app subscribes to `exercises` and mirrors it into the same local store the
offline labeller uses. That has two useful consequences: the games read
exercises from one place regardless of origin, and a student who has loaded a
mission once can replay it offline.

## Checking it works

1. Sign in as an approved account. The portal header should read
   **Publishing live**.
2. Build an exercise and click **Publish to students**.
3. Open the site in a private window — not signed in — and play that mission.
   The slide should be there.

If publishing fails with *"not approved to publish yet"*, the account's
`status` isn't `approved`, or the rules from step 5 weren't published.
