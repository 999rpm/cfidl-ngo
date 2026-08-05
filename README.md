# CFIDL — Collective for Inclusive Development Ltd

The marketing and content site for CFIDL's sanitation and financial-inclusion
programme in Bangladesh. Built with [Astro](https://astro.build),
[Sanity](https://sanity.io) (CMS), [Formspree](https://formspree.io) (contact
form) and [Zoho Mail](https://zoho.com/mail) (newsletter confirmations),
styled with Tailwind CSS v4 and animated with GSAP.

## Stack

| Tool | Why |
|---|---|
| **Astro, static output** | The site is almost entirely content — Astro ships zero JS by default and prerenders every page to static HTML, which is fast and cheap to host. |
| **Tailwind CSS v4** | Utility-first styling with a CSS-first `@theme` block, so the whole design system (colour, type, shadow) lives in one file: `src/styles/global.css`. |
| **GSAP + ScrollTrigger** | Scroll-driven reveals and the signature "thread" line motif. |
| **`@sanity/astro`** | Embeds Sanity Studio at `/studio` inside this same project, so there's one repo and one deploy instead of a separate Studio app. |
| **`@formspree/ajax`** | AJAX contact-form submission with inline validation, no page reload. |
| **Nodemailer + Zoho SMTP** | The one dynamic route in the site (`/api/newsletter`) sends a confirmation email and an internal notification through Zoho Mail whenever someone subscribes. |
| **Vercel adapter** | Every page is static except `/api/newsletter`, which runs as a small serverless function. |

If Zoho's transactional volume ever outgrows plain SMTP, `src/pages/api/newsletter.ts`
is a single, self-contained file — swapping it for Zoho's ZeptoMail API (or
adding a queue) doesn't touch anything else in the site.

## Design

- **Palette** — warm saffron and marigold rather than a generic corporate
  blue, drawn from the marigold garlands used across Bangladeshi
  celebrations and the terracotta brickwork common in the region. Indigo — 
  saffron's complement on the colour wheel — appears sparingly, mainly in
  the Circular Model, so it reads as a deliberate accent rather than a
  competing brand colour. All tokens live in `src/styles/global.css`.
- **Type** — Fraunces (display), Manrope (body), IBM Plex Mono (data labels
  and eyebrows, so stat figures read as measured numbers).
- **Hero** — a slow, crossfading photo slideshow (pure CSS, no JS) rather
  than a flat colour block, with a warm scrim so any photo lands on-brand.
  Configurable per page in Studio; falls back to placeholder photography
  otherwise (see "Hero photography" below).
- **Signature motif** — a thread line that draws itself in on scroll,
  nodding to Bangladesh's nakshi kantha embroidery tradition. Used
  sparingly (hero, Diamond Model, footer) rather than everywhere.
- All animations respect `prefers-reduced-motion`; focus states are visible
  throughout; the mobile nav is a full accordion drawer.

## Project structure

```
├── schemaTypes/          Sanity schema (documents + reusable objects)
├── structure.ts          Sanity Studio sidebar organisation
├── sanity.config.ts       Studio config (used by the embedded /studio route)
├── sanity.cli.ts          Sanity CLI config (for `npx sanity` commands)
├── src/
│   ├── components/
│   │   ├── ui/            Button, Icon, Container, SectionHeading…
│   │   ├── layout/         Header, Footer, NewsletterForm
│   │   ├── sections/       Hero, ImpactStats, DiamondModel, CircularModel…
│   │   ├── cards/          StoryCard, PressCard, PublicationCard
│   │   └── forms/          ContactForm (Formspree)
│   ├── lib/
│   │   ├── sanity/         client.ts, image.ts, queries.ts (typed + fallback content)
│   │   └── utils.ts
│   ├── layouts/BaseLayout.astro
│   ├── scripts/            animations.ts (GSAP), nav.ts
│   └── pages/              one file per route + src/pages/api/newsletter.ts
└── public/
```

Every Sanity query in `src/lib/sanity/queries.ts` has a typed fallback, so
`npm run dev` looks fully populated even before Sanity is connected.

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

The site runs with placeholder content immediately. To make it yours, work
through the integrations below, then the launch checklist at the bottom.

## Connect Sanity (content)

1. Create a free project at [sanity.io/get-started](https://www.sanity.io/get-started)
   (or run `npx sanity@latest init` from this folder and choose "use existing
   schema" — it detects `schemaTypes/`).
2. Copy your **Project ID** from [manage.sanity.io](https://manage.sanity.io)
   into `.env`:
   ```
   PUBLIC_SANITY_PROJECT_ID=your-project-id
   PUBLIC_SANITY_DATASET=production
   ```
3. Run `npm run dev` and open `http://localhost:4321/studio`. Log in with
   your Sanity account.
4. Fill in **Site Settings** and **Navigation** first (they power the
   header/footer on every page), then **Home Page**, **About Page**,
   **Approach Page**, etc., then add some **Stories**.
5. **Deploying content changes:** because the site is statically generated,
   publishing in Studio doesn't instantly update the live site — it needs a
   rebuild. Add a webhook in Sanity (Project settings → API → Webhooks)
   that calls your host's deploy hook on publish, so the site rebuilds
   itself automatically a few seconds after you hit publish.

## Connect Formspree (contact form)

1. Create a form at [formspree.io](https://formspree.io) (the free plan
   covers a low-traffic contact form).
2. It gives you an endpoint like `https://formspree.io/f/xyzabcde` — copy
   just the `xyzabcde` part into `.env`:
   ```
   PUBLIC_FORMSPREE_FORM_ID=xyzabcde
   ```
3. In Formspree's dashboard, set the notification email to a real CFIDL
   inbox (e.g. `info@cfidl.org`) so submissions land where someone reads them.
4. `/contact` starts working immediately — no rebuild needed for form
   changes, since Formspree is called directly from the browser.

## Connect Zoho Mail (required)

Zoho Mail does two jobs here: hosting CFIDL's real email addresses, and
sending the newsletter confirmation email via SMTP.

**A. Get the domain's email working on Zoho**
1. Sign up at [zoho.com/mail](https://www.zoho.com/mail/) and add the domain.
2. Zoho gives you MX, SPF, DKIM (and ideally DMARC) records to add at the
   domain registrar / DNS host — a DNS change, not a code change.
3. Create the mailbox(es) to send from (e.g. `info@cfidl.org`).

**B. Enable SMTP so the newsletter route can send mail**
1. In Zoho Mail, go to **Settings → Mail Accounts** and confirm IMAP/SMTP
   access is enabled for the sending mailbox.
2. If two-factor authentication is on, generate an **app-specific password**
   at [accounts.zoho.com → Security → App Passwords](https://accounts.zoho.com) —
   use that instead of the normal password.
3. Add to `.env`:
   ```
   ZOHO_SMTP_HOST=smtp.zoho.com
   ZOHO_SMTP_PORT=465
   ZOHO_SMTP_SECURE=true
   ZOHO_SMTP_USER=you@cfidl.org
   ZOHO_SMTP_PASSWORD=your-app-specific-password
   ZOHO_NOTIFY_TO=info@cfidl.org
   ```
   > EU data centre → `smtp.zoho.eu`; India data centre → `smtp.zoho.in`.
   > Paid Zoho Workspace plans sometimes use `smtppro.zoho.com` instead —
   > check **Settings → Mail Accounts → POP/IMAP** in Zoho Mail if
   > `smtp.zoho.com` doesn't connect.
4. Test it: run `npm run dev`, submit the newsletter form in the footer, and
   confirm both the subscriber confirmation and the internal notification
   email arrive.

This route is the one part of the site that needs a live server rather than
a static file host — already handled by the Vercel adapter (see Deploy
below). For full mailing-list management later (unsubscribe links,
campaigns), Zoho Campaigns is the natural next step; this endpoint currently
just sends a one-off confirmation and an internal notification.

## Hero photography

`homePage.heroSlides` in Studio lets an editor upload 3–7 landscape photos
that crossfade behind the homepage hero text. Until real photography is
uploaded, the site falls back to a small set of placeholder photos of rural
Bangladesh sourced from Wikimedia Commons (freely licensed):

- *Bangladesh Village Landscape*, *A small village near the river*,
  *Beautiful Bangladesh River*, *Afternoon in the rural Bangladesh*,
  *Palmyra Palm Trees (Tal Gach)…*, *A Glimpse of Rural Life in Bangladesh* —
  via [Wikimedia Commons](https://commons.wikimedia.org), various CC
  licenses. Confirm each file's individual licence/attribution requirement
  before relying on it in production, or replace the set entirely with your
  own licensed photography (`FALLBACK_HERO_SLIDES` in
  `src/lib/sanity/queries.ts`).

## Deploy

The project is configured for **Vercel** out of the box:

1. Push this repo to GitHub and import it in Vercel.
2. Add every variable from `.env` in Vercel's Project Settings →
   Environment Variables.
3. Deploy. Vercel serves every page as static HTML except
   `/api/newsletter`, which runs as a serverless function.

**Using Netlify instead?** Swap the adapter:
```bash
npm uninstall @astrojs/vercel
npm install @astrojs/netlify
```
…and in `astro.config.mjs`, replace the `vercel` import/usage with
`netlify`. Add a Netlify equivalent of `vercel.json`'s rewrite (a
`_redirects` file with `/studio/* /studio 200`) so refreshing a deep Studio
URL doesn't 404.

## Before launch

- [ ] **Logo** — add a real logo in Site Settings; until then, the
      original placeholder mark (a marigold bloom) is used.
- [ ] **Hero photography** — replace the placeholder slideshow with
      licensed photos of CFIDL's own programme areas.
- [ ] **Org details** — email, phone, address, social links, in Site
      Settings.
- [ ] **Team, Press, Publications** — currently empty states; add real
      entries in Studio.
- [ ] **Privacy Statement / Disclaimer** — currently generic placeholder
      text (clearly flagged on each page); have real legal text reviewed
      before launch.
- [ ] **Impact figures** — the numbers shipped here are illustrative
      placeholders in the same format CFIDL will eventually publish;
      confirm and replace them with verified figures.
- [ ] **Map** — set `mapLatitude` / `mapLongitude` on the Contact Page in
      Studio to show an embedded map.

## Commands

```bash
npm run dev         # local dev server
npm run build        # production build (also used by your host)
npm run preview      # preview the production build locally
npm run typecheck    # full TypeScript check (astro check)
npm run format       # auto-format with Prettier
npm run sanity:deploy   # optional: deploy Studio to its own *.sanity.studio URL too
```
