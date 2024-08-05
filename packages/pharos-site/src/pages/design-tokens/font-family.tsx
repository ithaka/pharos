import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';

const FontFamilyPage: FC = () => {
  return (
    <PageSection title="Font family" isHeader>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '33%' }}>Token</th>
            <th style={{ width: '33%' }}>Value</th>
            <th style={{ width: '36%' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.font.family).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.font.family[key].name)}</td>
              <td>{tokens.font.family[key].value}</td>
              <td>
                <div
                  style={{
                    fontFamily: tokens.font.family[key].value,
                    fontSize: '1.5rem',
                    lineHeight: 'normal',
                  }}
                >
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ
                </div>
                <div
                  style={{
                    fontFamily: tokens.font.family[key].value,
                    fontSize: '1.5rem',
                    lineHeight: 'normal',
                  }}
                >
                  abcdefghijklmnopqrstuvwxyz
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    </PageSection>
  );
};
export default FontFamilyPage;
