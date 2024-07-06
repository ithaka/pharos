import { FC, useState } from 'react';
import { TokenTable } from '../../components/statics/design-token/TokenTable';
import tokens from '@ithaka/pharos/lib/styles/tokens';
import { toTokenFormat } from '../../components/statics/design-token/toTokenFormat';
import PageSection from '../../components/statics/PageSection';

export const TransitionRow = (transition, widthRem, color, key) => {
  const [bgc, setBgc] = useState(color);
  const HandleMouseEnter = () => {
    setBgc('--pharos-color-jstor-red');
  };
  const HandleMouseLeave = () => {
    setBgc(color);
  };
  return (
    <tr key={key}>
      <td>{toTokenFormat(transition.name)}</td>
      <td>{transition.value}</td>
      <td>
        <div
          className="transition-example"
          style={{
            width: `${widthRem}rem`,
            transition: transition.value,
            background: `var(${bgc})`,
            height: '3rem',
          }}
          onMouseEnter={HandleMouseEnter}
          onMouseLeave={HandleMouseLeave}
        />
      </td>
    </tr>
  );
};
export const exampleRems = [1, 2, 5, 10, 20];
export const exampleColors = [
  '--pharos-color-living-coral-90',
  '--pharos-color-living-coral-80',
  '--pharos-color-glacier-blue-80',
  '--pharos-color-glacier-blue-40',
  '--pharos-color-night-blue-base',
];

const TransitionsPage: FC = () => {
  return (
    <PageSection title="Transitions" isHeader>
      <p>Hover over the colorful boxes to view the transitions.</p>
      <TokenTable>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Token</th>
            <th style={{ width: '40%' }}>Value</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          {TransitionRow(tokens.transition.base, 5, '--pharos-color-living-coral-80')}
          {Object.keys(tokens.transition.duration).map((key, i) =>
            TransitionRow(tokens.transition.duration[key], exampleRems[i], exampleColors[i], i)
          )}
        </tbody>
      </TokenTable>
    </PageSection>
  );
};
export default TransitionsPage;
