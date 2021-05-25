import { useState, useEffect } from 'react';
import type { FC, ReactElement } from 'react';
import Grid from '../Grid';
import {
  line_dont,
  line_do,
  icon__do,
  icon__dont,
  text_do,
  text_dont,
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
              <hr className={line_do} />
              <div className={container__practices}>
                <PharosIcon
                  name="checkmark"
                  description="Check mark"
                  className={icon__do}
                ></PharosIcon>
                <div>
                  <span className={text_do}>Dos</span>
                  <span className={text__guideline}>{Do}</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
        <div>
          {Dont ? (
            <>
              <hr className={line_dont} />
              <div className={container__practices}>
                <PharosIcon name="close" description="X" className={icon__dont}></PharosIcon>
                <div>
                  <span className={text_dont}>Don&apos;ts</span>
                  <span className={text__guideline}> {Dont} </span>
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
