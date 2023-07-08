const template = ({ titleCaseName, componentName }) => `
import { Story, Canvas, Meta, ArgsTable } from '@storybook/blocks';
import { html } from 'lit';

<Meta
  title="Components/${titleCaseName}"
/>

# ${titleCaseName}

<Canvas>
  <Story name="Base">{html\` <pharos-${componentName}></pharos-${componentName}> \`}</Story>
</Canvas>

## API

<ArgsTable of="pharos-${componentName}" />

`;

module.exports = template;
