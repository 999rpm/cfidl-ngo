import { sanityFetch } from './client';

/* ────────────────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────────────── */

export interface CtaButton {
  label: string;
  href: string;
  style?: 'primary' | 'secondary' | 'ghost';
}

export interface SanityImg {
  asset?: { _ref?: string; url?: string };
  alt?: string;
}

/** A single, already-resolved slideshow image (a plain URL, not a Sanity ref). */
export interface HeroSlide {
  src: string;
  alt: string;
}

export interface Seo {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: SanityImg;
}

export interface NavChild {
  label: string;
  href: string;
}
export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  x?: string;
  youtube?: string;
  instagram?: string;
}

export interface Partner {
  name: string;
  logo?: SanityImg;
  url?: string;
}

export interface SiteSettings {
  orgName: string;
  legalName?: string;
  tagline?: string;
  logo?: SanityImg;
  logoDark?: SanityImg;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: SocialLinks;
  newsletterHeading?: string;
  newsletterSubheading?: string;
  footerNote?: string;
  partners?: Partner[];
  defaultSeo?: Seo;
}

export interface HomePage {
  heroEyebrow?: string;
  heroHeadline: string;
  heroSubheadline?: string;
  heroCtas?: CtaButton[];
  /** Raw Sanity image refs from the CMS. Empty until an editor adds some —
   *  see FALLBACK_HERO_SLIDES below for the placeholder shown until then. */
  heroSlides?: SanityImg[];
  introEyebrow?: string;
  introHeading?: string;
  introBody?: string;
  introVideoId?: string;
  statsEyebrow?: string;
  statsHeading?: string;
  approachEyebrow?: string;
  approachHeading?: string;
  approachBody?: string;
  ctaHeading?: string;
  ctaBody?: string;
  ctaButtons?: CtaButton[];
  seo?: Seo;
}

export interface FocusArea {
  title: string;
  description: string;
}

export interface AboutPage {
  eyebrow?: string;
  heading: string;
  missionStatement?: string;
  body?: unknown[];
  focusAreas?: FocusArea[];
  teamHeading?: string;
  teamSubheading?: string;
  seo?: Seo;
}

export interface Stakeholder {
  icon: 'community' | 'business' | 'financier' | 'government';
  title: string;
  description: string;
}

export interface CircularStep {
  icon: 'collected' | 'treated' | 'soil' | 'reinvested';
  title: string;
  description: string;
}

export interface Sdg {
  number: number;
  title: string;
}

export interface ApproachPage {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  diamondHeading?: string;
  diamondIntro?: string;
  diamondStakeholders?: Stakeholder[];
  circularHeading?: string;
  circularIntro?: string;
  circularSteps?: CircularStep[];
  sdgIntro?: string;
  sdgs?: Sdg[];
  seo?: Seo;
}

export interface ContactPage {
  eyebrow?: string;
  heading: string;
  intro?: string;
  formSubjects?: string[];
  mapLatitude?: number;
  mapLongitude?: number;
  seo?: Seo;
}

export interface GetInvolvedWay {
  title: string;
  description: string;
  cta?: CtaButton;
}
export interface GetInvolvedPage {
  eyebrow?: string;
  heading: string;
  intro?: string;
  ways?: GetInvolvedWay[];
  seo?: Seo;
}

export interface Category {
  title: string;
  slug: { current: string };
}

export interface Post {
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImg;
  categories?: Category[];
  author?: string;
  publishedAt?: string;
  featured?: boolean;
  body?: unknown[];
  seo?: Seo;
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: SanityImg;
  bio?: string;
  email?: string;
  linkedin?: string;
}

export interface PressItem {
  title: string;
  source: string;
  date?: string;
  externalUrl?: string;
  thumbnail?: SanityImg;
}

export interface Publication {
  title: string;
  type: 'newsletter' | 'report' | 'factsheet' | 'toolkit';
  date?: string;
  coverImage?: SanityImg;
  fileUrl?: string;
  externalUrl?: string;
}

export interface SimplePage {
  title: string;
  slug: { current: string };
  body?: unknown[];
  seo?: Seo;
}

