import { html } from 'lit';
import type { TemplateResult } from 'lit';

import '../home.scss';
import { viewports, breakpoints } from '../../shared/viewports';
import { HeaderRevised } from '../../shared/wc/header-revised';
import { Footer } from '../../shared/wc/footer';
import { CollectionCard } from './collection-card';
import { HeroSearch } from './hero-search';
import { publicCollectionCards, communityCollectionCards } from '../mocks';
import { PharosSpacing7X } from '../../../styles/variables';

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

export const Home = {
  render: (): TemplateResult => html`
    <div class="home-page__container">
      ${HeaderRevised()}
      <main>
        <storybook-pharos-layout
          class="home-page__container--main-content"
          row-gap="${PharosSpacing7X}"
        >
          <div class="home-page__container--top" slot="top">
            <storybook-pharos-heading level="1" preset="7" no-margin class="home-page__heading"
              >Knowledge for everyone
            </storybook-pharos-heading>
            ${HeroSearch()}
          </div>
          <div
            class="home-page__hero"
            slot="top"
            style="background-image: url('./images/home/hero.jpg')"
          ></div>
          <storybook-pharos-link href="#" class="home-page__hero-link"
            >Tō kaidō gojo santsugi. Okazaki. Plate No 39. From the series: Fifty-three stations of
            the Tō kaidō Road, Kihei Sanoya, circa 1838.
          </storybook-pharos-link>
          ${publicCollectionCards.map(
            (card) =>
              html` <div class="home-page__collection-card--open">${CollectionCard(card)}</div>`
          )}
          <div class="home-page__container--access">
            <storybook-pharos-heading level="3" preset="5"
              >JSTOR provides free access to hundreds of thousands of articles, images and books.
              Log in through your institution or learn about your other options, including free
              onsite reading.
            </storybook-pharos-heading>
            <ul class="home-page__list--access">
              <li>
                <storybook-pharos-link href="#">Find my institution</storybook-pharos-link>
              </li>
              <li>
                <storybook-pharos-link href="#">Learn about JPASS</storybook-pharos-link>
              </li>
              <li>
                <storybook-pharos-link href="#">Learn more about access</storybook-pharos-link>
              </li>
            </ul>
          </div>
          ${communityCollectionCards.map(
            (card) =>
              html` <div class="home-page__collection-card--community">
                ${CollectionCard(card)}
              </div>`
          )}
        </storybook-pharos-layout>
      </main>
      ${Footer()}
    </div>
  `,
};
