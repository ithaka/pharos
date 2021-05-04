import type { FC } from 'react';
import { Helmet } from 'react-helmet';

const allFonts = [
  'GT-America-Standard-Medium-Italic',
  'GT-America-Standard-Medium',
  'GT-America-Standard-Regular-Italic',
  'GT-America-Standard-Regular',
  'IvarHeadline-Italic',
  'IvarHeadline-Medium',
  'IvarHeadline-MediumItalic',
  'IvarHeadline-Regular',
];

const Fonts: FC = () => (
  <Helmet>
    {allFonts.map((font, index) => (
      <link
        key={index}
        rel="preload"
        href={`https://static.ithaka.org/pharos/assets/fonts/${font}.woff2`}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    ))}
  </Helmet>
);

export default Fonts;
