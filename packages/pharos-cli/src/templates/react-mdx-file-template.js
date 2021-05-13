const template = ({ componentName, titleCaseName }) => `
import { Meta, Canvas, ArgsTable, Story } from '@storybook/addon-docs/blocks';

import { Pharos${titleCaseName} } from '../../react-components/${componentName}/pharos-${componentName}';

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
