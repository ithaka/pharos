import { useEffect, useState } from 'react';
import type { FC, ReactElement } from 'react';
import tokens from '@pharos/core/lib/styles/tokens.js';
import { colorGradient, gradientLabel, gradientContainer } from './ColorGradients.module.css';

interface Gradient {
  first: string | string[];
  second: string | string[];
}

interface ColorGradientsProps {
  gradients: Gradient[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedObject = (nestedObj: Record<string, any>, pathArr: string[]) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

const getColorName = (path: string[]) => {
  return path.length === 2
    ? path[path.length - 1]
    : path
        .slice(path.length - 2)
        .join(' ')
        .replace(/ base+$/g, '');
};

const ColorGradients: FC<ColorGradientsProps> = ({ gradients }) => {
  const [StateGradient, setStateGradient] = useState<ReactElement[] | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const colors: Record<string, any> = tokens.color;

  useEffect(() => {
    const gradientsToDisplay = gradients.map((gradient, index) => {
      const firstColor =
        typeof gradient.first === 'string'
          ? colors[gradient.first]
          : getNestedObject(colors, gradient.first);

      const secondColor =
        typeof gradient.second === 'string'
          ? colors[gradient.second]
          : getNestedObject(colors, gradient.second);

      const gradientStyle = {
        background: `linear-gradient(to bottom right, ${firstColor.value} 55%, ${secondColor.value}`,
        border:
          firstColor.value === '#ffffff' || secondColor.value === '#ffffff'
            ? '1px solid var(--pharos-color-marble-gray-80)'
            : 'none',
      };

      return (
        <figure key={index}>
          <div className={`${colorGradient}`} style={gradientStyle}></div>
          <figcaption className={`${gradientLabel}`}>
            <div>{`${getColorName(firstColor.path)} to ${getColorName(secondColor.path)}`}</div>
          </figcaption>
        </figure>
      );
    });

    setStateGradient(gradientsToDisplay);
  }, [colors, gradients]);

  const containerStyle = {
    gridTemplateColumns: `repeat(${gradients.length}, min-content)`,
    columnGap: 'var(--pharos-spacing-three-and-a-half-x)',
    justifyContent: 'space-between',
  };

  return (
    <div className={gradientContainer} style={containerStyle}>
      {StateGradient}
    </div>
  );
};

ColorGradients.defaultProps = {
  gradients: [],
};

export default ColorGradients;
