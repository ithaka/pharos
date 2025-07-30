import { useEffect, useState } from 'react';
import type { FC, ReactElement, CSSProperties } from 'react';
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

const HSL_RE =
  /hsla?\(\s*(\d+(?:\.\d+)?)(?:deg)?(?:\s*[,\s]\s*|\s+)(\d+(?:\.\d+)?)%\s*(?:[,\s]\s*|\s+)(\d+(?:\.\d+)?)%\s*(?:\/\s*([\d.]+))?\s*\)/i;

const HslToRgb = (hsl: string) => {
  const match = hsl.match(HSL_RE);
  if (!match) return [0, 0, 0];
  const [, hStr, sStr, lStr] = match;

  let h = parseInt(hStr);
  let s = parseFloat(sStr);
  let l = parseFloat(lStr);

  // normalise
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) [r, g] = [c, x];
  else if (h < 120) [r, g] = [x, c];
  else if (h < 180) [g, b] = [c, x];
  else if (h < 240) [g, b] = [x, c];
  else if (h < 300) [r, b] = [x, c];
  else [r, b] = [c, x];

  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
};

function RgbToHex(rgb: number[]) {
  const r = rgb[0].toString(16).padStart(2, '0');
  const g = rgb[1].toString(16).padStart(2, '0');
  const b = rgb[2].toString(16).padStart(2, '0');
  return `#${r}${g}${b}`.toUpperCase();
}

function RgbToCmyk(rgb: number[]) {
  let computedC = 0;
  let computedM = 0;
  let computedY = 0;
  let computedK = 0;

  const r = rgb[0];
  const g = rgb[1];
  const b = rgb[2];

  if (r == 0 && g == 0 && b == 0) {
    computedK = 1;
    return [0, 0, 0, 1];
  }

  computedC = 1 - r / 255;
  computedM = 1 - g / 255;
  computedY = 1 - b / 255;

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

      const RGB = HslToRgb(color.value);
      const Hex = RgbToHex(RGB);
      const CMYK = RgbToCmyk(RGB);

      return (
        <figure key={color.value} className={figure}>
          <div className={`${colorSwatch} ${large ? largeSwatch : ''}`} style={swatchStyle}></div>
          {noLabel ? null : (
            <figcaption className={`${colorLabel}`}>
              <div className={colorName}>
                {toTitleCase(name.replace(/ base+$/g, '').replace('-', ' '))}
              </div>
              <div>
                <strong>Hex</strong> - {Hex}
              </div>
              {!hexOnlyLabel ? (
                <>
                  <div>
                    <strong>HSL</strong> - {color.value}
                  </div>
                  <div>
                    <strong>RGB</strong> - r{RGB[0]} g{RGB[1]} b{RGB[2]}
                  </div>
                  <div>
                    <strong>CMYK</strong> - c{CMYK[0]} m{CMYK[1]} y{CMYK[2]} k{CMYK[3]}
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
