# CFIDL site — launch checklist

Everything left to do to take this from "builds with placeholder content"
to "live, on-brand, and taking real submissions." Work through it roughly
in order — later steps assume earlier ones are done. Tick items off as you
go.

This is the *sequence*. For "what file do I touch if X breaks," see
`PROJECT_GUIDE.md` instead — the two are meant to be used together.

---

## 0. Apply this session's changes (round 1 — brand + Sanity bug)

- [ ] Replace `src/styles/global.css` with the version in this delivery
      (full rebrand: colours, headings, eyebrow labels).
- [ ] Apply the three edits in `PATCHES.md` items 1–3
      (`stories/[slug].astro`, `stories/category/[category].astro`,
      `index.astro`), and item 4 (`about.astro`, the sparkle icon) if you'd
      like the AI-tell fix.
- [ ] Update fonts in `package.json` — remove the two no-longer-used
      packages, add Roboto:
      ```bash
      npm uninstall @fontsource-variable/fraunces @fontsource/manrope
      npm install @fontsource/roboto
      ```
- [ ] Stop `npm run dev` if it's running, then start it again fresh
      (`npm run dev`) — this matters, see step 1 below.
- [ ] Visually check a few pages. If anything still shows an old orange/
      gold/brown that doesn't match `#DD5E34` / `#D4C26B`, that component
      has a hardcoded colour — search the codebase for the old hex values
      (`c1531a`, `f2a53c`, `2c4a63`, `6e5a45`) to find it.

## 0b. Apply this session's changes (round 2 — the 5 bugs from testing)

- [ ] Replace `src/layouts/BaseLayout.astro`, `src/components/sections/
      Hero.astro`, and `src/components/sections/DiamondModel.astro` with
      the versions in this delivery (full files — safe to use even if you
      hadn't gotten to round 1's `global.css` yet, since this delivery's
      `global.css` supersedes that one).
- [ ] Apply `PATCHES.md` item 5 (`Header.astro`, two `bg-mist` → `bg-white`
      swaps).
- [ ] Restart `npm run dev` again (the script tags in `BaseLayout.astro`
      changed, and dev servers don't always pick up `<script>` structure
      changes on hot-reload the way they do CSS).
