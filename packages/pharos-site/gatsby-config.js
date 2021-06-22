module.exports = {
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
  },
  siteMetadata: {
    title: `Pharos`,
    subtitle: `JSTOR's Design System`,
    description: `The Pharos design system is our guiding light toward creating cohesive, supportive, and beautiful experiences for the intellectually curious.`,
    author: `@jstor`,
    image: {
      path: '/images/pharos-artboard.jpg',
      height: '1400',
      width: '2704',
    },
    siteUrl: 'https://pharos.jstor.org',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
      options: {
        defaultLayouts: {
          pages: require.resolve(`./src/components/layout.tsx`),
        },
      },
    },
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
    `gatsby-plugin-remove-trailing-slashes`,
  ],
};
