const template = ({ titleCaseName, componentName }) => `
import { Story, Canvas, Meta, ArgsTable } from '@storybook/addon-docs/blocks';
import { html } from 'lit';
import './pharos-${componentName}';

<!-- Create this file!
import Intro from '@docs/guidelines/${componentName}.docs.mdx';

<Intro />
-->

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
