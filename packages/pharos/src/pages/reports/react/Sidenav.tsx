import type { FC } from 'react';

import { PharosSidenav } from '../../../react-components/sidenav/pharos-sidenav';
import { PharosLink } from '../../../react-components/link/pharos-link';
import { PharosSidenavSection } from '../../../react-components/sidenav/pharos-sidenav-section';
import { PharosSidenavLink } from '../../../react-components/sidenav/pharos-sidenav-link';
import { PharosSidenavMenu } from '../../../react-components/sidenav/pharos-sidenav-menu';
import logo from '@config/assets/images/jstor-logo-inverse.svg';

export const Sidenav: FC = () => (
  <PharosSidenav className="reports-page__sidenav" mainContentId="main-content">
    <PharosLink slot="top" href="/" id="jstor-logo">
      <img src={logo} alt="Pharos Home" width="72" height="100" />
    </PharosLink>
    <PharosSidenavSection>
      <PharosSidenavLink href="#">Home</PharosSidenavLink>
      <PharosSidenavMenu label="Reports" expanded>
        <PharosSidenavLink href="#" isActive>
          COUNTER 5
        </PharosSidenavLink>
        <PharosSidenavLink href="#">Books at JSTOR</PharosSidenavLink>
        <PharosSidenavLink href="#">COUNTER 4</PharosSidenavLink>
      </PharosSidenavMenu>
      <PharosSidenavLink href="#">Holdings</PharosSidenavLink>
      <PharosSidenavLink href="#">Access Methods</PharosSidenavLink>
      <PharosSidenavLink href="#">Account</PharosSidenavLink>
      <PharosSidenavLink href="#" target="_blank" external>
        Support
      </PharosSidenavLink>
      <PharosSidenavLink href="#" target="_blank" external>
        For Librarians
      </PharosSidenavLink>
    </PharosSidenavSection>
  </PharosSidenav>
);
