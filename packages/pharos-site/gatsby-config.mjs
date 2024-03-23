import { createRequire } from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const config = {
  siteMetadata: {
    title: `Pharos`,
    subtitle: `JSTOR's Design System`,
    description: `The Pharos design system is our guiding light toward creating cohesive, supportive, and beautiful experiences for the intellectually curious.`,
    author: `@jstor`,
    image: {
      path: '/images/pharos-orb.png',
      height: '1000',
      width: '1700',
    },
    siteUrl: 'https://pharos.jstor.org',
  },
  trailingSlash: 'never',
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@components': `src/components/`,
          '@guidelines': `static/guidelines/`,
          '@images': `static/images/`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      extensions: [`.mdx`, `.md`],
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#990000`,
        theme_color: `#990000`,
        display: `minimal-ui`,
        icon: `static/images/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-WD42N5G`,
        routeChangeEventName: `pharos-page-change`,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
  ],
};

export default config;
