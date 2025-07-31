import { useEffect, useState } from 'react';
import type { FC, ReactElement, CSSProperties } from 'react';
import { converter, parse, formatHex, formatHsl, formatRgb } from 'culori';

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

function toCMYK(color: string) {
  const toRgb = converter('rgb');
  const rgb = toRgb(color);

  if (!rgb) {
    throw new Error(`Invalid color format: ${color}`);
  }

  let computedC = 0;
  let computedM = 0;
  let computedY = 0;
  let computedK = 0;

  const r = rgb.r;
  const g = rgb.g;
  const b = rgb.b;

  if (r === 0 && g === 0 && b === 0) {
    return { mode: 'cmyk', c: 0, m: 0, y: 0, k: 1 };
  }

  computedC = 1 - r;
  computedM = 1 - g;
  computedY = 1 - b;

  const minCMY = Math.min(computedC, Math.min(computedM, computedY));
  computedC = Math.round(((computedC - minCMY) / (1 - minCMY)) * 100);
  computedM = Math.round(((computedM - minCMY) / (1 - minCMY)) * 100);
  computedY = Math.round(((computedY - minCMY) / (1 - minCMY)) * 100);
  computedK = Math.round(minCMY * 100);

  return { mode: 'cmyk', c: computedC, m: computedM, y: computedY, k: computedK };
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

      const colorObject = parse(color.value);
      const CMYK = toCMYK(color.value);

      if (!colorObject) {
        throw new Error(`Invalid color value: ${color.value}`);
      }

      return (
        <figure key={color.value} className={figure}>
          <div className={`${colorSwatch} ${large ? largeSwatch : ''}`} style={swatchStyle}></div>
          {noLabel ? null : (
            <figcaption className={`${colorLabel}`}>
              <div className={colorName}>
                {toTitleCase(name.replace(/ base+$/g, '').replace('-', ' '))}
              </div>
              <div>
                <strong>Hex</strong> - {formatHex(colorObject)}
              </div>
              {!hexOnlyLabel ? (
                <>
                  <div>
                    <strong>HSL</strong> - {formatHsl(colorObject)}
                  </div>
                  <div>
                    <strong>RGB</strong> - {formatRgb(colorObject)}
                  </div>
                  <div>
                    <strong>CMYK</strong> - cmyk({CMYK.c}% {CMYK.m}% {CMYK.y}% {CMYK.k}%)
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
