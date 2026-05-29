import { useState, type ReactNode } from 'react';

import tokens from './tokens';
import { PharosIcon } from '../react-components';

type TokenEntry = {
  name: string;
  value: string | number;
  original: { value: string };
  group?: string;
  palette?: string;
  comment?: string;
  [key: string]: unknown;
};

export default {
  title: 'Styles/Design Tokens',
  parameters: { options: { selectedPanel: 'addon-controls' } },
};

const toTokenFormat = (text: string) => {
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

const ColorRow = (color: TokenEntry) => {
  let OGColorHtml: ReactNode = null;
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
        <div className="color-example" style={{ backgroundColor: color.value as string }}></div>
      </td>
    </tr>
  );
};

const TokenTable = (title: string, content: ReactNode) => {
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
          {Object.values(tokens.color.interactive).map((color) =>
            ColorRow(color as unknown as TokenEntry)
          )}
          {Object.values(tokens.color.ui).map((color) => ColorRow(color as unknown as TokenEntry))}
          {ColorRow(tokens.color.disabled as unknown as TokenEntry)}
          {ColorRow(tokens.color.overlay as unknown as TokenEntry)}
          {Object.values(tokens.color.feedback).map((color) =>
            ColorRow(color as unknown as TokenEntry)
          )}
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
          {Object.values(tokens.color.text).map((color) => ColorRow(color as unknown as TokenEntry))}
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
          {ColorRow(tokens.color.focus as unknown as TokenEntry)}
          {Object.values(tokens.color.hover).map((color) => ColorRow(color as unknown as TokenEntry))}
        </tbody>
      </>
    )}
  </>
);

export const AliasColors = {
  render: () => UiColorTokens(),
};

