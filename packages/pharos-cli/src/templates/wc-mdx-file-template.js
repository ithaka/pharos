const template = ({ titleCaseName, componentName }) => `
import { Story, Canvas, Meta, ArgsTable } from '@storybook/addon-docs';
import { html } from 'lit';
import './pharos-${componentName}';

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
