# CFIDL site — launch checklist

The complete sequence, start to finish: apply this session's fixes, swap
every placeholder for the real thing, connect Sanity/Formspree/Zoho, and
deploy. Work through it in order — later steps assume earlier ones are
done. Tick items off as you go.

For "what file do I touch if X breaks/needs changing" instead of "what
order do I do things in," see `PROJECT_GUIDE.md` — the two are meant to be
used together.

---

## Step 0 — Apply this session's changes (Round 3)

- [ ] Replace these 12 files with the versions in this delivery (all full
      files — no find/replace needed, see `PATCHES.md` for why):
      `src/components/layout/Header.astro`, `src/scripts/nav.ts`,
      `public/favicon.svg`, `src/components/ui/Icon.astro`,
      `src/components/forms/ContactForm.astro`,
      `src/pages/get-involved.astro`, `src/components/cards/StoryCard.astro`,
      `schemaTypes/documents/getInvolvedPage.ts`,
      `src/lib/sanity/queries.ts`, `src/env.d.ts`,
      `src/components/PortableText.astro`, `package.json`.
- [ ] Run `npm install` — `package.json` now lists `@sanity/icons`
      explicitly (it worked before this via hoisting, but wasn't declared;
      see `SESSION_LOG.md`, Round 3). This regenerates `package-lock.json`
      for you; don't hand-edit the lockfile.
- [ ] Restart `npm run dev` fully (stop it, start it again) rather than
      relying on hot-reload — several of today's changes touch how
      `Header.astro` and `nav.ts` attach event listeners.
- [ ] **Test the mobile menu specifically**, on an actual narrow viewport
      or your browser's device toolbar: 1. Load a page, open the menu before scrolling — should work (this
      part was never broken). 2. Close it, scroll down the page, open it again — this is the part
      that was broken. Confirm the panel actually appears. 3. With the panel open (or after opening and closing it once) after
      scrolling, confirm every other element on the page — header nav
      links, buttons, the footer newsletter form — is still clickable.
      This combination (scroll, then click something else) is exactly
      what was broken before. 4. Watch the hamburger icon itself — it should morph into an X when
      open, not just show a static hamburger the whole time. 5. If anything above still doesn't behave, open the browser console
      (F12) before testing, and send me any red error text — that
      would mean there's a second, different problem stacked on top of
      the one fixed this round.
- [ ] Check the browser tab's favicon — should now show the same
      saffron/marigold mark as the logo in the header/footer, not the old
      plain orange one. (Browsers cache favicons aggressively — hard
      refresh, or check in a private/incognito window, if it looks
      unchanged.)
- [ ] If/when you add real "Get Involved" content in Studio, note each
      "way" now has its own **Icon** dropdown (Community / Business /
      Financier / Government) — pick whichever fits.

## Step 1 — Confirm Rounds 1–2 are already live

These were verified against your actual pasted source this session (see
`PATCHES.md`) — this is just a quick visual double-check, not new work:

- [ ] Brand colours (`#DD5E34` saffron, `#D4C26B` marigold) show correctly
      site-wide, headings are in Roboto Black.
- [ ] Page background is white, not peach/cream.
- [ ] Homepage hero slideshow crossfades smoothly with no black flash
      between photos.
- [ ] Diamond Model cards (homepage + Approach page) don't overlap the
      text above them.
- [ ] The hero no longer shows a "Scroll" text label (just the fading
      line).

If any of these look wrong, something didn't get applied correctly —
compare against `SESSION_LOG.md` Rounds 1–2 for what should be in place.

## Step 2 — Placeholder assets to replace

All of these currently show clearly-flagged placeholder content, so the
site never looks broken while you work through them — but none of them
should go live as-is.

- [ ] **Logo** — Studio → Site Settings → Logo (+ optional Logo Dark for
      the dark header/footer). Until set, the site shows an abstract
      marigold-bloom mark (`src/components/ui/LogoMark.astro`) in your new
      brand colours — a fine placeholder while you sort a real logo, not
      an emergency. **If you do replace it, also update
      `public/favicon.svg` by hand** — it's a static file that can't pull
      from Studio or from the CSS colour tokens the way the in-app logo
      does.
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
- [ ] **"Get Involved" card icons** — the three fallback cards (Fund a
      programme / Partner with us / Share your expertise) already have
      sensible icons picked (financier / business / community). If you
      change or add ways to get involved in Studio, set each one's icon
      to whichever of the four fits.

