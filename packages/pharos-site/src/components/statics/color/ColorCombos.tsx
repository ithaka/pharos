import type { FC, CSSProperties } from 'react';
import { colorBox } from './ColorCombos.module.css';
import tokens from '@ithaka/pharos/lib/styles/tokens.js';
import CrossOut from '../CrossOut';
import { toTitleCase } from '../../../utils/textConvert';

interface ColorCombosProps {
  colorNames: string[];
  crossout?: boolean;
}

const ColorCombos: FC<ColorCombosProps> = ({ colorNames, crossout }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: Record<string, any> = tokens.color;

  let width = '62px';
  switch (colorNames.length) {
    case 3:
      width = '54px';
      break;
    default:
      break;
  }

  const getStyle = (name: string) => {
    let returnValue = colors[name].value;
    if (!returnValue) {
      returnValue = colors[name].base.value;
    }

    if (!returnValue) {
      console.error(`Couldn't locate value for token color '${name}'`);
      return null;
    }

    const returnStyle: CSSProperties = {
      backgroundColor: returnValue,
    };
    if (name === 'White') returnStyle['boxShadow'] = 'inset 0 0 0 1px #EAE8E1';
    return returnStyle;
  };

  let textDisplay = '';
  colorNames.forEach(
    (name, i) => (textDisplay += `${name} ${i !== colorNames.length - 1 ? ' + ' : ''}`)
  );
  textDisplay = toTitleCase(textDisplay);

  return (
    <div>
      {crossout ? (
        <CrossOut>
          <div className={colorBox}>
            {colorNames.map((name) => {
              return <div key={name} style={{ height: '100%', width: width, ...getStyle(name) }} />;
            })}
          </div>
        </CrossOut>
      ) : (
        <div className={colorBox}>
          {colorNames.map((name) => {
            return <div key={name} style={{ height: '100%', width: width, ...getStyle(name) }} />;
          })}
        </div>
      )}
      {textDisplay}
    </div>
  );
};

export default ColorCombos;
