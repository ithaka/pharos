import type { FC } from 'react';
import type { PageProps } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage: FC<PageProps> = ({ location }) => (
  <Layout>
    <SEO title="404: Not found" pathname={location?.pathname} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;
