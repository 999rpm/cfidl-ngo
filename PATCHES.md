# Patches — apply these by hand

These are small, surgical edits to files I could only see in part (via
project search, not your live repo — see SESSION_LOG.md for why). Rather
than reconstruct and hand back whole files I might get subtly wrong, here's
exactly what to find and what to change.

---

## 1. `src/pages/stories/[slug].astro` — harden `getStaticPaths`

**Find:**
```ts
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ params: { slug: post.slug.current } }));
}
```

**Replace with:**
```ts
export async function getStaticPaths() {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.slug?.current)
    .map((post) => ({ params: { slug: post.slug.current } }));
}
```

## 2. `src/pages/stories/category/[category].astro` — same fix

**Find:**
```ts
export async function getStaticPaths() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({
    params: { category: cat.slug.current },
    props: { categoryTitle: cat.title },
  }));
}
```

**Replace with:**
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
`getStaticPaths` functions are the one place that isn't: they read
`post.slug.current` / `cat.slug.current` directly. Sanity's Studio normally
blocks publishing a Story or Category without a slug (it's a required
field), so this is a belt-and-suspenders fix rather than a guaranteed
smoking gun — but it's cheap, it's correct, and it closes the one real gap
I found. See SESSION_LOG.md for the full reasoning and the other two things
worth ruling out first.

## 3. `src/pages/index.astro` — the actual "publish breaks the site" bug

Confirmed from your live error (`Cannot read properties of null (reading
'length')` in `Hero.astro`). `Astro.props` destructuring defaults
(`ctas = []`) only apply when a prop is `undefined` — Sanity's GROQ returns
`null` for an optional array field that was never touched on the document,
which skips the default and crashes on `.length`. Two spots on the
homepage pass Sanity fields straight through without a guard; every other
optional array field in the codebase already uses `?? []` or a
`field && field.length` check.

**Find:**
```astro
  <Hero
    eyebrow={home.heroEyebrow}
    headline={home.heroHeadline}
    subheadline={home.heroSubheadline}
    ctas={home.heroCtas}
    slides={heroSlides}
  />
```
**Replace with:**
```astro
  <Hero
    eyebrow={home.heroEyebrow}
    headline={home.heroHeadline}
    subheadline={home.heroSubheadline}
    ctas={home.heroCtas ?? []}
    slides={heroSlides}
  />
```

**Find:**
```astro
  <CtaBanner heading={home.ctaHeading ?? ''} body={home.ctaBody} buttons={home.ctaButtons} />
```
**Replace with:**
```astro
  <CtaBanner heading={home.ctaHeading ?? ''} body={home.ctaBody} buttons={home.ctaButtons ?? []} />
```

`CtaBanner`'s crash hasn't happened yet only because Astro throws on the
first error it hits (Hero, above it in the file) — fix both at once.

Not personally verified, but worth watching for the identical symptom:
`getInvolvedPage.ways` (`get-involved.astro`) and `contactPage.formSubjects`
(passed into `ContactForm.astro`) — I never saw either file's full source,
so I can't confirm whether they're guarded the same way.

## 4. `src/pages/about.astro` — swap the sparkle icon

**Find:**
```astro
<Icon name="sparkle" class="text-marigold h-5 w-5" />
```

**Replace with:**
```astro
<Icon name="check" class="text-marigold h-5 w-5" />
```

This is inside the "Focus areas" cards. A sparkle/star glyph is one of the
most recognisable "AI-generated" visual shorthands right now, so I swapped
it for the plainer checkmark that's already in your icon set — no new icon
needed. Purely a style call; if you'd rather keep sparkle, just don't apply
this one.
