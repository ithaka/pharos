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
  const Pharos =
    typeof window !== `undefined` ? require('@ithaka/pharos/lib/react-components') : null;

  useEffect(() => {
    const { PharosIcon } = Pharos;

    const content = (
      <Grid columns={2} hSpace={3} bottom={2}>
        <div>
          {Do ? (
            <>
              <hr className={line__do} />
              <div className={container__practices}>
                <PharosIcon
                  name="checkmark"
                  a11yTitle="Check mark"
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
                <PharosIcon name="close" a11yTitle="X" className={icon__dont}></PharosIcon>
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
  }, [Pharos, Dont, Do]);
  return Display;
};

export default BestPractices;
