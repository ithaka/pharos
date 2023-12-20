import { useState } from 'react';

import tokens from './tokens.ts';
import { PharosIcon } from '../react-components';

export default {
  title: 'Styles/Design Tokens',
  parameters: { options: { selectedPanel: 'addon-controls' } },
};

const toTokenFormat = (text) => {
  return (
    <code style={{ fontSize: 'var(--pharos-font-size-small)' }}>
      {text
        .replace(/([a-z])([A-Z]|[0-9])/g, '$1-$2')
        .replace(/([0-9])([a-z]|[A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z])/g, '$1-$2')
        .toLowerCase()}
    </code>
  );
};

const ColorRow = (color) => {
  let OGColorHtml;
  if (color.original.value.startsWith('{color.')) {
    const OGColorToken =
      '$pharos-' +
      color.original.value
        .substring(1)
        .split('.')
        .slice(0, -1)
        .join('-')
        .replace(' ', '-')
        .toLowerCase();
    OGColorHtml = <div>{OGColorToken}</div>;
  }
  return (
    <tr>
      <td style={{ width: '50%' }}>{toTokenFormat(color.name)}</td>
      <td style={{ width: '25%' }}>
        {OGColorHtml}
        <div>{color.value}</div>
      </td>
      <td style={{ width: '25%' }}>
        <div className="color-example" style={{ backgroundColor: color.value }}></div>
      </td>
    </tr>
  );
};

const TokenTable = (title, content) => {
  return (
    <div className="token-table-container">
      <h2>{title}</h2>
      <table className="token-table">{content}</table>
      <br />
      <br />
    </div>
  );
};

const UiColorTokens = () => (
  <>
    {TokenTable(
      'Alias color tokens',
      <>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.color.interactive).map((key) =>
            ColorRow(tokens.color.interactive[key])
          )}
          {Object.keys(tokens.color.ui).map((key) => ColorRow(tokens.color.ui[key]))}
          {ColorRow(tokens.color.disabled)}
          {ColorRow(tokens.color.overlay)}
          {Object.keys(tokens.color.feedback).map((key) => ColorRow(tokens.color.feedback[key]))}
        </tbody>
      </>
    )}
    {TokenTable(
      'Text color tokens',
      <>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.color.text).map((key) => ColorRow(tokens.color.text[key]))}
        </tbody>
      </>
    )}
    {TokenTable(
      'Interaction color tokens',
      <>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {ColorRow(tokens.color.focus)}
          {Object.keys(tokens.color.hover).map((key) => ColorRow(tokens.color.hover[key]))}
        </tbody>
      </>
    )}
  </>
);

export const AliasColors = {
  render: () => UiColorTokens(),
};

const GlobalColorTokens = () => {
  let colorTokens = [];
  Object.keys(tokens.color)
    .filter((key) => key !== 'brand' && key !== 'base')
    .map((key) => {
      const currentToken = tokens.color[key];
      if (currentToken.value) {
        colorTokens.push(currentToken);
      } else {
        Object.keys(currentToken).map((k) => {
          if (currentToken[k].value) {
            colorTokens.push(currentToken[k]);
          }
        });
      }
    });
  return (
    <>
      {TokenTable(
        'Primary colors',
        <>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {colorTokens
              .filter((color) => color.group === 'primary')
              .map((color) => ColorRow(color))}
          </tbody>
        </>
      )}
      {TokenTable(
        'Secondary colors',
        <>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {colorTokens
              .filter((color) => color.group === 'secondary')
              .map((color) => ColorRow(color))}
            {ColorRow(tokens.color['Marble gray'].base)}
          </tbody>
        </>
      )}
      {TokenTable(
        'Grayscale colors',
        <>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {colorTokens
              .filter((color) => color.palette === 'grayscale')
              .map((color) => ColorRow(color))}
          </tbody>
        </>
      )}
      {TokenTable(
        'Tints',
        <>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {colorTokens.filter((color) => color.group === 'tint').map((color) => ColorRow(color))}
          </tbody>
        </>
      )}
      {TokenTable(
        'Feedback colors',
        <>
          <thead>
            <tr>
              <th>Token</th>
              <th>Value</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {colorTokens
              .filter((color) => color.palette === 'feedback')
              .map((color) => ColorRow(color))}
          </tbody>
        </>
      )}
    </>
  );
};

export const GlobalColors = {
  render: () => GlobalColorTokens(),
};

