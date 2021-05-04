import type { FC } from 'react';
import {
  textColor__dark,
  textColor,
  textSize__large,
  textSize,
  titleSize__large,
  titleSize,
} from './FontDisplay.module.css';

interface FontDisplayProps {
  font: string;
  title: string;
  dark: boolean;
  large: boolean;
  bold: boolean;
}

const FontDisplay: FC<FontDisplayProps> = ({ font, title, dark, large, bold }) => {
  return (
    <div
      style={{
        fontFamily: font,
        fontSize: large ? '2rem' : '1.5rem',
        fontWeight: bold ? 'bold' : 'normal',
        marginTop: '-0.5rem',
        padding: '1rem',
        backgroundColor: dark ? 'black' : 'transparent',
      }}
    >
      <div className={dark ? textColor__dark : textColor}>
        <div className={large ? textSize__large : textSize}>
          {title ? <div className={large ? titleSize__large : titleSize}>{title}</div> : null}
          <div>AaBbCcDdEeFfGgHhIiJjKkLlMm</div>
          <div>NnOoPpQqRrSsTtUuVvWwXxYyZz</div>
          <div>1234567890!@#$%^&*()+=?</div>
        </div>
      </div>
    </div>
  );
};

export default FontDisplay;