- [ ] Test the mobile hamburger menu on an actual narrow viewport (or your
      browser's device toolbar). If it still doesn't open, open the
      browser console (F12) before clicking it, click it, and note any red
      error text — that pins down the real cause immediately, since this
      round's fix addresses the most likely cause but wasn't verified
      against your live dev server.
- [ ] Test the homepage hero slideshow for a good ~30–60 seconds to confirm
      the crossfade is now gap-free.
- [ ] Check the Diamond Model section (homepage, and the Approach page) at
      a few different browser widths — the card-overlap fix was tuned
      against an estimated card height; if your actual stakeholder
      descriptions run noticeably longer than the placeholder text, the top
      card may need a little more clearance (`top: 20` → `top: 22` or so,
      in `DiamondModel.astro`'s `positions` array).

## 1. Fix the "publish breaks the site" issue (from round 1, if not yet resolved)

- [ ] **Try a hard refresh first, then a full dev-server restart**
      (`Ctrl+C`, then `npm run dev` again). Sanity's own docs note that
      the embedded Studio shares Astro's dev server, and file-watching /
      HMR events — which a publish can trigger — can "momentarily disrupt
      the Studio"; a refresh is the documented fix. If your `.env` changed
      at all recently, only a full restart picks that up — Vite does not
      hot-reload environment variables.
- [ ] Apply the two `getStaticPaths` patches (`PATCHES.md` items 1–2) —
      belt-and-suspenders fix for a real, if narrow, gap.
- [ ] If it still breaks after both of those: open the browser console
      (F12 → Console) and the terminal running `npm run dev`, reproduce
      it, and save the exact error text — that will point at the real
      cause immediately.

## 2. Placeholder assets to replace

All of these currently show clearly-flagged placeholder content, so the
site never looks broken while you work through them — but none of them
should go live as-is.

- [ ] **Logo** — Studio → Site Settings → Logo (+ optional Logo Dark for
      the dark header/footer). Until set, the site shows an abstract
      marigold-bloom mark (`src/components/ui/LogoMark.astro`) — it will
      already pick up your new colours automatically, so it's a fine
      placeholder while you sort a real logo, not an emergency.
- [ ] **Favicon** — Studio → Site Settings → Favicon, *or* replace
      `public/favicon.svg` directly.
- [ ] **Hero photography** — Studio → Home Page → Hero background
      slideshow (3–7 landscape photos). Until set, it falls back to
      Wikimedia Commons stock photos of rural Bangladesh — confirm each
      photo's individual licence before relying on it in production, or
      just replace the set (`FALLBACK_HERO_SLIDES` in
      `src/lib/sanity/queries.ts`).
- [ ] **Org details** — Studio → Site Settings → email, phone, address,
      social links.
- [ ] **Privacy Statement / Disclaimer** — currently generic placeholder
      text (visibly flagged on both pages). Create a Studio → Simple Page
      with slug `privacy` and one with slug `disclaimer`, and have the
      real text reviewed by someone qualified for your jurisdiction before
      launch.
- [ ] **Team / Press / Publications** — currently empty states ("no
      entries yet"). Add real ones in Studio if/when you have them; not
      blocking for launch.

## 3. Connect Sanity (content)

- [ ] Create a free project at sanity.io/get-started, or from this folder
      run `npx sanity@latest init` and choose "use existing schema" (it
      will detect `schemaTypes/`).
- [ ] Copy the **Project ID** from manage.sanity.io → your project →
      Project settings, into `.env`:
      ```
      PUBLIC_SANITY_PROJECT_ID=your-project-id
      PUBLIC_SANITY_DATASET=production
      ```
- [ ] manage.sanity.io → your project → API → CORS Origins → add
      `http://localhost:4321` (or whatever port `npm run dev` prints) with
      **Allow credentials** checked. Add your production URL here too once
      you have one (step 6).
- [ ] `npm run dev` → open `http://localhost:4321/studio` → log in.
- [ ] Fill in **Site Settings** and **Navigation** first — they drive the
      header and footer on every page — then **Home Page**, **About
      Page**, **Approach Page**, **Get Involved Page**, **Contact Page**,
      then add a few **Stories**.
- [ ] **Set up the rebuild webhook** (easy to miss): because the site is
      statically generated, publishing in Studio does *not* instantly
      update the *deployed* site — only your local dev server sees changes
      immediately. In Sanity: Project settings → API → Webhooks, add one
      that calls your host's deploy hook on publish (Vercel: Project
      Settings → Git → Deploy Hooks, create one, paste its URL into the
      Sanity webhook). Without this, "I published but the live site didn't
      change" will happen again — on the real site this time, not `npm run
      dev`.

## 4. Connect Formspree (contact form)

- [ ] Create a form at formspree.io (free plan covers a low-traffic
      contact form).
- [ ] Copy the ID from the endpoint it gives you
      (`https://formspree.io/f/xyzabcde` → the `xyzabcde` part) into
      `.env`: `PUBLIC_FORMSPREE_FORM_ID=xyzabcde`.
- [ ] In Formspree's dashboard, point the notification email at a real
      CFIDL inbox.
- [ ] `/contact` works immediately after this — no rebuild needed, since
      Formspree is called directly from the visitor's browser.

## 5. Connect Zoho (org email + newsletter sending)

- [ ] Sign up at zoho.com/mail, add your domain, and add the MX / SPF /
      DKIM (and ideally DMARC) records it gives you at your DNS host —
      that's a DNS change, not a code change.
- [ ] Create the mailbox you'll send from (e.g. `info@cfidl.org`).
- [ ] Settings → Mail Accounts → confirm IMAP/SMTP access is enabled for
      that mailbox.
- [ ] If 2FA is on, generate an app-specific password at
      accounts.zoho.com → Security → App Passwords — use that, not your
      normal password.
- [ ] Add to `.env`:
      ```
      ZOHO_SMTP_HOST=smtp.zoho.com
      ZOHO_SMTP_PORT=465
      ZOHO_SMTP_SECURE=true
      ZOHO_SMTP_USER=you@cfidl.org
      ZOHO_SMTP_PASSWORD=your-app-specific-password
      ZOHO_NOTIFY_TO=info@cfidl.org
      NEWSLETTER_FROM_NAME=CFIDL
      ```
      EU data centre → `smtp.zoho.eu`; India data centre → `smtp.zoho.in`;
      some paid Workspace plans use `smtppro.zoho.com` instead — check
      Zoho Mail → Settings → Mail Accounts → POP/IMAP if the standard host
      doesn't connect.
- [ ] Test: `npm run dev`, submit the newsletter form in the footer,
      confirm both the subscriber confirmation and the internal
      notification email arrive.

## 6. Deploy

- [ ] Push the repo to GitHub, import it in Vercel.
- [ ] Vercel → Project Settings → Environment Variables → add every
      variable from your `.env` (Sanity, Formspree, and Zoho — all of
      them, including the non-`PUBLIC_` ones; Vercel keeps server-only
      variables private).
- [ ] Set `PUBLIC_SITE_URL` to your real production URL.
- [ ] Deploy. `vercel.json` already rewrites `/studio/*` → `/studio`, so
      refreshing a deep Studio URL in production won't 404 — nothing to
      do there.
- [ ] Back in Sanity's CORS Origins (step 3), add the production URL.
- [ ] Confirm the Sanity → Vercel deploy webhook (step 3) actually fires:
      publish a small test edit in Studio and watch for a new deployment
      in Vercel.

## 7. Final pass before you call it launched

- [ ] Every checkbox above is done.
- [ ] Run `npm run typecheck` and `npm run build` locally — both should
      finish clean.
- [ ] Click every link in the header and footer nav on the live URL.
- [ ] Submit both the contact form and the newsletter form for real and
      confirm the emails land.
- [ ] Check the site on an actual phone — the mobile menu, hero
      slideshow, and forms are the highest-risk spots for surprises, and
      two of those (menu, slideshow) had real bugs found by testing this
      round.
- [ ] Skim `/privacy` and `/disclaimer` one more time to confirm they're
      your real, reviewed text and not the placeholder notice.
