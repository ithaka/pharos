import type { Meta } from '@storybook/react';
import type { FC } from 'react';

import { viewports } from '../../shared/viewports';
import '../home.scss';
import { Footer } from '../../shared/react/Footer';
import { HeaderRevised } from '../../shared/react/HeaderRevised';
import { CollectionCard } from './CollectionCard';
import { HeroSearch } from './HeroSearch';
import { publicCollectionCards, communityCollectionCards } from '../mocks';

import { PharosHeading } from '../../../react-components/heading/pharos-heading';
import { PharosLink } from '../../../react-components/link/pharos-link';
import { PharosGrid } from '../../../react-components/grid/pharos-grid';

export default {
  title: 'Pages/Home',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
} as Meta;

export const Home: FC = () => (
  <div className="home-page__container">
    <HeaderRevised />
    <main>
      <PharosGrid className="home-page__container--main-content">
        <div className="home-page__container--top" slot="top">
          <PharosHeading level={1} preset="7" noMargin className="home-page__heading">
            Knowledge for everyone
          </PharosHeading>
          <HeroSearch />
        </div>
        <div
          className="home-page__hero"
          slot="top"
          style={{ backgroundImage: `url('./images/storybook/home/hero.jpg')` }}
        ></div>
        <PharosLink href="#" className="home-page__hero-link">
          Tō kaidō gojo santsugi. Okazaki. Plate No 39. From the series: Fifty-three stations of the
          Tō kaidō Road, Kihei Sanoya, circa 1838.
        </PharosLink>
        {publicCollectionCards.map((card, index) => (
          <div className="home-page__collection-card--open" key={index}>
            {CollectionCard(card)}
          </div>
        ))}
        <div className="home-page__container--access">
          <PharosHeading level={3} preset="5">
            JSTOR provides free access to hundreds of thousands of articles, images and books. Log
            in through your institution or learn about your other options, including free onsite
            reading.
          </PharosHeading>
          <ul className="home-page__list--access">
            <li>
              <PharosLink href="#">Find my institution</PharosLink>
            </li>
            <li>
              <PharosLink href="#">Learn about JPASS</PharosLink>
            </li>
            <li>
              <PharosLink href="#">Learn more about access</PharosLink>
            </li>
          </ul>
        </div>
        {communityCollectionCards.map((card, index) => (
          <div className="home-page__collection-card--community" key={index}>
            {CollectionCard(card)}
          </div>
        ))}
      </PharosGrid>
    </main>
    <Footer />
  </div>
);
