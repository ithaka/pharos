import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { WindowLocation } from '@reach/router';
import Sidenav from './Sidenav';
import Footer from './footer';
import { container, content, content___fill, main, topBar, page } from './layout.module.css';
import SEO from './seo';
import Fonts from './Fonts';
import { PharosSpacing5X } from '@ithaka/pharos/lib/styles/variables';

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

  const [MainContent, setMainContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    (async () => {
      const { PharosSidenavButton } = await import(
        '@ithaka/pharos/lib/react-components/sidenav/pharos-sidenav-button'
      );
      const { PharosLink } = await import('@ithaka/pharos/lib/react-components/link/pharos-link');
      const { PharosLayout } = await import(
        '@ithaka/pharos/lib/react-components/layout/pharos-layout'
      );

      const body = (
        <main className={main}>
          <div className={topBar}>
            <PharosSidenavButton onBackground />
            <PharosLink id="skip-link" skip href="#sidenav-skip-link" onBackground>
              Skip to main navigation
            </PharosLink>
          </div>
          <PharosLayout
            preset="1-col--sidenav-comfy"
            className={`${content} ${fill ? content___fill : ''}`}
            rowGap={fill ? PharosSpacing5X : '0'}
          >
            {fill ? children : <div className={page}>{children}</div>}
          </PharosLayout>
        </main>
      );

      setMainContent(body);
    })();
  }, [children, fill]);

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
