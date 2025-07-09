import type { FC, CSSProperties } from 'react';
import { container, container_text } from './ColorTextSquares.module.css';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTitleCase } from '../../../utils/textConvert';

interface ColorTextSquaresProps {
  bgName: string;
  fgName: string;
  text?: string;
  showLabel?: boolean;
}

const ColorTextSquares: FC<ColorTextSquaresProps> = ({ bgName, fgName, text, showLabel }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: Record<string, any> = tokens.color;

  const getColor = (name: string) => {
    const normalizedName = name.replace(/ /g, '-').toLowerCase();

    let returnValue = colors[normalizedName]?.value;

    const splitName = name.split(' ');
    if (splitName.length === 3) {
      const color = colors[`${splitName[0]} ${splitName[1]}`.replace(/ /g, '-').toLowerCase()];
      returnValue = color[splitName[2]]?.value;
    }
    if (!returnValue) {
      returnValue = colors[normalizedName]?.base.value;
    }
    if (!returnValue) {
      console.error(`Couldn't locate value for token color '${name}'`);
      return null;
    }
    return returnValue;
  };

  const getBgStyle = (name: string) => {
    const returnStyle: CSSProperties = { backgroundColor: getColor(name) };
    if (name === 'White') returnStyle['boxShadow'] = 'inset 0 0 0 1px #EAE8E1';
    return returnStyle;
  };

  const getFgStyle = (name: string) => ({ color: getColor(name) });

  return (
    <div>
      <div style={getBgStyle(bgName)} className={container}>
        <span style={getFgStyle(fgName)} className={container_text}>
          {toTitleCase(text || fgName)}
        </span>
      </div>
      {showLabel ? (
        <div>
          <strong>Hex</strong> - {getColor(fgName).toUpperCase()}
        </div>
      ) : null}
    </div>
  );
};

export default ColorTextSquares;
