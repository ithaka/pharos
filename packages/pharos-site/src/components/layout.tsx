import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { WindowLocation } from '@reach/router';
import Sidenav from './Sidenav';
import Footer from './footer';
import { container, content, content___fill, main, topBar } from './layout.module.css';
import SEO from './seo';
import Fonts from './Fonts';

import '@ithaka/pharos/lib/styles/variables.css';
import '@ithaka/pharos/lib/styles/pharos-alert.css';
import '../../static/styles/global.scss';

const getPageName = (path: string) => {
  const name = path.replace(/-([a-z])/g, function (g) {
    return ' ' + g[1].toUpperCase();
  });

  return name.charAt(0).toUpperCase() + name.slice(1);
};

interface LayoutProps {
  location?: WindowLocation;
  fill?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, location, fill }) => {
  const path = location?.pathname.split('/');
  const pageName = path && getPageName(path[path.length - 1]);

  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  const [MainContent, setMainContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    const { PharosSidenavButton, PharosLink, PharosLayout } = Pharos;

    const body = (
      <main className={main}>
        <PharosLayout
          preset="1-col--sidenav"
          className={`${content} ${fill ? content___fill : ''}`}
        >
          <div slot="top" className={topBar}>
            <PharosSidenavButton />
            <PharosLink id="skip-link" skip href="#sidenav-skip-link">
              Skip to main navigation
            </PharosLink>
          </div>
          {children}
        </PharosLayout>
      </main>
    );

    setMainContent(body);
  }, [Pharos, children, fill]);

  return (
    <div className={container}>
      <Fonts />
      <SEO title={pageName || 'Home'} pathname={location?.pathname} />
      <Sidenav />
      {MainContent}
      <Footer />
    </div>
  );
};

export default Layout;
