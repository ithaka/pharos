import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';
import { FC } from 'react';

const RadiusPage: FC = () => {
  return (
    <PageSection title="Radius" isHeader>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Token</th>
            <th style={{ width: '30%' }}>Value</th>
            <th>Example</th>
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
                  style={{
                    borderRadius: tokens.radius.base[key].value,
                    background: 'var(--pharos-color-living-coral-80)',
                    width: '2rem',
                    height: '2rem',
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
export default RadiusPage;
