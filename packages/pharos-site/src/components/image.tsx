import type { FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

/*
 * This component is built using `gatsby-plugin-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-plugin-image`: https://www.gatsbyjs.com/plugins/gatsby-plugin-image/
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Image: FC = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED, width: 300)
        }
      }
    }
  `);

  return <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt="astronaut" />;
};

export default Image;
