import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { ColorRow } from '../../components/statics/design-token/ColorRow';
import { ColorHead } from '../../components/statics/design-token/ColorHead';
import PageSection from '../../components/statics/PageSection';

<PageSection title="Alias colors" isHeader>
  <TokenTable>
    <ColorHead />
    <tbody>
      {Object.keys(tokens.color.interactive).map((key, i) =>
        ColorRow(tokens.color.interactive[key], i)
      )}
      {Object.keys(tokens.color.ui).map((key, i) => ColorRow(tokens.color.ui[key], i))}
      {ColorRow(tokens.color.disabled)}
      {ColorRow(tokens.color.overlay)}
      {Object.keys(tokens.color.feedback).map((key, i) => ColorRow(tokens.color.feedback[key], i))}
    </tbody>
  </TokenTable>
  <TokenTable title="Text color">
    <ColorHead />
    <tbody>
      {Object.keys(tokens.color.text).map((key, i) => ColorRow(tokens.color.text[key], i))}
    </tbody>
  </TokenTable>
  <TokenTable title="Interaction color">
    <ColorHead />
    <tbody>
      {ColorRow(tokens.color.focus)}
      {Object.keys(tokens.color.hover).map((key, i) => ColorRow(tokens.color.hover[key], i))}
    </tbody>
  </TokenTable>
</PageSection>;
