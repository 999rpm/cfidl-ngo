import type { StructureResolver } from 'sanity/structure';
import { CogIcon } from '@sanity/icons/Cog';
import { MenuIcon } from '@sanity/icons/Menu';

// Groups content into a friendly sidebar: singleton "pages" up top, then
// repeatable collections below. See https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Navigation')
        .icon(MenuIcon)
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.divider(),
      S.listItem()
        .title('Home Page')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('About Page')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem()
        .title('Approach Page')
        .child(S.document().schemaType('approachPage').documentId('approachPage')),
      S.listItem()
        .title('Get Involved Page')
        .child(S.document().schemaType('getInvolvedPage').documentId('getInvolvedPage')),
      S.listItem()
        .title('Contact Page')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.divider(),
      S.documentTypeListItem('post').title('Stories'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('stat').title('Impact Stats'),
      S.documentTypeListItem('teamMember').title('Team Members'),
      S.documentTypeListItem('pressItem').title('Press Items'),
      S.documentTypeListItem('publication').title('Publications'),
      S.documentTypeListItem('page').title('Simple Pages'),
    ]);
