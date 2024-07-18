import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import '../../../static/styles/global.scss';
import PageSection from '../../components/statics/PageSection';
import { FC } from 'react';

const SpacingPage: FC = () => {
  return (
    <PageSection title="Spacing" isHeader>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Token</th>
            <th style={{ width: '30%' }}>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.spacing)
            .filter((key) => key !== 'gutter')
            .map((key, index) => (
              <tr key={index}>
                <td>{toTokenFormat(tokens.spacing[key].name)}</td>
                <td>
                  {tokens.spacing[key].comment} | {tokens.spacing[key].value}
                </td>
                <td>
                  <div
                    style={{
                      height: tokens.spacing[key].value,
                      background: 'var(--pharos-color-living-coral-80)',
                      width: '100%',
                      display: 'inline-block',
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </TokenTable>
    </PageSection>
  );
};
export default SpacingPage;
