import { useEffect, useRef, useState } from 'react';
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
import '@ithaka/pharos/lib/styles/pharos-modal.css';
import '@ithaka/pharos/lib/styles/pharos-footer.css';
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
  children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children, location, fill }) => {
  const path = location?.pathname.split('/');
  const pageName = path && getPageName(path[path.length - 1]);

  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  const [MainContent, setMainContent] = useState<ReactElement | null>(null);
  const mobileBreakpoint = 1055;
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < mobileBreakpoint);
  const [isSidenavDisplayed, setIsSidenavDisplayed] = useState<boolean>(!isMobile);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { PharosLink, PharosLayout, PharosButton } = Pharos;
    const currentRef = containerRef.current;
    const resizeObserver = new ResizeObserver(() => {
      const windowWidth = window.innerWidth;
      setIsSidenavDisplayed(windowWidth >= mobileBreakpoint);
      setIsMobile(windowWidth < mobileBreakpoint);
    });

    const body = (
      <>
        <Sidenav isOpen={isSidenavDisplayed} showCloseButton={isMobile} />
        <main className={main}>
          <div className={topBar}>
            <PharosLink id="skip-link" skip href="#sidenav-skip-link" isOnBackground>
              Skip to main navigation
            </PharosLink>
          </div>
          <PharosLayout preset="1-col--sidenav-comfy" rowGap={fill ? PharosSpacing5X : '0'}>
            <PharosButton
              variant="subtle"
              icon="menu"
              data-sidenav-id="site-sidenav"
              a11yLabel="Open side navigation"
              style={{
                display: isMobile ? 'block' : 'none',
                paddingTop: 'var(--pharos-spacing-2-x)',
              }}
            />
          </PharosLayout>
          <PharosLayout
            preset="1-col--sidenav-comfy"
            className={`${content} ${fill ? content___fill : ''}`}
            rowGap={fill ? PharosSpacing5X : '0'}
          >
            {fill ? children : <div className={page}>{children}</div>}
          </PharosLayout>
        </main>
      </>
    );

    setMainContent(body);

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, [Pharos, children, fill, isMobile, isSidenavDisplayed]);

  return (
    <div className={container} ref={containerRef}>
      <Fonts />
      <SEO title={pageName || 'Home'} pathname={location?.pathname} />
      {MainContent}
      <Footer />
    </div>
  );
};

export default Layout;
