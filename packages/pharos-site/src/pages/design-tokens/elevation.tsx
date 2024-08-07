import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import '../../../static/styles/global.scss';
import PageSection from '../../components/statics/PageSection';
import { FC } from 'react';

const ElevationPage: FC = () => {
  return (
    <PageSection title="Elevation" isHeader>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Token</th>
            <th style={{ width: '30%' }}>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.elevation.level)
            .filter((key) => key !== 'gutter')
            .map((key, index) => (
              <tr key={index}>
                <td>{toTokenFormat(tokens.elevation.level[key].name)}</td>
                <td>{tokens.elevation.level[key].value}</td>
                <td>
                  <div
                    style={{
                      boxShadow: tokens.elevation.level[key].value,
                      background: '#FFFFF',
                      width: '201px',
                      height: '142px',
                      display: 'inline-block',
                      borderRadius: '2px',
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
export default ElevationPage;
