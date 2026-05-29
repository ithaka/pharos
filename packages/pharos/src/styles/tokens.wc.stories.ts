import { html, type TemplateResult } from 'lit';

import tokens from './tokens';

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
  return html`<code style="font-size:var(--pharos-font-size-small);"
    >$${text
      .replace(/([a-z])([A-Z]|[0-9])/g, '$1-$2')
      .replace(/([0-9])([a-z]|[A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z])/g, '$1-$2')
      .toLowerCase()}
  </code>`;
};

const ColorRow = (color: TokenEntry) => {
  let OGColorHtml = html``;
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
    OGColorHtml = html` <div>${OGColorToken}</div> `;
  }
  return html`
    <tr>
      <td style="width:50%">${toTokenFormat(color.name)}</td>
      <td style="width:25%">
        ${OGColorHtml}
        <div>${color.value}</div>
      </td>
      <td style="width:25%">
        <div class="color-example" style="background-color:${color.value};"></div>
      </td>
    </tr>
  `;
};

const TokenTable = (title: string, content: TemplateResult) => {
  return html`
    <div class="token-table-container">
      <h2>${title}</h2>
      <table class="token-table">
        ${content}
      </table>
      <br />
      <br />
    </div>
  `;
};

const UiColorTokens = () => html`
  ${TokenTable(
    'Alias color tokens',
    html`
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(tokens.color.interactive).map((color) =>
          ColorRow(color as unknown as TokenEntry)
        )}
        ${Object.values(tokens.color.ui).map((color) => ColorRow(color as unknown as TokenEntry))}
        ${ColorRow(tokens.color.disabled as unknown as TokenEntry)}
        ${ColorRow(tokens.color.overlay as unknown as TokenEntry)}
        ${Object.values(tokens.color.feedback).map((color) =>
          ColorRow(color as unknown as TokenEntry)
        )}
      </tbody>
    `
  )}
  ${TokenTable(
    'Text color tokens',
    html`
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(tokens.color.text).map((color) => ColorRow(color as unknown as TokenEntry))}
      </tbody>
    `
  )}
  ${TokenTable(
    'Interaction color tokens',
    html`
      <thead>
        <tr>
          <th>Token</th>
          <th>Value</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        ${ColorRow(tokens.color.focus as unknown as TokenEntry)}
        ${Object.values(tokens.color.hover).map((color) => ColorRow(color as unknown as TokenEntry))}
      </tbody>
    `
  )}
`;

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
  return html`
    ${TokenTable(
      'Primary colors',
      html`
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          ${colorTokens
            .filter((color) => color.group === 'primary')
            .map((color) => ColorRow(color))}
        </tbody>
      `
    )}
    ${TokenTable(
      'Secondary colors',
      html`
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          ${colorTokens
            .filter((color) => color.group === 'secondary')
            .map((color) => ColorRow(color))}
          ${ColorRow(tokens.color['marble-gray'].base as unknown as TokenEntry)}
        </tbody>
      `
    )}
    ${TokenTable(
      'Grayscale colors',
      html`
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          ${colorTokens
            .filter((color) => color.palette === 'grayscale')
            .map((color) => ColorRow(color))}
        </tbody>
      `
    )}
    ${TokenTable(
      'Tints',
      html`
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          ${colorTokens.filter((color) => color.group === 'tint').map((color) => ColorRow(color))}
        </tbody>
      `
    )}
    ${TokenTable(
      'Feedback color',
      html`
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          ${colorTokens
            .filter((color) => color.palette === 'feedback')
            .map((color) => ColorRow(color))}
        </tbody>
      `
    )}
  `;
};

export const GlobalColors = {
  render: () => GlobalColorTokens(),
};

const FontFamilyTokens = () => html`
  ${TokenTable(
    'Font family tokens',
    html`
      <thead>
        <tr>
          <th style="width:50%">Token</th>
          <th style="width:25%">Value</th>
          <th style="width:25%">Example</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(tokens.font.family).map((token) => {
          const currentToken = token as unknown as TokenEntry;
          return html`
            <tr>
              <td>${toTokenFormat(currentToken.name)}</td>
              <td>${currentToken.value}</td>
              <td>
                <div style="font-family:${currentToken.value as string};font-size:1.5rem;line-height: normal;">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </div>
                <div style="font-family:${currentToken.value as string};font-size:1.5rem;line-height: normal;">
                  abcdefghijklmnopqrstuvwxyz
                </div>
              </td>
            </tr>
          `;
        })}
      </tbody>
    `
  )}
`;