const FontFamilyTokens = () => (
  <>
    {TokenTable(
      'Font family tokens',
      <>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Token</th>
            <th style={{ width: '25%' }}>Value</th>
            <th style={{ width: '25%' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.font.family).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.font.family[key].name)}</td>
              <td>{tokens.font.family[key].value}</td>
              <td>
                <div
                  style={{
                    fontFamily: tokens.font.family[key].value,
                    fontSize: '1.5rem',
                    lineHeight: 'normal',
                  }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </div>
                <div
                  style={{
                    fontFamily: tokens.font.family[key].value,
                    fontSize: '1.5rem',
                    lineHeight: 'normal',
                  }}
                >
                  abcdefghijklmnopqrstuvwxyz
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )}
  </>
);

export const FontFamily = {
  render: () => FontFamilyTokens(),
};

const FontWeightTokens = () => (
  <>
    {TokenTable(
      'Font weight tokens',
      <>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Token</th>
            <th style={{ width: '25%' }}>Value</th>
            <th style={{ width: '25%' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.font.weight).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.font.weight[key].name)}</td>
              <td>{tokens.font.weight[key].value}</td>
              <td>
                <div
                  style={{
                    fontWeight: tokens.font.weight[key].value,
                    lineHeight: 'normal',
                  }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </div>
                <div
                  style={{
                    fontWeight: tokens.font.weight[key].value,
                    lineHeight: 'normal',
                  }}
                >
                  abcdefghijlkmnopqrstuvwxyz
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )}
  </>
);

export const FontWeight = {
  render: () => FontWeightTokens(),
};