/* ────────────────────────────────────────────────────────────────────────
 * Fallback content
 * Shown until PUBLIC_SANITY_PROJECT_ID is set and this content is created
 * in Studio. Treat every value below as a placeholder — swap in CFIDL's
 * real figures, bios and copy from Sanity Studio before launch.
 * ────────────────────────────────────────────────────────────────────── */

export const FALLBACK_SITE_SETTINGS: SiteSettings = {
  orgName: 'CFIDL',
  legalName: 'Collective for Inclusive Development Ltd',
  tagline: 'Inclusive finance for safer sanitation in Bangladesh',
  email: 'info@cfidl.org',
  phone: '+880 XXXX XXXXXX',
  address: 'Dhaka, Bangladesh',
  socialLinks: { facebook: '#', linkedin: '#', x: '#', youtube: '#' },
  newsletterHeading: 'Stay up to date',
  newsletterSubheading: "One email a month. No spam, ever — you're free to unsubscribe any time.",
  footerNote: 'A registered not-for-profit working with communities, businesses and government.',
  partners: [],
  defaultSeo: {
    metaTitle: 'CFIDL — Inclusive finance for safer sanitation in Bangladesh',
    metaDescription:
      'CFIDL closes the safe sanitation gap in Bangladesh by connecting communities, businesses, financiers and government in one working market.',
  },
};

export const FALLBACK_NAVIGATION: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Who We Are', href: '/about' },
      { label: 'Our Approach', href: '/approach' },
      { label: 'Our Team', href: '/about#team' },
    ],
  },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Stories', href: '/stories' },
  { label: 'Media', href: '/media' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Placeholder hero slideshow, used until an editor uploads real photography
 * to the "Hero background slideshow" field on the Home Page in Studio.
 * Sourced from Wikimedia Commons (freely licensed) — see README for credits.
 */
export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bangladesh%20Village%20Landscape%20(36143248590).jpg?width=1920',
    alt: 'Aerial view of a green village and waterways in rural Bangladesh',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/A%20small%20village%20near%20the%20river.jpg?width=1920',
    alt: 'A small riverside village in Bangladesh',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Beautiful%20Bangladesh%20River%20-%2012.jpg?width=1920',
    alt: 'Boats on a river in rural Bangladesh',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Afternoon%20in%20the%20rural%20Bangladesh.jpg?width=1920',
    alt: 'Afternoon light over a rural Bangladeshi settlement',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Palmyra%20Palm%20Trees%20(Tal%20Gach)%20Lining%20a%20Verdant%20Field%20in%20Rural%20Bangladesh.jpg?width=1920',
    alt: 'Palm trees lining green fields in rural Bangladesh',
  },
  {
    src: 'https://commons.wikimedia.org/wiki/Special:FilePath/A%20Glimpse%20of%20Rural%20Life%20in%20Bangladesh.jpg?width=1920',
    alt: 'Everyday rural life in a Bangladeshi village',
  },
];

export const FALLBACK_HOME_PAGE: HomePage = {
  heroEyebrow: 'CFIDL in Bangladesh',
  heroHeadline: 'Bangladesh solved open defecation. Now comes the harder part.',
  heroSubheadline:
    'Roughly two in three households still lack a toilet that safely contains and treats waste. We connect communities, builders, lenders and regulators to close that gap — one household, one system, one district at a time.',
  heroCtas: [
    { label: 'See our impact', href: '/impact', style: 'primary' },
    { label: 'How we work', href: '/approach', style: 'secondary' },
  ],
  heroSlides: [],
  introEyebrow: 'Our focus',
  introHeading: 'Cities, sludge, systems',
  introBody:
    'We concentrate on (peri-)urban areas and faecal sludge management: making sure that what leaves a toilet is actually captured, transported and treated, instead of leaking into drains, ponds and fields untreated.',
  statsEyebrow: 'What we’ve achieved',
  statsHeading: 'Since 2020',
  approachEyebrow: 'How we work',
  approachHeading: 'The Diamond Model',
  approachBody:
    'Four groups, each essential, working the same problem from a different angle. Leave one out and the system stalls.',
  ctaHeading: "Let's build a sanitation market that works",
  ctaBody: 'Whether you fund, build, regulate or bank — there is a place for you in this system.',
  ctaButtons: [
    { label: 'Get involved', href: '/get-involved', style: 'primary' },
    { label: 'Contact us', href: '/contact', style: 'secondary' },
  ],
};

