import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { ColorRow } from '../../components/statics/design-token/ColorRow';
import { ColorHead } from '../../components/statics/design-token/ColorHead';
import PageSection from '../../components/statics/PageSection';
import { FC } from 'react';

{
  /* TODO: doess this work? */
}
export let colorTokens = Object.keys(tokens.color)
  .filter((key) => key !== 'brand' && key !== 'base')
  .map((key) => {
    const currentToken = tokens.color[key];
    if (currentToken.value) {
      return currentToken;
    } else {
      let childTokens = [];
      Object.keys(currentToken).map((k) => {
        if (currentToken[k].value) {
          childTokens.push(currentToken[k]);
        }
      });
      return childTokens;
    }
  });

const GlobalColorsPage: FC = () => {
  return (
    <PageSection title="Global colors" isHeader>
      <TokenTable title="Primary colors">
        <ColorHead />
        <tbody>
          {colorTokens
            .filter((color) => color.group === 'primary')
            .map((color, i) => ColorRow(color, i))}
        </tbody>
      </TokenTable>
      <TokenTable title="Secondary colors">
        <ColorHead />
        <tbody>
          {colorTokens
            .filter((color) => color.group === 'secondary')
            .map((color, i) => ColorRow(color, i))}
          {ColorRow(tokens.color['Marble gray'].base)}
        </tbody>
      </TokenTable>
      <TokenTable title="Grayscale colors">
        <ColorHead />
        <tbody>
          {colorTokens
            .filter((color) => color.palette === 'grayscale')
            .map((color, i) => ColorRow(color, i))}
        </tbody>
      </TokenTable>
      <TokenTable title="Tints">
        <ColorHead />
        <tbody>
          {colorTokens
            .filter((color) => color.group === 'tint')
            .map((color, i) => ColorRow(color, i))}
        </tbody>
      </TokenTable>
      <TokenTable title="Feedback colors">
        <ColorHead />
        <tbody>
          {colorTokens
            .filter((color) => color.palette === 'feedback')
            .map((color, i) => ColorRow(color, i))}
        </tbody>
      </TokenTable>
    </PageSection>
  );
};
export default GlobalColorsPage;
