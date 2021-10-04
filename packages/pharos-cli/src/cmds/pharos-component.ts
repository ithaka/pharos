import colors from 'colors';
import {
  titleCaseText,
  generateFile,
  camelCaseText,
  addComponentToIndexFile,
} from '../utils/generation-utils';
import type {
  ComponentNameOptions,
  OutputFiles,
  ComponentName,
  TitleCaseName,
  FilePath,
  CamelCaseName,
} from '../types';

const currentDirectory = process.cwd();

const createPharosComponent = async (componentName: ComponentName): Promise<void> => {
  console.log(colors.yellow(`\nCurrent Directory: ${currentDirectory}`));

  const titleCaseName: TitleCaseName = titleCaseText(componentName);
  const camelCaseName: CamelCaseName = camelCaseText(componentName);
  const baseFilePath: FilePath = `${currentDirectory}/packages/pharos/src/components/${componentName}`;
  const nameOptions: ComponentNameOptions = {
    componentName,
    titleCaseName,
    camelCaseName,
  };

  const outputFiles: OutputFiles = {
    unitTest: {
      path: `${baseFilePath}/pharos-${componentName}.test.ts`,
      template: 'unit-test-template',
    },
    wcStorybook: {
      path: `${baseFilePath}/pharos-${componentName}.wc.stories.mdx`,
      template: 'wc-mdx-file-template',
    },
    reactStorybook: {
      path: `${baseFilePath}/Pharos${titleCaseName}.react.stories.mdx`,
      template: 'react-mdx-file-template',
    },
    component: {
      path: `${baseFilePath}/pharos-${componentName}.ts`,
      template: 'typescript-file-template',
    },
    styling: {
      path: `${baseFilePath}/pharos-${componentName}.scss`,
      template: 'scss-file-template',
    },
    css: {
      path: `${baseFilePath}/pharos-${componentName}.css.ts`,
      template: 'css-typescript-template',
    },
  };

  let wasError = false;

  for (const [componentFile, fileProperties] of Object.entries(outputFiles)) {
    try {
      console.log(colors.yellow(`\nGenerating ${componentFile} file for ${titleCaseName}`));
      generateFile(fileProperties, nameOptions);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      wasError = true;
      console.error(colors.red(error));
      break;
    }
  }
  if (!wasError) {
    console.log(colors.yellow(`\nAdding Pharos${titleCaseName} component export`));
    addComponentToIndexFile(currentDirectory, nameOptions);
    console.log('\nComponent creation complete! \nHappy developing!'.cyan);
  } else {
    console.log(
      '\n@ithaka/pharos-cli encountered an error attempting to create your component\n'.red
    );
  }
};

export default createPharosComponent;
