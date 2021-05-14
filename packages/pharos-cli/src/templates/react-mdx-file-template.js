const template = ({ componentName, titleCaseName }) => `
import { Meta, Canvas, ArgsTable, Story } from '@storybook/addon-docs';

import { Pharos${titleCaseName} } from '../../react-components/${componentName}/pharos-${componentName}';

<!-- Create this file!
import Intro from '@docs/guidelines/${componentName}.docs.mdx';

<Intro />
-->

<Meta
  title="Components/${titleCaseName}"
  parameters={{
    component: Pharos${titleCaseName},
  }}
/>

# ${titleCaseName}

<Canvas withToolbar>
  <Story
    name="Base"
  >
    <Pharos${titleCaseName} />
  </Story>
</Canvas>

## API

<ArgsTable of={Pharos${titleCaseName}} />
`;

module.exports = template;