export const FontFamily = {
  render: () => FontFamilyTokens(),
};

const FontWeightTokens = () => html`
  ${TokenTable(
    'Font weight tokens',
    html`
      <thead>
        <tr>
          <th style="width:50%">Token</th>
          <th style="width:25%">Value</th>
          <th style="width:25%">Example</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(tokens.font.weight).map((token) => {
          const currentToken = token as unknown as TokenEntry;
          return html`
            <tr>
              <td>${toTokenFormat(currentToken.name)}</td>
              <td>${currentToken.value}</td>
              <td>
                <div style="font-weight:${currentToken.value};line-height: normal;">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </div>
                <div style="font-weight:${currentToken.value};line-height: normal;">
                  abcdefghijlkmnopqrstuvwxyz
                </div>
              </td>
            </tr>
          `;
        })}
      </tbody>
    `
  )}
`;

export const FontWeight = {
  render: () => FontWeightTokens(),
};

const FontSizeTokens = () => {
  const baseValue = String(tokens.font.size['base'].value);
  const basePixels = (tokens.type.scale as Record<string, TokenEntry>)[baseValue].comment as string;
  const basePx = Number(basePixels.substring(0, basePixels.length - 2));
  return html`
    ${TokenTable(
      'Font size tokens',
      html`
        <thead>
          <tr>
            <th style="width:50%">Token</th>
            <th style="width:25%">Value</th>
            <th style="width:25%">Example</th>
          </tr>
        </thead>
        <tbody>
          ${Object.values(tokens.font.size).map((token) => {
            const currentToken = token as unknown as TokenEntry;
            const tokenPixel = (tokens.type.scale as Record<string, TokenEntry>)[
              String(currentToken.value)
            ].comment as string;
            const tokenPx = Number(tokenPixel.substring(0, tokenPixel.length - 2));
            const tokenRem = tokenPx / basePx;
            return html`
              <tr>
                <td>${toTokenFormat(currentToken.name)}</td>
                <td>${tokenPx}px | ${tokenRem}rem</td>
                <td>
                  <div style="font-size:${tokenPixel};line-height: normal;">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  </div>
                  <div style="font-size:${tokenPixel};line-height: normal;">
                    abcdefghijklmnopqrstuvwxyz
                  </div>
                </td>
              </tr>
            `;
          })}
        </tbody>
      `
    )}
  `;
};

export const FontSize = {
  render: () => FontSizeTokens(),
};

const LineHeightToken = () => {
  const fontSizeMap = [12, 14, 16, 24, 32, 54, 16];
  return html`
    ${TokenTable(
      'Line height tokens',
      html`
        <thead>
          <tr>
            <th style="width:30%">Token</th>
            <th style="width:20%">Value</th>
            <th style="width:50%">Example</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(tokens['line-height'])
            .filter(([key]) => key !== 'brand' && key !== 'base')
            .map(([, token], i) => {
              const currentToken = token as unknown as TokenEntry;
              const tokenPixel = currentToken.comment;
              return html`
                <tr>
                  <td>${toTokenFormat(currentToken.name)}</td>
                  <td>
                    ${tokenPixel ? tokenPixel + ' | ' : ''}${currentToken.value}
                  </td>
                  <td>
                    <div
                      class="line-height-example"
                      style="line-height:${currentToken.value};font-size:${fontSizeMap[i]}px;${fontSizeMap[i] >= 24
                        ? 'font-family: var(--pharos-font-family-serif)'
                        : ''}"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </div>
                  </td>
                </tr>
              `;
            })}
        </tbody>
      `
    )}
  `;
};

export const LineHeight = {
  render: () => LineHeightToken(),
};

const SpacingTokens = () => html`
  ${TokenTable(
    'Spacing tokens',
    html`
      <thead>
        <tr>
          <th style="width:50%">Token</th>
          <th style="width:25%">Value</th>
          <th style="width:25%">Example</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(tokens.spacing)
          .filter(([key]) => key !== 'brand')
          .map(([, token]) => {
            const currentToken = token as unknown as TokenEntry;
            return html`
              <tr>
                <td>${toTokenFormat(currentToken.name)}</td>
                <td>${currentToken.comment} | ${currentToken.value}</td>
                <td>
                  <div class="spacing-example" style="height:${currentToken.value};"></div>
                </td>
              </tr>
            `;
          })}
      </tbody>
    `
  )}
`;

