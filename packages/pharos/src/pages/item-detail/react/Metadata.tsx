import type { FC } from 'react';

import { item, metadata } from '../mocks';

import { PharosHeading } from '../../../react-components/heading/pharos-heading';
import logo from '@config/assets/images/item-detail/portal-logo.png';

export const Metadata: FC = () => (
  <div className="item-detail-page__container--metadata">
    <img src={logo} alt="portal logo" className="item-detail-page__image--collection" />
    <div className="item-detail-page__label--type">{item.type}</div>
    <PharosHeading level={1} preset="3" className="item-detail-page__heading--metadata">
      {item.title}
    </PharosHeading>
    <div className="item-detail-page__grid--metadata">
      {metadata.map((field, index) => (
        <div key={index}>
          <div className="item-detail-page__label--content">{field.label}</div>
          <span className="item-detail-page__text--metadata">{field.value}</span>
        </div>
      ))}
    </div>
  </div>
);
