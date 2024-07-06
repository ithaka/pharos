import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';
import { FC } from 'react';

const FontWeightPage: FC = () => {
  return (
    <PageSection title="Font weight" isHeader>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Token</th>
            <th style={{ width: '30%' }}>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.font.weight).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.font.weight[key].name)}</td>
              <td>{tokens.font.weight[key].value}</td>
              <td>
                <div
                  style={{
                    fontWeight: tokens.font.weight[key].value,
                    lineHeight: 'normal',
                  }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </div>
                <div
                  style={{
                    fontWeight: tokens.font.weight[key].value,
                    lineHeight: 'normal',
                  }}
                >
                  abcdefghijlkmnopqrstuvwxyz
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    </PageSection>
  );
};
export default FontWeightPage;
