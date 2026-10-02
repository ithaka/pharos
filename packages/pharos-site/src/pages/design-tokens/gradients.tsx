import type { FC } from 'react';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { TokenTable } from '../../components/statics/design-token/TokenTable';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';
import { gradientText } from './gradients.module.css';

const GradientsPage: FC = () => (
  <PageSection title="Gradients" isHeader>
    {Object.entries(tokens.gradient).map(([group, gradients]) => (
      <TokenTable key={group} title={`${group === 'subdued' ? 'Subdued' : 'Saturated'} gradients`}>
        <thead>
          <tr>
            <th>Token</th>
            <th>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(gradients).map((token) => (
            <tr key={token.name}>
              <td>{toTokenFormat(token.name)}</td>
              <td>{token.value}</td>
              <td>
                <div style={{ backgroundImage: token.value, width: '12rem', height: '5rem' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    ))}
    <p>Use a gradient as a background image rather than a color or background-color value:</p>
    <pre>
      <code>{`.gradient-background {
  background-image: var(
    --pharos-gradient-subdued-cyan-blue,
    linear-gradient(var(--pharos-color-night-blue-base), var(--pharos-color-night-blue-base))
  );
}`}</code>
    </pre>
    <p>
      The fallback uses the existing Night Blue token when the gradient token is unavailable. For
      text, clip the background to the glyphs and retain a solid color when clipping is unsupported:
    </p>
    <p className={gradientText}>Discover knowledge with JSTOR</p>
    <pre>
      <code>{`.gradient-text {
  color: var(--pharos-color-night-blue-base);
}

@supports (background-clip: text) {
  .gradient-text {
    background-image: var(
      --pharos-gradient-subdued-cyan-blue,
      linear-gradient(var(--pharos-color-night-blue-base), var(--pharos-color-night-blue-base))
    );
    background-clip: text;
    color: transparent;
  }
}

@media (forced-colors: active) {
  .gradient-text {
    background-image: none;
    color: CanvasText;
  }
}`}</code>
    </pre>
    <p>
      These tokens are also available as Sass variables and JavaScript exports through the existing
      Pharos styles entry points. Applying a gradient to an icon requires an SVG or masking
      technique; it cannot be assigned directly to color or fill.
    </p>
  </PageSection>
);

export default GradientsPage;