export const Spacing = {
  render: () => SpacingTokens(),
};

const RadiusTokens = () => html`
  ${TokenTable(
    'Border radius tokens',
    html`
      <thead>
        <tr>
          <th style="width:50%">Token</th>
          <th style="width:25%">Value</th>
          <th style="width:25%">Example</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(tokens.radius.base).map((token) => {
          const currentToken = token as unknown as TokenEntry;
          return html`
            <tr>
              <td>${toTokenFormat(currentToken.name)}</td>
              <td>${currentToken.comment} | ${currentToken.value}</td>
              <td>
                <div class="radius-example" style="border-radius:${currentToken.value};"></div>
              </td>
            </tr>
          `;
        })}
      </tbody>
    `
  )}
`;

export const Radius = {
  render: () => RadiusTokens(),
};

const TransitionRow = (transition: TokenEntry, widthRem: number, color: string) => {
  return html`
    <tr>
      <td>${toTokenFormat(transition.name)}</td>
      <td>${transition.value}</td>
      <td>
        <div
          class="transition-example"
          style="width:${widthRem}rem;transition:${transition.value};background:var(${color})"
          onmouseover='this.style.background="var(--pharos-color-jstor-red)"'
          onmouseout='this.style.background="var(${color})"'
        ></div>
      </td>
    </tr>
  `;
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
  return html`
    ${TokenTable(
      'Transition tokens',
      html`
        <thead>
          <tr>
            <th style="width:40%">Token</th>
            <th style="width:30%">Value</th>
            <th style="width:30%">Example (Hover)</th>
          </tr>
        </thead>
        <tbody>
          ${TransitionRow(tokens.transition.base as unknown as TokenEntry, 5, '--pharos-color-living-coral-80')}
          ${Object.values(tokens.transition.duration).map((transition, i) =>
            TransitionRow(transition as unknown as TokenEntry, exampleRems[i], exampleColors[i])
          )}
        </tbody>
      `
    )}
  `;
};

export const Transitions = {
  render: () => TransitionTokens(),
};

const TypeTokens = () => html`
  ${TokenTable(
    'Type scale tokens',
    html`
      <thead>
        <tr>
          <th style="width:30%">Token</th>
          <th style="width:15%">Value</th>
          <th style="width:20%">Sans-Serif</th>
          <th style="width:35%">Serif</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(tokens.type.scale).map((token) => {
          const currentToken = token as unknown as TokenEntry;
          const tokenComment = currentToken.comment as string;
          const tokenValue = Number(currentToken.value);
          return html`
            <tr>
              <td>${toTokenFormat(currentToken.name)}</td>
              <td>${tokenComment} | ${tokenComment.substring(0, tokenComment.length - 2) / 16}rem</td>
              <td>
                ${tokenValue < 10
                  ? html`<span class="token-type-sans-serif" style="font-size:${tokenComment};"
                      >GT America</span
                    >`
                  : html`<storybook-pharos-icon
                      name="dash-small"
                      a11y-hidden="true"
                    ></storybook-pharos-icon>`}
              </td>
              <td>
                ${tokenValue > 5
                  ? html`<span class="token-type-serif" style="font-size:${tokenComment};"
                      >Ivar Headline</span
                    >`
                  : html`<storybook-pharos-icon
                      name="dash-small"
                      a11y-hidden="true"
                    ></storybook-pharos-icon>`}
              </td>
            </tr>
          `;
        })}
      </tbody>
    `
  )}
`;

export const TypeScale = {
  render: () => TypeTokens(),
};

const ElevationTokens = () => html`
  ${TokenTable(
    'Elevation tokens',
    html`
      <thead>
        <tr>
          <th style="width:33%">Token</th>
          <th style="width:33%">Value</th>
          <th style="width:33%">Example</th>
        </tr>
      </thead>
      <tbody>
        ${Object.values(tokens.elevation.level).map((token) => {
          const currentToken = token as unknown as TokenEntry;
          return html`
            <tr>
              <td>${toTokenFormat(currentToken.name)}</td>
              <td>${currentToken.value}</td>
              <td>
                <div
                  class="elevation-example"
                  style="box-shadow:${currentToken.value as string};
                    width: 100%;height: 142px;flex-shrink: 0;border-radius: 5px;background: #FFF;"
                ></div>
              </td>
            </tr>
          `;
        })}
      </tbody>
    `
  )}
`;

export const Elevation = {
  render: () => ElevationTokens(),
};