const FontSizeTokens = () => {
  const baseValue = tokens.font.size['base'].value;
  const basePixels = tokens.type.scale[baseValue].comment;
  const basePx = basePixels.substring(0, basePixels.length - 2);
  return (
    <>
      {TokenTable(
        'Font size tokens',
        <>
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Token</th>
              <th style={{ width: '25%' }}>Value</th>
              <th style={{ width: '25%' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tokens.font.size).map((key, index) => {
              const tokenPixel = tokens.type.scale[tokens.font.size[key].value].comment;
              const tokenPx = tokenPixel.substring(0, tokenPixel.length - 2);
              const tokenRem = tokenPx / basePx;
              return (
                <tr key={index}>
                  <td>{toTokenFormat(tokens.font.size[key].name)}</td>
                  <td>
                    {tokenPx}px | {tokenRem}rem
                  </td>
                  <td>
                    <div style={{ fontSize: tokenPixel, lineHeight: 'normal' }}>
                      ABCDEFGHIJKLMNOPQRSTUVWXYZ
                    </div>
                    <div style={{ fontSize: tokenPixel, lineHeight: 'normal' }}>
                      abcdefghijklmnopqrstuvwxyz
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </>
  );
};

export const FontSize = {
  render: () => FontSizeTokens(),
};

const LineHeightToken = () => {
  const fontSizeMap = [12, 14, 16, 24, 32, 54, 16];
  return (
    <>
      {TokenTable(
        'Line height tokens',
        <>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Token</th>
              <th style={{ width: '20%' }}>Value</th>
              <th style={{ width: '50%' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tokens['line-height'])
              .filter((key) => key !== 'brand' && key !== 'base')
              .map((key, i) => {
                const tokenPixel = tokens['line-height'][key].comment;
                return (
                  <tr key={i}>
                    <td>{toTokenFormat(tokens['line-height'][key].name)}</td>
                    <td>
                      {tokenPixel ? tokenPixel + ' | ' : ''}
                      {tokens['line-height'][key].value}
                    </td>
                    <td>
                      <div
                        className="line-height-example"
                        style={{
                          lineHeight: tokens['line-height'][key].value,
                          fontSize: fontSizeMap[i],
                          fontFamily:
                            fontSizeMap[i] >= 24
                              ? 'var(--pharos-font-family-serif)'
                              : 'var(--pharos-font-family-sans-serif)',
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </>
      )}
    </>
  );
};

export const LineHeight = {
  render: () => LineHeightToken(),
};

const SpacingTokens = () => (
  <>
    {TokenTable(
      'Spacing tokens',
      <>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Token</th>
            <th style={{ width: '25%' }}>Value</th>
            <th style={{ width: '25%' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.spacing)
            .filter((key) => key !== 'brand')
            .map((key, index) => (
              <tr key={index}>
                <td>{toTokenFormat(tokens.spacing[key].name)}</td>
                <td>
                  {tokens.spacing[key].comment} | {tokens.spacing[key].value}
                </td>
                <td>
                  <div className="spacing-example" style={{ height: tokens.spacing[key].value }} />
                </td>
              </tr>
            ))}
        </tbody>
      </>
    )}
  </>
);

export const Spacing = {
  render: () => SpacingTokens(),
};

const RadiusTokens = () => (
  <>
    {TokenTable(
      'Border radius tokens',
      <>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>Token</th>
            <th style={{ width: '25%' }}>Value</th>
            <th style={{ width: '25%' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.radius.base).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.radius.base[key].name)}</td>
              <td>
                {tokens.radius.base[key].comment} | {tokens.radius.base[key].value}
              </td>
              <td>
                <div
                  className="radius-example"
                  style={{ borderRadius: tokens.radius.base[key].value }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )}
  </>
);

export const Radius = {
  render: () => RadiusTokens(),
};

const TransitionRow = (transition, widthRem, color) => {
  const [bgc, setBgc] = useState(color);
  const HandleMouseEnter = () => {
    setBgc('--pharos-color-jstor-red');
  };
  const HandleMouseLeave = () => {
    setBgc(color);
  };
  return (
    <tr>
      <td>{toTokenFormat(transition.name)}</td>
      <td>{transition.value}</td>
      <td>
        <div
          className="transition-example"
          style={{
            width: `${widthRem}rem`,
            transition: transition.value,
            background: `var(${bgc})`,
          }}
          onMouseEnter={HandleMouseEnter}
          onMouseLeave={HandleMouseLeave}
        />
      </td>
    </tr>
  );
};

const TransitionTokens = () => {
  const exampleRems = [1, 2, 5, 10, 20];
  const exampleColors = [
    '--pharos-color-living-coral-90',
    '--pharos-color-living-coral-80',
    '--pharos-color-glacier-blue-80',
    '--pharos-color-glacier-blue-40',
    '--pharos-color-night-blue-base',
  ];
  return (
    <>
      {TokenTable(
        'Transition tokens',
        <>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Token</th>
              <th style={{ width: '30%' }}>Value</th>
              <th style={{ width: '30%' }}>Example (Hover)</th>
            </tr>
          </thead>
          <tbody>
            {TransitionRow(tokens.transition.base, 5, '--pharos-color-living-coral-80')}
            {Object.keys(tokens.transition.duration).map((key, i) =>
              TransitionRow(tokens.transition.duration[key], exampleRems[i], exampleColors[i])
            )}
          </tbody>
        </>
      )}
    </>
  );
};

export const Transitions = {
  render: () => TransitionTokens(),
};

const TypeTokens = () => (
  <>
    {TokenTable(
      'Type scale tokens',
      <>
        <thead>
          <tr>
            <th style={{ width: '30%' }}>Token</th>
            <th style={{ width: '15%' }}>Value</th>
            <th style={{ width: '20%' }}>Sans-Serif</th>
            <th style={{ width: '35%' }}>Serif</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.type.scale).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.type.scale[key].name)}</td>
              <td>
                {tokens.type.scale[key].comment} |{' '}
                {tokens.type.scale[key].comment.substring(
                  0,
                  tokens.type.scale[key].comment.length - 2
                ) / 16}
                rem
              </td>
              <td>
                {tokens.type.scale[key].value < 10 ? (
                  <span
                    className="token-type-sans-serif"
                    style={{ fontSize: tokens.type.scale[key].comment }}
                  >
                    GT America
                  </span>
                ) : (
                  <PharosIcon name="dash-small"></PharosIcon>
                )}
              </td>
              <td>
                {tokens.type.scale[key].value > 5 ? (
                  <span
                    className="token-type-serif"
                    style={{ fontSize: tokens.type.scale[key].comment }}
                  >
                    Ivar Headline
                  </span>
                ) : (
                  <PharosIcon name="dash-small"></PharosIcon>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )}
  </>
);

export const TypeScale = {
  render: () => TypeTokens(),
};

const ElevationTokens = () => (
  <>
    {TokenTable(
      'Elevation tokens',
      <>
        <thead>
          <tr>
            <th style={{ width: '33%' }}>Token</th>
            <th style={{ width: '33%' }}>Value</th>
            <th style={{ width: '33%' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.elevation.level).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.elevation.level[key].name)}</td>
              <td>{tokens.elevation.level[key].value}</td>
              <td>
                <div
                  className="elevation-example"
                  style={{
                    boxShadow: tokens.elevation.level[key].value,
                    width: '100%',
                    height: '142px',
                    flexShrink: '0',
                    borderRadius: '5px',
                    background: '#FFF',
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </>
    )}
  </>
);

export const Elevation = {
  render: () => ElevationTokens(),
};
