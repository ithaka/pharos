import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../home.scss';
import { viewports, breakpoints } from '../../shared/viewports';
import { HeaderRevised } from '../../shared/wc/header-revised';
import { Footer } from '../../shared/wc/footer';
import { CollectionCard } from './collection-card';
import { HeroSearch } from './hero-search';
import { publicCollectionCards, communityCollectionCards } from '../mocks';

import '../../../components/heading/pharos-heading';
import '../../../components/link/pharos-link';

export default {
  title: 'Pages/Home',
  parameters: {
    chromatic: { viewports: breakpoints },
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
};

export const Home = (): TemplateResult => html`
  <div class="home-page__container">
    ${HeaderRevised()}
    <main class="home-page__container--main-content">
      <div class="home-page__container--top">
        <pharos-heading level="1" preset="7" no-margin class="home-page__heading"
          >Knowledge for everyone</pharos-heading
        >
        ${HeroSearch()}
      </div>
      <div
        class="home-page__hero"
        style="background-image: url('./images/storybook/home/hero.jpg')"
      ></div>
      <div class="home-page__container--body">
        <pharos-link href="#" class="home-page__hero-link"
          >Tō kaidō gojo santsugi. Okazaki. Plate No 39. From the series: Fifty-three stations of
          the Tō kaidō Road, Kihei Sanoya, circa 1838.</pharos-link
        >
        ${publicCollectionCards.map(
          (card) =>
            html`<div class="home-page__collection-card--open">${CollectionCard(card)}</div>`
        )}
        <div class="home-page__container--access">
          <pharos-heading level="3" preset="5"
            >JSTOR provides free access to hundreds of thousands of articles, images and books. Log
            in through your institution or learn about your other options, including free onsite
            reading.</pharos-heading
          >
          <ul class="home-page__list--access">
            <li><pharos-link href="#">Find my institution</pharos-link></li>
            <li><pharos-link href="#">Learn about JPASS</pharos-link></li>
            <li><pharos-link href="#">Learn more about access</pharos-link></li>
          </ul>
        </div>
        ${communityCollectionCards.map(
          (card) =>
            html`<div class="home-page__collection-card--community">${CollectionCard(card)}</div>`
        )}
      </div>
    </main>
    ${Footer()}
  </div>
`;
