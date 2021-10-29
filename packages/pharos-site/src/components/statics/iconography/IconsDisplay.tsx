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
  useEffect(() => {
    (async () => {
      const { PharosIcon } = await import('@ithaka/pharos/lib/react-components/icon/pharos-icon');
      const allPharosIcons = iconsToShow
        .filter((name) => iconsToShow.includes(name))
        .map((name, i) => {
          const displayName = name
            .replace('-', ' ')
            .replace(/\w\S*/g, (txt: string) => txt.toLowerCase());

          return (
            <div className={iconContainer} key={i}>
              <div className={icon}>
                <PharosIcon name={name} />
              </div>
              <div className={display__text}>{displayName}</div>
            </div>
          );
        });

      setStateIcon(allPharosIcons);
    })();
  }, [iconsToShow]);

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