export const FALLBACK_ABOUT_PAGE: AboutPage = {
  eyebrow: 'Who we are',
  heading: 'A market that works, not a toilet built once',
  missionStatement:
    'Everyone deserves safe sanitation and clean water — and the fastest way to get there is by making the whole local market work, not by building toilets one at a time forever.',
  focusAreas: [
    {
      title: '(Peri-)urban sanitation',
      description:
        'Dense, fast-growing neighbourhoods where demand for safe toilets is highest and space for them is tightest.',
    },
    {
      title: 'Faecal sludge management',
      description:
        'Safe emptying, transport and treatment of waste — the step that decides whether progress on toilets actually protects public health.',
    },
  ],
  teamHeading: 'Meet the team',
  teamSubheading: 'The people coordinating CFIDL programmes on the ground in Bangladesh.',
};

export const FALLBACK_APPROACH_PAGE: ApproachPage = {
  eyebrow: 'Our approach',
  heading: 'One ecosystem, four levers',
  subheading:
    'We work both sides of the sanitation market at once — the households who need a toilet, and the businesses, lenders and regulators who make owning one possible.',
  diamondHeading: 'The Diamond Model',
  diamondIntro:
    'We call it the Diamond Model: four groups, each essential, working the same problem from a different angle. Leave one out and the system stalls.',
  diamondStakeholders: [
    {
      icon: 'community',
      title: 'Communities',
      description:
        'Households learn why a safe, durable toilet and good hygiene actually matter — until they want to invest in one themselves.',
    },
    {
      icon: 'business',
      title: 'Businesses',
      description:
        'Local entrepreneurs are trained to build toilets, and to turn collected waste into value within the circular sanitation economy.',
    },
    {
      icon: 'financier',
      title: 'Financiers',
      description:
        'Banks and microfinance institutions offer sanitation loans, opening access to a wider group of people — especially women.',
    },
    {
      icon: 'government',
      title: 'Governments',
      description:
        'Regulators set and enforce sanitation standards, and help grow the market through public-private partnerships.',
    },
  ],
  circularHeading: 'The Circular Sanitation Model',
  circularIntro:
    "Waste doesn't have to be waste. Handled right, it closes a loop that helps pay for the next round of toilets.",
  circularSteps: [
    {
      icon: 'collected',
      title: 'Collected safely',
      description:
        'Waste from the toilets we help build is safely stored and collected, avoiding methane released by poorly managed sludge.',
    },
    {
      icon: 'treated',
      title: 'Treated naturally',
      description:
        'Nature-based treatment, including vertical and horizontal wetland systems, turns waste into co-compost.',
    },
    {
      icon: 'soil',
      title: 'Returned to the soil',
      description:
        'Nitrogen-rich co-compost improves soil health and water retention — better harvests, more flood-resilient land.',
    },
    {
      icon: 'reinvested',
      title: 'Reinvested',
      description:
        'Higher yields mean higher farmer incomes — income that helps fund the next round of sanitation systems.',
    },
  ],
  sdgIntro: 'We contribute to the following Sustainable Development Goals:',
  sdgs: [
    { number: 5, title: 'Gender Equality' },
    { number: 6, title: 'Clean Water & Sanitation' },
    { number: 8, title: 'Decent Work & Economic Growth' },
    { number: 13, title: 'Climate Action' },
  ],
};

export const FALLBACK_CONTACT_PAGE: ContactPage = {
  eyebrow: 'Get in touch',
  heading: "Let's talk",
  intro:
    'Questions about our programmes, press enquiries, partnership ideas — this is the fastest way to reach us.',
  formSubjects: [
    'General enquiry',
    'Partnership / funding',
    'Press / media',
    'Careers',
    'Something else',
  ],
};

