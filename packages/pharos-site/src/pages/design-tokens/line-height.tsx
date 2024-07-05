import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';

export const fontSizeMap = [12, 14, 16, 24, 32, 54, 16];

<PageSection title="Line height" isHeader>
  <TokenTable>
    <thead>
      <tr>
        <th style={{ width: '40%' }}>Token</th>
        <th style={{ width: '30%' }}>Value</th>
        <th>Example</th>
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
                  {key === 'heading-large'
                    ? 'Lorem ipsum dolor sit amet...'
                    : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'}
                </div>
              </td>
            </tr>
          );
        })}
    </tbody>
  </TokenTable>
</PageSection>;
