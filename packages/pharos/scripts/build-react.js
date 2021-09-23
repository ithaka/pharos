import * as fs from 'fs/promises';
import path from 'path';
import { globbyStream } from 'globby';
import customElementsManifest from '../custom-elements.json';
import prettier from 'prettier';

const REACT_PROP_TYPE = 'DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>';

const modules = customElementsManifest.modules.map((module) => module.declarations).flat();

// Convert web component tag to React component name
const toCamelCase = (str) => {
  return str.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

// Create prop interface using custom-elements.json
const createComponentInterface = (reactName) => {
  const item = modules.find((item) => item.name == reactName);
  const publicFields = item.members.filter(
    (member) => member.kind === 'field' && member.privacy === 'public'
  );
  const props =
    publicFields.length &&
    publicFields.map((property) => {
      const readonly = property.readonly ? 'readonly ' : '';
      const optional = property.default || property.optional || property.readonly ? '?' : '';

      return (
        `/**\n` +
        `* ${property.description || ''}\n` +
        `*/\n` +
        `${readonly}${property.name}${optional}: ${property.type.text};\n`
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
const createDefaultProps = (reactName) => {
  const item = modules.find((item) => item.name == reactName);
  const defaultFields = item.members.filter(
    (member) => member.kind === 'field' && member.privacy === 'public' && member.default
  );
  const props =
    defaultFields.length &&
    defaultFields.map((property) => {
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
  for await (const componentPath of globbyStream(
    './src/components/**/pharos-!(*.css|*.test|element)*.ts'
  )) {
    const dest = componentPath.replace('/components/', '/react-components/').replace('.ts', '.tsx');
    const webComponentFilePath = componentPath.split('components/')[1].split('.ts')[0];
    const webComponentName = webComponentFilePath.split('/').pop();
    const reactComponentName = toCamelCase(
      webComponentName[0].toUpperCase() + webComponentName.substr(1)
    );
    const relativePath = `'../../components/${webComponentFilePath}'`;
    const reactInterface = createComponentInterface(reactComponentName);

    const component = await fs.readFile(componentPath, 'utf8');

    // Generate React component using our wrapper
    const reactComponent = `
          import type { FC, DetailedHTMLProps, HTMLAttributes } from 'react';
          import createReactComponent from '../../utils/createReactComponent';
          import { ${reactComponentName} as PharosClass } from ${relativePath};

          ${importTypes(component, relativePath)}

          ${reactInterface}

          const tag = new PharosClass().localName;
          export const ${reactComponentName}: FC${
      reactInterface ? `<${reactComponentName}Props>` : `<${REACT_PROP_TYPE}>`
    } = createReactComponent(tag);
          ${reactComponentName}.displayName = '${reactComponentName}';

          ${createDefaultProps(reactComponentName)}
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
