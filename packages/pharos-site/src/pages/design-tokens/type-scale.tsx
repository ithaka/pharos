import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';
import { FC } from 'react';
import { PharosIcon } from '@ithaka/pharos/lib/react-components';

const TypeScalePage: FC = () => {
  return (
    <PageSection title="Type scale" isHeader>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Token</th>
            <th style={{ width: '20%' }}>Value</th>
            <th style={{ width: '25%' }}>Sans-Serif</th>
            <th>Serif</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(tokens.type.scale).map((key, index) => (
            <tr key={index}>
              <td>{toTokenFormat(tokens.type.scale[key].name)}</td>
              <td>
                {tokens.type.scale[key].comment} |{' '}
                {tokens.type.scale[key].comment.substring(
                  0,
                  tokens.type.scale[key].comment.length - 2
                ) / 16}
                rem
              </td>
              <td>
                {tokens.type.scale[key].value < 10 ? (
                  <span
                    className="token-type-sans-serif"
                    style={{ fontSize: tokens.type.scale[key].comment }}
                  >
                    GT America
                  </span>
                ) : (
                  <PharosIcon name="dash-small" a11yHidden="true"></PharosIcon>
                )}
              </td>
              <td>
                {tokens.type.scale[key].value > 5 ? (
                  <span
                    className="token-type-serif"
                    style={{
                      fontSize: tokens.type.scale[key].comment,
                      fontFamily: 'var(--pharos-font-family-serif)',
                      lineHeight: 'var(--pharos-line-height-heading-large)',
                    }}
                  >
                    Ivar Headline
                  </span>
                ) : (
                  <PharosIcon name="dash-small" a11yHidden="true"></PharosIcon>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
    </PageSection>
  );
};
export default TypeScalePage;
