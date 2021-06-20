import * as fs from 'fs/promises';
import path from 'path';
import globby from 'globby';
import customElements from '../custom-elements.json';
import prettier from 'prettier';

const REACT_PROP_TYPE = 'DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>';

// Convert web component tag to React component name
const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

// Create prop interface using custom-elements.json
const createComponentInterface = (component, reactName) => {
  const item = customElements.tags.find((item) => item.name === component);
  const props =
    item.properties &&
    item.properties.map((property) => {
      const readonly =
        property.description && property.description.includes('@readonly') ? 'readonly ' : '';
      const optional =
        property.default || property.type.includes('undefined') || readonly ? '?' : '';

      return (
        `/**\n` +
        `* ${property.description || ''}\n` +
        `*/\n` +
        `${readonly}${property.name}${optional}: ${property.type};\n`
      );
    });

  const events =
    item.events &&
    item.events
      .filter((event) => event.name.startsWith('pharos'))
      .map((event) => {
        const name =
          event.name.charAt(0).toUpperCase() +
          event.name.slice(1).replace(/-([a-z])/g, function (g) {
            return '-' + g[1].toUpperCase();
          });

        return (
          `/**\n` +
          `* ${event.description || ''}\n` +
          `*/\n` +
          `'on${name}'?: (event: CustomEvent) => void;\n`
        );
      });

  return props || events
    ? `interface ${reactName}Props extends ${REACT_PROP_TYPE} {\n` +
        `${(props || []).join('')}` +
        `${(events || []).join('')}` +
        `}`
    : ``;
};

// Define default prop values using custom-elements.json
const createDefaultProps = (component, reactName) => {
  const item = customElements.tags.find((item) => item.name === component);
  const props =
    item.properties &&
    item.properties
      .filter((property) => property.default)
      .map((property) => {
        return `${property.name}: ${property.default},\n`;
      });
  return props ? `${reactName}.defaultProps = {\n` + `${props.join('')}` + `};` : ``;
};

// Import custom and package types for props
const importTypes = (file, filePath) => {
  const types = file.match(/(?<=export type\s+).*?(?=\s*;)/gs);
  if (types) {
    const typeNames = types.map((item) => item.split('=')[0].replace(/{/, '').replace(/}/, ''));
    return `import type { ${typeNames.join(', ')} } from ${filePath};`;
  }
  return '';
};

const setup = async () => {
  await fs.mkdir('./src/react-components', { recursive: true });
};

export const buildReact = async () => {
  for await (const componentPath of globby.stream(
    './src/components/**/pharos-!(*.css|*.test)*.ts'
  )) {
    const dest = componentPath.replace('/components/', '/react-components/').replace('.ts', '.tsx');
    const webComponentFilePath = componentPath.split('components/')[1].split('.ts')[0];
    const webComponentName = webComponentFilePath.split('/').pop();
    const reactComponentName = toCamelCase(
      webComponentName[0].toUpperCase() + webComponentName.substr(1)
    );
    const relativePath = `'../../components/${webComponentFilePath}'`;
    const reactInterface = createComponentInterface(webComponentName, reactComponentName);

    const component = await fs.readFile(componentPath, 'utf8');

    // Generate React component using our wrapper
    const reactComponent = `
          import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
          import createReactComponent from '../../utils/createReactComponent';
          import ${relativePath};

          ${importTypes(component, relativePath)}

          ${reactInterface}

          export const ${reactComponentName}: FC${
      reactInterface ? `<${reactComponentName}Props>` : `<${REACT_PROP_TYPE}>`
    } = createReactComponent('${webComponentName}');
          ${reactComponentName}.displayName = '${reactComponentName}';

          ${createDefaultProps(webComponentName, reactComponentName)}
        `;

    // Append React component export to index file
    await fs.appendFile(
      './src/react-components/index.ts',
      `export { ${reactComponentName} } from './${webComponentFilePath}';\n`,
      (err) => {
        if (err) throw err;
      }
    );

    const options = prettier.resolveConfig.sync(componentPath);
    options.parser = 'typescript';
    const formatted = prettier.format(reactComponent, options);
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, formatted, { flag: 'w' });
  }
};

setup();
buildReact();
