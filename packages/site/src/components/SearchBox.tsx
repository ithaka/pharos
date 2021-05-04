import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import { searchBox__container, searchBox__input, searchBox__icon } from './SearchBox.module.css';

const SearchBox: FC = () => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);
  const Pharos =
    typeof window !== `undefined` ? require('@pharos/core/lib/react-components') : null;

  useEffect(() => {
    const { PharosIcon } = Pharos;

    const content = (
      <div className={searchBox__container}>
        <input className={searchBox__input} placeholder="Search" />
        <div className={searchBox__icon}>
          <PharosIcon name="search" />
        </div>
      </div>
    );
    setDisplay(content);
  }, [Pharos]);

  return Display;
};

export default SearchBox;
