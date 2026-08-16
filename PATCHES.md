# Patches — apply these by hand

These are small, surgical edits to files I could only see in part (via
project search, not your live repo — see `SESSION_LOG.md` for why). Rather
than reconstruct and hand back whole files I might get subtly wrong, here's
exactly what to find and what to change.

Items 1–4 are from the first round (struck through below — skip them if
you already applied them; harmless to re-check if you're not sure). Item 5
is new this round.

---

## ~~1. `src/pages/stories/[slug].astro` — harden `getStaticPaths`~~

~~**Find:**~~
```ts
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ params: { slug: post.slug.current } }));
}
```
~~**Replace with:**~~
```ts
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.slug?.current)
    .map((post) => ({ params: { slug: post.slug.current } }));
}
```

## ~~2. `src/pages/stories/category/[category].astro` — same fix~~

~~**Find:**~~
```ts
export async function getStaticPaths() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    params: { category: cat.slug.current },
    props: { categoryTitle: cat.title },
  }));
}
```
~~**Replace with:**~~
```ts
export async function getStaticPaths() {
  const categories = await getAllCategories();
  return categories
    .filter((cat) => cat.slug?.current)
    .map((cat) => ({
      params: { category: cat.slug.current },
      props: { categoryTitle: cat.title },
    }));
}
```

**Why these two:** every other data access in this codebase is defensive —
`?? []`, `.filter(hasImage)`, optional chaining everywhere. These two
`getStaticPaths` functions are the one place that isn't. Sanity's Studio
normally blocks publishing a Story or Category without a slug, so this is
belt-and-suspenders rather than a guaranteed smoking gun — but it's cheap
and correct.

## ~~3. `src/pages/index.astro` — the "publish breaks the site" bug~~

~~Confirmed from a live error (`Cannot read properties of null (reading
'length')` in `Hero.astro`). `Astro.props` destructuring defaults
(`ctas = []`) only apply when a prop is `undefined` — Sanity's GROQ returns
`null` for an optional array field that was never touched on the document,
which skips the default and crashes on `.length`.~~

~~**Find:**~~
```astro
  <Hero
    eyebrow={home.heroEyebrow}
    headline={home.heroHeadline}
    subheadline={home.heroSubheadline}
    ctas={home.heroCtas}
    slides={heroSlides}
  />
```
~~**Replace with:**~~
```astro
  <Hero
    eyebrow={home.heroEyebrow}
    headline={home.heroHeadline}
    subheadline={home.heroSubheadline}
    ctas={home.heroCtas ?? []}
    slides={heroSlides}
  />
```

~~**Find:**~~
```astro
  <CtaBanner heading={home.ctaHeading ?? ''} body={home.ctaBody} buttons={home.ctaButtons} />
```
~~**Replace with:**~~
```astro
  <CtaBanner heading={home.ctaHeading ?? ''} body={home.ctaBody} buttons={home.ctaButtons ?? []} />
```

Not personally verified, but still worth watching for the identical
symptom: `getInvolvedPage.ways` (`get-involved.astro`) and
`contactPage.formSubjects` (passed into `ContactForm.astro`) — I still
haven't seen either file's full source, so I can't confirm whether they're
guarded the same way.

## ~~4. `src/pages/about.astro` — swap the sparkle icon~~

~~**Find:**~~
```astro
<Icon name="sparkle" class="text-marigold h-5 w-5" />
```
~~**Replace with:**~~
```astro
<Icon name="check" class="text-marigold h-5 w-5" />
```

~~This is inside the "Focus areas" cards. A sparkle/star glyph is one of
the most recognisable "AI-generated" visual shorthands right now, so I
swapped it for the plainer checkmark that's already in your icon set.~~

If you haven't applied this yet, **it's still open** — I couldn't confirm
either way from project search alone, so it's struck through only in the
sense that the instructions haven't changed since round 1, not because I
verified it's live. Same for items 1–3.

---

## 5. `src/components/layout/Header.astro` — swap two more `mist` backgrounds to white

New this round, part of bug #1 ("use white as the page background instead
of #F5D3C3"). `global.css` and `DiamondModel.astro` (delivered as full
files this round) handle the page body and the Diamond Model section —
these two spots in the header were the remaining large, full-width
`bg-mist` uses I found. Small accent uses of mist (badges, hover fills on
nav-dropdown links, the SDG pills on the Approach page) were left as-is —
mist is still one of your six brand colours, just no longer used at
page-background scale. Say the word if you'd rather see those go too.

**Find:**
```astro
  class="group data-[scrolled=true]:border-ink/[0.06] data-[scrolled=true]:bg-mist/90 data-[scrolled=true]:shadow-soft fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-300 data-[scrolled=true]:backdrop-blur-lg"
```
**Replace with:**
```astro
  class="group data-[scrolled=true]:border-ink/[0.06] data-[scrolled=true]:bg-white/90 data-[scrolled=true]:shadow-soft fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors duration-300 data-[scrolled=true]:backdrop-blur-lg"
```

**Find:**
```astro
    class="bg-mist fixed inset-0 top-[76px] z-40 hidden translate-y-[-8px] overflow-y-auto opacity-0 transition-all duration-300 ease-out data-[open=true]:flex data-[open=true]:translate-y-0 data-[open=true]:flex-col data-[open=true]:opacity-100 lg:hidden"
```
**Replace with:**
```astro
    class="bg-white fixed inset-0 top-[76px] z-40 hidden translate-y-[-8px] overflow-y-auto opacity-0 transition-all duration-300 ease-out data-[open=true]:flex data-[open=true]:translate-y-0 data-[open=true]:flex-col data-[open=true]:opacity-100 lg:hidden"
```

The second one is the mobile nav panel — worth applying together with the
`BaseLayout.astro` script-split fix (delivered as a full file this round)
since both touch the mobile menu; test them together after applying.
