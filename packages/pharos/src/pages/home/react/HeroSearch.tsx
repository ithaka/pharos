import type { FC } from 'react';

import { PharosIcon } from '../../../react-components/icon/pharos-icon';

export const HeroSearch: FC = () => (
  <div className="home-page__container--input">
    <PharosIcon name="search" className="home-page__icon--search" a11yHidden="true"></PharosIcon>
    <input className="home-page__input" placeholder="Search JSTOR..." />
  </div>
);
