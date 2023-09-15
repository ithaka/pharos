import type { Meta } from '@storybook/react';

import '../item-detail.scss';
import { viewports } from '../../shared/viewports';
import { HeaderRevised } from '../../shared/react/HeaderRevised';
import { Footer } from '../../shared/react/Footer';
import { ItemCarousel } from './item-carousel/ItemCarousel';
import { CollectionCarousel } from './collection-carousel/CollectionCarousel';
import { Metadata } from './Metadata';

import { PharosButton, PharosLink, PharosIcon, PharosLayout } from '../../../react-components';

export default {
  title: 'Pages/Item Detail',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports,
    },
  },
} as Meta;

export const ItemDetail = {
  render: () => (
    <div className="item-detail-page__container">
      <HeaderRevised showSearch={true} />
      <main>
        <PharosLayout
          preset="2-col"
          rows="max-content 1fr"
          className="item-detail-page__container--main-content"
        >
          <div className="item-detail-page__container--top" slot="top">
            <PharosLink href="#" className="item-detail-page__button--back" subtle flex>
              <PharosIcon
                name="arrow-left"
                style={{ marginRight: 'var(--pharos-spacing-one-quarter-x)' }}
              ></PharosIcon>
              Back to results
            </PharosLink>
            <PharosButton
              variant="subtle"
              icon="arrow-left"
              href="#"
              label="Back to results"
              className="item-detail-page__button--mobile-back"
            ></PharosButton>
            <div className="item-detail-page__container--action-buttons">
              <PharosButton variant="secondary" iconLeft="cite">
                Cite
              </PharosButton>
              <PharosButton variant="secondary" iconLeft="share">
                Share
              </PharosButton>
              <PharosButton variant="secondary" iconLeft="save">
                Save
              </PharosButton>
              <PharosButton variant="secondary" iconLeft="download">
                Download
              </PharosButton>
            </div>
            <div className="item-detail-page__container--mobile-buttons">
              <PharosButton variant="subtle" icon="cite" label="Cite"></PharosButton>
              <PharosButton variant="subtle" icon="share" label="Share"></PharosButton>
              <PharosButton variant="subtle" icon="save" label="Save"></PharosButton>
              <PharosButton variant="subtle" icon="download" label="Download"></PharosButton>
            </div>
          </div>
          <div className="item-detail-page__container--viewer"></div>
          <div className="item-detail-page__container--collections">
            <ItemCarousel />
            <CollectionCarousel />
          </div>
          <Metadata />
        </PharosLayout>
      </main>
      <Footer />
    </div>
  ),
};
