import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import type { WindowLocation } from '@reach/router';
import Sidenav from './Sidenav';
import Footer from './footer';
import { container, main, main___fill, content } from './layout.module.css';
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

  const [Button, setButton] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosSidenavButton } = Pharos;

    const content = <PharosSidenavButton />;

    setButton(content);
  }, [Pharos]);

  return (
    <div className={container}>
      <Fonts />
      <SEO title={pageName || 'Home'} />
      <Sidenav />
      <main className={`${main} ${fill ? main___fill : ''}`}>
        <div className={content}>
          {Button}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