## Step 3 — Connect Sanity (content)

- [ ] Create a free project at sanity.io/get-started, or from this folder
      run `npx sanity@latest init` and choose "use existing schema" (it
      will detect `schemaTypes/`).
- [ ] Copy the **Project ID** from manage.sanity.io → your project →
      Project settings, into `.env`:
      `     PUBLIC_SANITY_PROJECT_ID=your-project-id
    PUBLIC_SANITY_DATASET=production
    `
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
      statically generated, publishing in Studio does _not_ instantly
      update the _deployed_ site — only your local dev server sees changes
      immediately. In Sanity: Project settings → API → Webhooks, add one
      that calls your host's deploy hook on publish (Vercel: Project
      Settings → Git → Deploy Hooks, create one, paste its URL into the
      Sanity webhook). Without this, "I published but the live site didn't
      change" will happen — on the real site this time, not `npm run dev`.
- [ ] If Studio itself misbehaves right after publishing (content looks
      stale, or the Studio UI glitches), try a hard refresh first, then a
      full `npm run dev` restart. Sanity's own docs note the embedded
      Studio shares Astro's dev server, and file-watching/HMR events —
      which a publish can trigger — can momentarily disrupt the Studio; a
      refresh is the documented fix. If `.env` changed recently, only a
      full restart picks that up — Vite doesn't hot-reload environment
      variables.

## Step 4 — Connect Formspree (contact form)

- [ ] Create a form at formspree.io (free plan covers a low-traffic
      contact form).
- [ ] Copy the ID from the endpoint it gives you
      (`https://formspree.io/f/xyzabcde` → the `xyzabcde` part) into
      `.env`: `PUBLIC_FORMSPREE_FORM_ID=xyzabcde`.
- [ ] In Formspree's dashboard, point the notification email at a real
      CFIDL inbox.
- [ ] `/contact` works immediately after this — no rebuild needed, since
      Formspree is called directly from the visitor's browser. (Until this
      is set, the form shows a small "not connected yet" notice — that's
      expected, and now uses a plain info icon rather than a sparkle.)

## Step 5 — Connect Zoho (org email + newsletter sending)

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
      `     ZOHO_SMTP_HOST=smtp.zoho.com
    ZOHO_SMTP_PORT=465
    ZOHO_SMTP_SECURE=true
    ZOHO_SMTP_USER=you@cfidl.org
    ZOHO_SMTP_PASSWORD=your-app-specific-password
    ZOHO_NOTIFY_TO=info@cfidl.org
    NEWSLETTER_FROM_NAME=CFIDL
    `
      EU data centre → `smtp.zoho.eu`; India data centre → `smtp.zoho.in`;
      some paid Workspace plans use `smtppro.zoho.com` instead — check
      Zoho Mail → Settings → Mail Accounts → POP/IMAP if the standard host
      doesn't connect. (These are now type-checked in `src/env.d.ts`, so a
      typo'd variable name will show up in `npm run typecheck` instead of
      failing silently at send time.)
- [ ] Test: `npm run dev`, submit the newsletter form in the footer,
      confirm both the subscriber confirmation and the internal
      notification email arrive.

## Step 6 — Deploy

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

## Step 7 — Final pass before you call it launched

- [ ] Every checkbox above is done.
- [ ] Run `npm run typecheck` and `npm run build` locally — both should
      finish clean.
- [ ] Click every link in the header and footer nav on the live URL.
- [ ] Submit both the contact form and the newsletter form for real and
      confirm the emails land.
- [ ] Check the site on an actual phone, in particular: - The mobile menu — open it, scroll, open it again, confirm the
      rest of the page stays interactive throughout (this is the bug
      fixed this round; worth a real-device check, not just desktop
      devtools). - The hero slideshow, for a good 30–60 seconds. - The favicon in your phone's browser tab. - Both forms.
- [ ] Skim `/privacy` and `/disclaimer` one more time to confirm they're
      your real, reviewed text and not the placeholder notice.
- [ ] Skim the "Get Involved" page and confirm each card's icon actually
      fits what it's describing.
