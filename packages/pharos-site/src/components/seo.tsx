/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SourceProps {
  description?: string;
  lang?: string;
  meta?: [];
  title: string;
  pathname?: string;
}

const SEO: FC<SourceProps> = ({ description, lang, title, pathname }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            subtitle
            description
            author
            image {
              path
              height
              width
            }
          }
        }
      }
    `
  );

  const siteUrl = site.siteMetadata.siteUrl;
  const metaDescription = description || site.siteMetadata.description;
  const pageTitle = `${title ? title + ' | ' : ''}${site.siteMetadata.title}: ${
    site.siteMetadata.subtitle
  }`;
  const imagePath = siteUrl + site.siteMetadata.image.path;
  const pagePath = pathname ? siteUrl + pathname : siteUrl;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
    >
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={pagePath} />

      <meta property="og:url" content={pagePath} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:image:height" content={site.siteMetadata.image.height} />
      <meta property="og:image:width" content={site.siteMetadata.image.width} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={site.siteMetadata.image} />
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

export default SEO;
