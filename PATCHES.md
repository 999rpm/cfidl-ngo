# Patches — status

Rounds 1 and 2 gave these as small, surgical find/replace edits because
those sessions only had partial visibility into your repo (project
knowledge search, not the full source). **Round 3 had the complete,
current contents of every file pasted directly into the conversation**, so
I could check each item against the real thing instead of trusting that it
had been applied. All five are confirmed live in the code you shared.

---

## ✅ 1. `src/pages/stories/[slug].astro` — harden `getStaticPaths`

**VERIFIED APPLIED.** The file filters on `post.slug?.current` before
mapping, exactly as specified below.

<details>
<summary>What this patch was</summary>

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

</details>

## ✅ 2. `src/pages/stories/category/[category].astro` — same fix

**VERIFIED APPLIED.** Same `.filter(...)` guard present before the map.

<details>
<summary>What this patch was</summary>

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

</details>

**Why these two mattered:** every other data access in this codebase is
defensive — `?? []`, `.filter(hasImage)`, optional chaining everywhere.
These two `getStaticPaths` functions were the one place that wasn't.

## ✅ 3. `src/pages/index.astro` — the "publish breaks the site" bug

**VERIFIED APPLIED.** Both `ctas={home.heroCtas ?? []}` and
`buttons={home.ctaButtons ?? []}` are present.

<details>
<summary>What this patch was</summary>

Root-caused to a live error (`Cannot read properties of null (reading
'length')` in `Hero.astro:83`): `Astro.props` destructuring defaults
(`ctas = []`) only catch `undefined`, but GROQ returns `null` for an
optional array field left untouched on a document.

**Find:**

```astro
ctas={home.heroCtas}
```

**Replace with:**

```astro
ctas={home.heroCtas ?? []}
```

**Find:**

```astro
<CtaBanner heading={home.ctaHeading ?? ''} body={home.ctaBody} buttons={home.ctaButtons} />
```

**Replace with:**

```astro
<CtaBanner heading={home.ctaHeading ?? ''} body={home.ctaBody} buttons={home.ctaButtons ?? []} />
```

</details>

## ✅ 4. `src/pages/about.astro` — swap the sparkle icon

**VERIFIED APPLIED.** Focus-area cards render `<Icon name="check" .../>`.

<details>
<summary>What this patch was</summary>

**Find:** `<Icon name="sparkle" class="text-marigold h-5 w-5" />`
**Replace with:** `<Icon name="check" class="text-marigold h-5 w-5" />`

A sparkle/star glyph is one of the more recognisable "AI-generated
landing page" visual shorthands, so it was swapped for the plainer
checkmark already in the icon set. (Round 3 found three more `sparkle`
uses this patch didn't cover — see `SESSION_LOG.md`, Round 3, "AI-tell
cleanup, continued.")
</details>

## ✅ 5. `src/components/layout/Header.astro` — two `mist` → `white` swaps

**VERIFIED APPLIED as of the Round 2 delivery.** Note: `Header.astro` has
since been **fully replaced again in Round 3** for the hamburger-menu
containing-block fix — that new full file still contains both `bg-white`
swaps below, so nothing here regressed, but this patch's specific
find/replace text no longer matches the current file (the surrounding
markup changed shape). Treat this item as historical; if you need to
re-apply anything to `Header.astro`, use the Round 3 full file instead of
this patch.

<details>
<summary>What this patch was</summary>

Part of "use white as the page background instead of #F5D3C3."

**Find:**

```astro
class="group data-[scrolled=true]:border-ink/[0.06] data-[scrolled=true]:bg-mist/90
data-[scrolled=true]:shadow-soft fixed inset-x-0 top-0 z-50 border-b border-transparent
transition-colors duration-300 data-[scrolled=true]:backdrop-blur-lg"
```

**Replace with:**

```astro
class="group data-[scrolled=true]:border-ink/[0.06] data-[scrolled=true]:bg-white/90
data-[scrolled=true]:shadow-soft fixed inset-x-0 top-0 z-50 border-b border-transparent
transition-colors duration-300 data-[scrolled=true]:backdrop-blur-lg"
```

**Find:**

```astro
class="bg-mist fixed inset-0 top-[76px] z-40 hidden translate-y-[-8px] overflow-y-auto opacity-0
transition-all duration-300 ease-out data-[open=true]:flex data-[open=true]:translate-y-0
data-[open=true]:flex-col data-[open=true]:opacity-100 lg:hidden"
```

**Replace with:**

```astro
class="bg-white fixed inset-0 top-[76px] z-40 hidden translate-y-[-8px] overflow-y-auto opacity-0
transition-all duration-300 ease-out data-[open=true]:flex data-[open=true]:translate-y-0
data-[open=true]:flex-col data-[open=true]:opacity-100 lg:hidden"
```

</details>

---

## Round 3 — why there are no new numbered patches here

Every change in Round 3 is delivered as a **full file**, not a patch —
listed in `SESSION_LOG.md` under "Delivered in Round 3." That's a
deliberate change, not an oversight: patches existed specifically because
Rounds 1–2 only had partial visibility into your repo (project knowledge
search returns excerpts, not guaranteed-complete files), so a targeted
find/replace was the lowest-risk way to change a file without risking
silently dropping code that was never seen. Round 3 had the complete,
current contents of the whole repository pasted directly into the
conversation, so that constraint no longer applies — every file below was
checked and rewritten against its real, full content, and you can replace
each one wholesale with no find/replace step needed:

`Header.astro`, `nav.ts`, `favicon.svg`, `Icon.astro`, `ContactForm.astro`,
`get-involved.astro`, `StoryCard.astro`, `getInvolvedPage.ts`,
`queries.ts`, `env.d.ts`, `PortableText.astro`, `package.json`.

If a future session goes back to partial visibility (e.g. picking this up
in a fresh chat without re-pasting the full repo), it's reasonable for
this file to start accumulating numbered patches again — same rule as
before applies: full files only for what's been seen in full, patches for
everything else.