export const FALLBACK_GET_INVOLVED_PAGE: GetInvolvedPage = {
  eyebrow: 'Get involved',
  heading: "Let's build a sanitation market that works",
  intro: 'There is a place in this system for funders, businesses, lenders and researchers alike.',
  ways: [
    {
      title: 'Fund a programme',
      description:
        'Grants and blended finance let us reach the next district faster. Talk to us about current funding gaps.',
      cta: { label: 'Discuss funding', href: '/contact', style: 'primary' },
    },
    {
      title: 'Partner with us',
      description:
        'Financial institutions, sanitation businesses and local government all plug into the Diamond Model directly.',
      cta: { label: 'Explore partnership', href: '/contact', style: 'secondary' },
    },
    {
      title: 'Share your expertise',
      description:
        'Researchers and technical specialists in WASH, microfinance or circular economy — we want to hear from you.',
      cta: { label: 'Get in touch', href: '/contact', style: 'secondary' },
    },
  ],
};

export const FALLBACK_CATEGORIES: Category[] = [
  { title: 'Climate Resilience', slug: { current: 'climate-resilience' } },
  { title: 'Entrepreneurship', slug: { current: 'entrepreneurship' } },
  { title: 'Gender & Inclusion', slug: { current: 'gender-inclusion' } },
  { title: 'Events', slug: { current: 'events' } },
];

export const FALLBACK_POSTS: Post[] = [
  {
    title: "Meet the entrepreneurs building Bangladesh's sanitation economy",
    slug: { current: 'meet-the-entrepreneurs' },
    excerpt:
      'Placeholder story — replace with your own reporting in Sanity Studio. A look at how local masons and small businesses turn sanitation training into a livelihood.',
    categories: [FALLBACK_CATEGORIES[1]],
    author: 'CFIDL Team',
    publishedAt: '2026-05-01',
    featured: true,
  },
  {
    title: 'Inside a faecal sludge treatment plant',
    slug: { current: 'inside-a-treatment-plant' },
    excerpt:
      'Placeholder story — replace with your own reporting in Sanity Studio. Following waste from a household pit to safely treated co-compost.',
    categories: [FALLBACK_CATEGORIES[0]],
    author: 'CFIDL Team',
    publishedAt: '2026-04-10',
    featured: false,
  },
  {
    title: 'Why women-led sanitation businesses are changing the market',
    slug: { current: 'women-led-sanitation-businesses' },
    excerpt:
      'Placeholder story — replace with your own reporting in Sanity Studio. How financing designed for women is reshaping who builds and owns local toilets.',
    categories: [FALLBACK_CATEGORIES[2]],
    author: 'CFIDL Team',
    publishedAt: '2026-03-22',
    featured: false,
  },
];

export const FALLBACK_STATS_HEADLINE: Stat[] = [
  { value: 107140, label: 'sanitation systems built through our programmes' },
  { value: 497382, label: 'people leading healthier lives' },
  { value: 29, prefix: '€', suffix: 'M', label: 'mobilised in investment for safe sanitation' },
];

export const FALLBACK_STATS_SECONDARY: Stat[] = [
  { value: 1800, suffix: '+', label: 'entrepreneurs given technical & business training' },
  { value: 716290, label: 'working days of employment generated' },
  { value: 29724, suffix: ' tonnes', label: 'of faecal sludge safely treated' },
];

export const FALLBACK_TEAM_MEMBERS: TeamMember[] = [];
export const FALLBACK_PRESS_ITEMS: PressItem[] = [];
export const FALLBACK_PUBLICATIONS: Publication[] = [];

/* ────────────────────────────────────────────────────────────────────────
 * Queries
 * ────────────────────────────────────────────────────────────────────── */

export const getSiteSettings = () =>
  sanityFetch<SiteSettings>(
    `*[_type == "siteSettings"][0]{
      orgName, legalName, tagline, logo, logoDark, email, phone, address, socialLinks,
      newsletterHeading, newsletterSubheading, footerNote,
      partners[]{name, logo, url},
      defaultSeo
    }`,
    {},
    FALLBACK_SITE_SETTINGS,
  );

export const getNavigation = () =>
  sanityFetch<NavItem[]>(
    `*[_type == "navigation"][0].items[]{label, href, children[]{label, href}}`,
    {},
    FALLBACK_NAVIGATION,
  );

export const getHomePage = () =>
  sanityFetch<HomePage>(
    `*[_type == "homePage"][0]{
      heroEyebrow, heroHeadline, heroSubheadline, heroCtas,
      heroSlides[]{asset, alt},
      introEyebrow, introHeading, introBody, introVideoId,
      statsEyebrow, statsHeading,
      approachEyebrow, approachHeading, approachBody,
      ctaHeading, ctaBody, ctaButtons, seo
    }`,
    {},
    FALLBACK_HOME_PAGE,
  );