const GlobalColorTokens = () => {
  const colorTokens: TokenEntry[] = [];
  Object.keys(tokens.color)
    .filter((key) => key !== 'brand' && key !== 'base')
    .forEach((key) => {
      const currentToken = (tokens.color as Record<string, unknown>)[key] as
        | TokenEntry
        | Record<string, unknown>;
      if ('value' in currentToken) {
        colorTokens.push(currentToken as TokenEntry);
      } else {
        Object.keys(currentToken).forEach((k) => {
          const nestedToken = (currentToken as Record<string, unknown>)[k] as TokenEntry;
          if (nestedToken.value) {
            colorTokens.push(nestedToken);
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
            {ColorRow(tokens.color['marble-gray'].base as unknown as TokenEntry)}
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
          {Object.values(tokens.font.family).map((token, index) => {
            const currentToken = token as unknown as TokenEntry;
            return (
              <tr key={index}>
                <td>{toTokenFormat(currentToken.name)}</td>
                <td>{currentToken.value}</td>
                <td>
                  <div
                    style={{
                      fontFamily: currentToken.value as string,
                      fontSize: '1.5rem',
                      lineHeight: 'normal',
                    }}
                  >
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  </div>
                  <div
                    style={{
                      fontFamily: currentToken.value as string,
                      fontSize: '1.5rem',
                      lineHeight: 'normal',
                    }}
                  >
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
          {Object.values(tokens.font.weight).map((token, index) => {
            const currentToken = token as unknown as TokenEntry;
            return (
              <tr key={index}>
                <td>{toTokenFormat(currentToken.name)}</td>
                <td>{currentToken.value}</td>
                <td>
                  <div
                    style={{
                      fontWeight: currentToken.value,
                      lineHeight: 'normal',
                    }}
                  >
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  </div>
                  <div
                    style={{
                      fontWeight: currentToken.value,
                      lineHeight: 'normal',
                    }}
                  >
                    abcdefghijlkmnopqrstuvwxyz
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

export const FontWeight = {
  render: () => FontWeightTokens(),
};

const FontSizeTokens = () => {
  const baseValue = String(tokens.font.size['base'].value);
  const basePixels = (tokens.type.scale as Record<string, TokenEntry>)[baseValue].comment as string;
  const basePx = Number(basePixels.substring(0, basePixels.length - 2));
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
            {Object.values(tokens.font.size).map((token, index) => {
              const currentToken = token as unknown as TokenEntry;
              const tokenPixel = (tokens.type.scale as Record<string, TokenEntry>)[
                String(currentToken.value)
              ].comment as string;
              const tokenPx = Number(tokenPixel.substring(0, tokenPixel.length - 2));
              const tokenRem = tokenPx / basePx;
              return (
                <tr key={index}>
                  <td>{toTokenFormat(currentToken.name)}</td>
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
            {Object.entries(tokens['line-height'])
              .filter(([key]) => key !== 'brand' && key !== 'base')
              .map(([, token], i) => {
                const currentToken = token as unknown as TokenEntry;
                const tokenPixel = currentToken.comment;
                return (
                  <tr key={i}>
                    <td>{toTokenFormat(currentToken.name)}</td>
                    <td>
                      {tokenPixel ? tokenPixel + ' | ' : ''}
                      {currentToken.value}
                    </td>
                    <td>
                      <div
                        className="line-height-example"
                        style={{
                          lineHeight: currentToken.value,
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
          {Object.entries(tokens.spacing)
            .filter(([key]) => key !== 'brand')
            .map(([, token], index) => {
              const currentToken = token as unknown as TokenEntry;
              return (
                <tr key={index}>
                  <td>{toTokenFormat(currentToken.name)}</td>
                  <td>
                    {currentToken.comment} | {currentToken.value}
                  </td>
                  <td>
                    <div className="spacing-example" style={{ height: currentToken.value }} />
                  </td>
                </tr>
              );
            })}
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
          {Object.values(tokens.radius.base).map((token, index) => {
            const currentToken = token as unknown as TokenEntry;
            return (
              <tr key={index}>
                <td>{toTokenFormat(currentToken.name)}</td>
                <td>
                  {currentToken.comment} | {currentToken.value}
                </td>
                <td>
                  <div className="radius-example" style={{ borderRadius: currentToken.value }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </>
    )}
  </>
);

export const Radius = {
  render: () => RadiusTokens(),
};

const TransitionRow = (transition: TokenEntry, widthRem: number, color: string) => {
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
            transition: transition.value as string,
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
            {TransitionRow(tokens.transition.base as unknown as TokenEntry, 5, '--pharos-color-living-coral-80')}
            {Object.values(tokens.transition.duration).map((transition, i) =>
              TransitionRow(transition as unknown as TokenEntry, exampleRems[i], exampleColors[i])
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
          {Object.values(tokens.type.scale).map((token, index) => {
            const currentToken = token as unknown as TokenEntry;
            const tokenComment = currentToken.comment as string;
            const tokenValue = Number(currentToken.value);
            return (
              <tr key={index}>
                <td>{toTokenFormat(currentToken.name)}</td>
                <td>
                  {tokenComment} | {Number(tokenComment.substring(0, tokenComment.length - 2)) / 16}
                  rem
                </td>
                <td>
                  {tokenValue < 10 ? (
                    <span className="token-type-sans-serif" style={{ fontSize: tokenComment }}>
                      GT America
                    </span>
                  ) : (
                    <PharosIcon name="dash-small" a11yHidden="true"></PharosIcon>
                  )}
                </td>
                <td>
                  {tokenValue > 5 ? (
                    <span className="token-type-serif" style={{ fontSize: tokenComment }}>
                      Ivar Headline
                    </span>
                  ) : (
                    <PharosIcon name="dash-small" a11yHidden="true"></PharosIcon>
                  )}
                </td>
              </tr>
            );
          })}
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
          {Object.values(tokens.elevation.level).map((token, index) => {
            const currentToken = token as unknown as TokenEntry;
            return (
              <tr key={index}>
                <td>{toTokenFormat(currentToken.name)}</td>
                <td>{currentToken.value}</td>
                <td>
                  <div
                    className="elevation-example"
                    style={{
                      boxShadow: currentToken.value as string,
                      width: '100%',
                      height: '142px',
                      flexShrink: 0,
                      borderRadius: '5px',
                      background: '#FFF',
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </>
    )}
  </>
);

export const Elevation = {
  render: () => ElevationTokens(),
};
