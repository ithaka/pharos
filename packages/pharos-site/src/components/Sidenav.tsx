import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import { withPrefix, useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

import handleLinkClick from '../utils/handleLinkClick';
import { toSlug } from '../utils/textConvert';
import { siteBrand__title, siteBrand__subTitle, sidenav } from './Sidenav.module.css';

interface SidenavProps {
  isOpen: boolean;
  showCloseButton?: boolean;
}

const Sidenav: FC<SidenavProps> = ({ isOpen, showCloseButton }) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;
  const location = useLocation();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          subtitle
        }
      }
    }
  `);

  useEffect(() => {
    const {
      PharosSidenav,
      PharosSidenavSection,
      PharosSidenavLink,
      PharosSidenavMenu,
      PharosLink,
    } = Pharos;

    const getLink = (pageName: string) => {
      return toSlug(pageName);
    };

    const createSidenavLink = (root: string, page: string, index: number) => {
      const url = `/${root}/${getLink(page)}`;
      return (
        <PharosSidenavLink
          key={index}
          href={url}
          isActive={location.pathname === withPrefix(url)}
          onClick={handleLinkClick}
        >
          {page}
        </PharosSidenavLink>
      );
    };

    const isExpanded = (root: string) => {
      return location.pathname.startsWith(withPrefix(`/${root}`));
    };

    const content = (
      <PharosSidenav
        mainContentId="skip-link"
        id="site-sidenav"
        open={isOpen}
        hasCloseButton={showCloseButton}
        className={sidenav}
      >
        <PharosLink href="/" slot="top" flex onClick={handleLinkClick}>
          <div>
            <div className={siteBrand__title}>{data.site.siteMetadata.title}</div>
            <div className={siteBrand__subTitle}>{data.site.siteMetadata.subtitle}</div>
          </div>
        </PharosLink>
        <PharosSidenavSection showDivider>
          <PharosSidenavLink
            href="/getting-started"
            isActive={location.pathname === withPrefix('/getting-started')}
            onClick={handleLinkClick}
          >
            Getting started
          </PharosSidenavLink>
          <PharosSidenavLink
            href="/help"
            isActive={location.pathname === withPrefix('/help')}
            onClick={handleLinkClick}
          >
            Help
          </PharosSidenavLink>
          <PharosSidenavLink
            href="/faqs"
            isActive={location.pathname === withPrefix('/faqs')}
            onClick={handleLinkClick}
          >
            FAQs
          </PharosSidenavLink>
          <PharosSidenavMenu label="Contributing" expanded={isExpanded('contributing')}>
            {['Documentation', 'Development'].map(createSidenavLink.bind(this, 'contributing'))}
          </PharosSidenavMenu>
          <PharosSidenavLink href="https://github.com/ithaka/pharos" target="_blank" external>
            GitHub
          </PharosSidenavLink>
          <PharosSidenavLink href="https://www.jstor.org/" target="_blank" external>
            JSTOR
          </PharosSidenavLink>
        </PharosSidenavSection>
        <PharosSidenavSection label="Brand Guidelines" showDivider>
          <PharosSidenavMenu label="Brand expressions" expanded={isExpanded('brand-expressions')}>
            {['Logos', 'Typography', 'Color', 'Imagery', 'Iconography', 'Elevation'].map(
              createSidenavLink.bind(this, 'brand-expressions')
            )}
          </PharosSidenavMenu>
          <PharosSidenavMenu
            label="Content style guide"
            expanded={isExpanded('content-style-guide')}
          >
            {['Voice and tone', 'Web elements', 'Grammar and style', 'Editing checklist'].map(
              createSidenavLink.bind(this, 'content-style-guide')
            )}
          </PharosSidenavMenu>
        </PharosSidenavSection>
        <PharosSidenavSection label="Design System">
          <PharosSidenavMenu label="Components" expanded={isExpanded('components')}>
            {[
              'Component status',
              'Alert',
              'Button',
              'Breadcrumb',
              'Checkbox',
              'Coach Mark',
              'Combobox',
              'Dropdown menu',
              'Dropdown menu nav',
              'Footer',
              'Header',
              'Heading',
              'Icon',
              'Image card',
              'Input group',
              'Layout',
              'Link',
              'Loading spinner',
              'Modal',
              'Multiselect dropdown',
              'Pagination',
              'Progress bar',
              'Radio button',
              'Select',
              'Sidenav',
              'Switch',
              'Tabs',
              'Toast',
              'Tooltip',
              'Text input',
              'Textarea',
              'Toggle button group',
            ].map(createSidenavLink.bind(this, 'components'))}
          </PharosSidenavMenu>
          <PharosSidenavMenu label="Design tokens" expanded={isExpanded('design-tokens')}>
            {[
              'Alias colors',
              'Global colors',
              'Font family',
              'Font size',
              'Font weight',
              'Line height',
              'Elevation',
              'Radius',
              'Spacing',
              'Transitions',
              'Type scale',
            ].map(createSidenavLink.bind(this, 'design-tokens'))}
          </PharosSidenavMenu>
          <PharosSidenavMenu label="Styles" expanded={isExpanded('styles')}>
            {['Type styles'].map(createSidenavLink.bind(this, 'styles'))}
          </PharosSidenavMenu>
        </PharosSidenavSection>
      </PharosSidenav>
    );

    setDisplay(content);
  }, [Pharos, data, location, isOpen, showCloseButton]);

  return Display;
};

export default Sidenav;
