import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';
import { FC } from 'react';

export const baseValue = tokens.font.size['base'].value;
export const basePixels = tokens.type.scale[baseValue].comment;
export const basePx = basePixels.substring(0, basePixels.length - 2);

const FontSizePage: FC = () => {
  return (
    <PageSection title="Font size" isHeader>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Token</th>
            <th style={{ width: '30%' }}>Value</th>
            <th>Example</th>
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
      </TokenTable>
    </PageSection>
  );
};
export default FontSizePage;
