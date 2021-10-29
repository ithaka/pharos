import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import Grid from '../Grid';
import {
  line__dont,
  line__do,
  icon__do,
  icon__dont,
  text__do,
  text__dont,
  container__practices,
  text__guideline,
} from './BestPractices.module.css';

interface BestPracticesProps {
  Do?: string | JSX.Element;
  Dont?: string | JSX.Element;
}

const BestPractices: FC<BestPracticesProps> = ({ Do, Dont }) => {
  const [Display, setDisplay] = useState<ReactElement | null>(null);

  useEffect(() => {
    (async () => {
      const { PharosIcon } = await import('@ithaka/pharos/lib/react-components/icon/pharos-icon');

      const content = (
        <Grid columns={2} hSpace={3} bottom={2}>
          <div>
            {Do ? (
              <>
                <hr className={line__do} />
                <div className={container__practices}>
                  <PharosIcon
                    name="checkmark"
                    description="Check mark"
                    className={icon__do}
                  ></PharosIcon>
                  <div>
                    <div className={text__do}>Dos</div>
                    <div className={text__guideline}>{Do}</div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
          <div>
            {Dont ? (
              <>
                <hr className={line__dont} />
                <div className={container__practices}>
                  <PharosIcon name="close" description="X" className={icon__dont}></PharosIcon>
                  <div>
                    <div className={text__dont}>Don&apos;ts</div>
                    <div className={text__guideline}> {Dont} </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </Grid>
      );
      setDisplay(content);
    })();
  }, [Dont, Do]);
  return Display;
};

export default BestPractices;
