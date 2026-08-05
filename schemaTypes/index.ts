// Object types (reusable field groups — not directly editable as documents)
import seo from './objects/seo';
import socialLinks from './objects/socialLinks';
import ctaButton from './objects/ctaButton';
import stakeholder from './objects/stakeholder';
import circularStep from './objects/circularStep';
import blockContent from './objects/blockContent';

// Document types (editable content in the Studio)
import siteSettings from './documents/siteSettings';
import navigation from './documents/navigation';
import homePage from './documents/homePage';
import aboutPage from './documents/aboutPage';
import approachPage from './documents/approachPage';
import contactPage from './documents/contactPage';
import getInvolvedPage from './documents/getInvolvedPage';
import page from './documents/page';
import post from './documents/post';
import category from './documents/category';
import stat from './documents/stat';
import teamMember from './documents/teamMember';
import pressItem from './documents/pressItem';
import publication from './documents/publication';

export const schemaTypes = [
  // objects
  seo,
  socialLinks,
  ctaButton,
  stakeholder,
  circularStep,
  blockContent,
  // documents
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  approachPage,
  contactPage,
  getInvolvedPage,
  page,
  post,
  category,
  stat,
  teamMember,
  pressItem,
  publication,
];

// Document type names that should only ever have a single instance
// (used by the Studio structure to hide "create new" for singletons).
export const singletonTypes = new Set([
  'siteSettings',
  'navigation',
  'homePage',
  'aboutPage',
  'approachPage',
  'contactPage',
  'getInvolvedPage',
]);
