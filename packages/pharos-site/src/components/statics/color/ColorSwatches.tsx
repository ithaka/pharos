import { useEffect, useState } from 'react';
import type { FC, ReactElement, CSSProperties } from 'react';
import Color from 'colorjs.io';

import tokens from '@ithaka/pharos/lib/styles/tokens';
import {
  figure,
  colorSwatch,
  largeSwatch,
  colorLabel,
  colorName,
  colorsContainer,
} from './ColorSwatches.module.css';
import { toTitleCase } from '../../../utils/textConvert';

interface ColorSwatchesProps {
  filter: { key: string; value: string };
  noLabel?: boolean;
  hexOnlyLabel?: boolean;
  large?: boolean;
  colorsPerRow?: number;
  smallSpacing?: boolean;
}

const sortItems = (a: { order: number }, b: { order: number }) => {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
};

function toCMYK(color: Color) {
  const rgb = color.to('srgb');
  let computedC = 0;
  let computedM = 0;
  let computedY = 0;
  let computedK = 0;

  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;

  if (r === 0 && g === 0 && b === 0) {
    computedK = 1;
    return [0, 0, 0, 1];
  }

  computedC = 1 - r;
  computedM = 1 - g;
  computedY = 1 - b;

  const minCMY = Math.min(computedC, Math.min(computedM, computedY));
  computedC = Math.round(((computedC - minCMY) / (1 - minCMY)) * 100);
  computedM = Math.round(((computedM - minCMY) / (1 - minCMY)) * 100);
  computedY = Math.round(((computedY - minCMY) / (1 - minCMY)) * 100);
  computedK = Math.round(minCMY * 100);

  return [computedC, computedM, computedY, computedK];
}

const ColorSwatches: FC<ColorSwatchesProps> = ({
  filter,
  large = false,
  noLabel = false,
  hexOnlyLabel = false,
  colorsPerRow = 3,
  smallSpacing = false,
}) => {
  const [StateSwatch, setStateSwatch] = useState<ReactElement[] | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: Record<string, any> = tokens.color;

  useEffect(() => {
    const arr = Object.keys(colors)
      .filter((key) => key !== 'brand' && key !== 'base')
      .map((color) => {
        const isNested = !('value' in colors[color]);
        return isNested
          ? Object.keys(colors[color]).map((name) => colors[color][name])
          : colors[color];
      });

    const filtered = arr
      .flat()
      .sort(sortItems)
      .filter((item) => {
        const values = item?.[filter.key]?.split(', ');
        return values?.includes(filter.value);
      });

    const colorsToDisplay = filtered.map((color) => {
      const swatchStyle = {
        backgroundColor: color.value,
        border: color.value === '#ffffff' ? '1px solid var(--pharos-color-marble-gray-80)' : 'none',
      };

      const name =
        color.path.length === 2
          ? color.path[color.path.length - 1]
          : color.path.slice(color.path.length - 2).join(' ');

      const colorRepresentation = new Color(color.value);
      const rgb255Display = colorRepresentation.to('srgb').toString({
        format: {
          name: 'rgb',
          coords: ['<number>[0, 255]', '<number>[0, 255]', '<number>[0, 255]'],
        },
        precision: 2,
      });
      const CMYK = toCMYK(colorRepresentation);

      return (
        <figure key={color.value} className={figure}>
          <div className={`${colorSwatch} ${large ? largeSwatch : ''}`} style={swatchStyle}></div>
          {noLabel ? null : (
            <figcaption className={`${colorLabel}`}>
              <div className={colorName}>
                {toTitleCase(name.replace(/ base+$/g, '').replace('-', ' '))}
              </div>
              <div>
                <strong>Hex</strong> - {colorRepresentation.to('srgb').toString({ format: 'hex' })}
              </div>
              {!hexOnlyLabel ? (
                <>
                  <div>
                    <strong>HSL</strong> - {colorRepresentation.toString({ format: 'hsl' })}
                  </div>
                  <div>
                    <strong>RGB</strong> - {rgb255Display}
                  </div>
                  <div>
                    <strong>CMYK</strong> - cmyk({CMYK[0]}% {CMYK[1]}% {CMYK[2]}% {CMYK[3]}%)
                  </div>
                </>
              ) : null}
            </figcaption>
          )}
        </figure>
      );
    });

    setStateSwatch(colorsToDisplay);
  }, [colors, large, noLabel, hexOnlyLabel, filter]);

  let containerStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${colorsPerRow}, ${large ? 'min-content' : '0.25fr'})`,
  };

  if (large) {
    containerStyle = {
      ...containerStyle,
      columnGap: 'var(--pharos-spacing-5-x)',
    };
  }

  if (smallSpacing) {
    containerStyle = {
      ...containerStyle,
      columnGap: 'var(--pharos-spacing-one-and-a-half-x)',
    };
  }

  return (
    <div className={colorsContainer} style={containerStyle}>
      {StateSwatch}
    </div>
  );
};

export default ColorSwatches;
