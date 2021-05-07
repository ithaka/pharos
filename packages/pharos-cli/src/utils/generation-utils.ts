import colors from 'colors';
import fs from 'fs-extra';
import type {
  FileProperties,
  ComponentNameOptions,
  ComponentName,
  TemplatePath,
  FilePath,
} from '../types';

declare function require(name: string);

export const capitalizeText = (component: ComponentName): string => {
  return `${component[0].toUpperCase()}${component.substring(1, component.length)}`;
};

export const titleCaseText = (component: ComponentName): string => {
  const splitWords = component.split('-');

  splitWords.map((word, index) => {
    splitWords[index] = capitalizeText(word);
  });

  return splitWords.join('');
};

export const camelCaseText = (component: ComponentName): string => {
  const splitWords = component.split('-');

  splitWords.map((word, index) => {
    if (index > 0) {
      splitWords[index] = capitalizeText(word);
    }
  });
  return splitWords.join('');
};

export const fetchTemplate = (url: TemplatePath, nameOptions: ComponentNameOptions): string => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(url)(nameOptions).replace(/^\s+/g, '');
};

export const generateFile = (
  fileProperties: FileProperties,
  nameOptions: ComponentNameOptions
): void => {
  if (!fs.existsSync(fileProperties.path)) {
    const generatedTemplate = fetchTemplate(`../templates/${fileProperties.template}`, nameOptions);

    fs.outputFile(fileProperties.path, generatedTemplate, (error) => {
      if (error) {
        throw error;
      }
    });
    console.log(colors.green(`Successfully generated ${fileProperties.path}`));
  } else {
    throw `Component ${nameOptions.componentName} already exists at path ${fileProperties.path}. \nPlease choose another name for your Pharos component.`;
  }
};

export const addComponentToIndexFile = (
  currentDirectory: FilePath,
  nameOptions: ComponentNameOptions
): void => {
  const exportString = `export { Pharos${nameOptions.titleCaseName} } from './components/${nameOptions.componentName}/pharos-${nameOptions.componentName}';\n`;
  const filePath: FilePath = `${currentDirectory}/packages/pharos/src/index.ts`;
  fs.appendFileSync(filePath, exportString);

  console.log(colors.green(`\nPharos${nameOptions.titleCaseName} export added to ${filePath}`));
};
