import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import {
  iconContainer,
  icon,
  display__text,
  icon__title,
  allIconContainer,
} from './IconsDisplay.module.css';

interface IconDisplayProps {
  title: string;
  iconsToShow: Array<string>;
  rows: number;
}

const Icons: FC<IconDisplayProps> = ({ title, iconsToShow, rows }) => {
  const [StateIcon, setStateIcon] = useState<ReactElement[] | null>(null);

  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosIcon } = Pharos;

    const allPharosIcons = iconsToShow
      .filter((name) => iconsToShow.includes(name))
      .map((name, i) => {
        const displayName = name
          .replace('-', ' ')
          .replace(/\w\S*/g, (txt: string) => txt.toLowerCase());

        return (
          <div className={iconContainer} key={i}>
            <div className={icon}>
              <PharosIcon name={name} a11yTitle={name} />
            </div>
            <div className={display__text}>{displayName}</div>
          </div>
        );
      });

    setStateIcon(allPharosIcons);
  }, [Pharos, iconsToShow]);

  return (
    <>
      <div className={icon__title}>
        <h3>{title}</h3>
      </div>
      <div className={allIconContainer} style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {StateIcon}
      </div>
    </>
  );
};

export default Icons;