export const getAboutPage = () =>
  sanityFetch<AboutPage>(
    `*[_type == "aboutPage"][0]{
      eyebrow, heading, missionStatement, body, focusAreas, teamHeading, teamSubheading, seo
    }`,
    {},
    FALLBACK_ABOUT_PAGE,
  );

export const getApproachPage = () =>
  sanityFetch<ApproachPage>(
    `*[_type == "approachPage"][0]{
      eyebrow, heading, subheading,
      diamondHeading, diamondIntro, diamondStakeholders,
      circularHeading, circularIntro, circularSteps,
      sdgIntro, sdgs, seo
    }`,
    {},
    FALLBACK_APPROACH_PAGE,
  );

export const getContactPage = () =>
  sanityFetch<ContactPage>(
    `*[_type == "contactPage"][0]{ eyebrow, heading, intro, formSubjects, mapLatitude, mapLongitude, seo }`,
    {},
    FALLBACK_CONTACT_PAGE,
  );

export const getGetInvolvedPage = () =>
  sanityFetch<GetInvolvedPage>(
    `*[_type == "getInvolvedPage"][0]{ eyebrow, heading, intro, ways, seo }`,
    {},
    FALLBACK_GET_INVOLVED_PAGE,
  );

export const getAllCategories = () =>
  sanityFetch<Category[]>(
    `*[_type == "category"] | order(title asc){title, slug}`,
    {},
    FALLBACK_CATEGORIES,
  );

const postProjection = `{
  title, slug, excerpt, mainImage, author, publishedAt, featured, seo,
  "categories": categories[]->{title, slug}
}`;

export const getAllPosts = () =>
  sanityFetch<Post[]>(
    `*[_type == "post"] | order(publishedAt desc)${postProjection}`,
    {},
    FALLBACK_POSTS,
  );

export const getFeaturedPosts = (limit = 3) =>
  sanityFetch<Post[]>(
    `*[_type == "post"] | order(featured desc, publishedAt desc)[0...$limit]${postProjection}`,
    { limit },
    FALLBACK_POSTS.slice(0, limit),
  );

export const getPostBySlug = (slug: string) =>
  sanityFetch<Post | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      title, slug, excerpt, mainImage, author, publishedAt, featured, body, seo,
      "categories": categories[]->{title, slug}
    }`,
    { slug },
    FALLBACK_POSTS.find((p) => p.slug.current === slug) ?? null,
  );

export const getPostsByCategory = (categorySlug: string) =>
  sanityFetch<Post[]>(
    `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc)${postProjection}`,
    { categorySlug },
    FALLBACK_POSTS.filter((p) => p.categories?.some((c) => c.slug.current === categorySlug)),
  );

export const getStats = (group: 'headline' | 'secondary') =>
  sanityFetch<Stat[]>(
    `*[_type == "stat" && group == $group] | order(order asc){value, prefix, suffix, label}`,
    { group },
    group === 'headline' ? FALLBACK_STATS_HEADLINE : FALLBACK_STATS_SECONDARY,
  );

export const getTeamMembers = () =>
  sanityFetch<TeamMember[]>(
    `*[_type == "teamMember"] | order(order asc){name, role, photo, bio, email, linkedin}`,
    {},
    FALLBACK_TEAM_MEMBERS,
  );

export const getPressItems = () =>
  sanityFetch<PressItem[]>(
    `*[_type == "pressItem"] | order(date desc){title, source, date, externalUrl, thumbnail}`,
    {},
    FALLBACK_PRESS_ITEMS,
  );

export const getPublications = () =>
  sanityFetch<Publication[]>(
    `*[_type == "publication"] | order(date desc){
      title, type, date, coverImage, externalUrl, "fileUrl": file.asset->url
    }`,
    {},
    FALLBACK_PUBLICATIONS,
  );

export const getPageBySlug = (slug: string) =>
  sanityFetch<SimplePage | null>(
    `*[_type == "page" && slug.current == $slug][0]{title, slug, body, seo}`,
    { slug },
    null,
  );
