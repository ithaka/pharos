import StyleDictionary from 'style-dictionary';
import { default as config } from '../style-dictionary.config.js';

console.log('Build started...');
console.log('\n==============================================');

const BASE_FONT_SIZE = 16;

const getTypeSize = (step) => {
  if (step == 1) {
    return 12;
  }

  return getTypeSize(step - 1) + (Math.floor((step - 2) / 4) + 1) * 2;
};

const getRem = (px) => {
  return px / BASE_FONT_SIZE;
};

const cssVar = (token) => {
  let value;
  // Check if the token has references by looking at the original value
  if (typeof token.original?.value === 'string' && token.original.value.includes('{')) {
    // This is a reference token, use CSS variable syntax
    value = `var(--${token.name})`;
  } else {
    // This is a direct value
    value = token.attributes.category === 'asset' ? `'${token.value}'` : token.value;
  }

  const comment = token.comment ? ` /* ${token.comment} */` : '';
  return `--${token.name}: ${value}${comment};`;
};

const fileHeader = () => {
  let header = '';
  header += '/**\n';
  header += ' * Do not edit directly\n';
  header += ' * Generated on ' + new Date().toUTCString() + '\n';
  header += ' */\n\n';

  return header;
};

// REGISTER THE CUSTOM TRANFORMS

StyleDictionary.registerTransform({
  name: 'scale/rem',
  type: 'value',
  filter: function (prop) {
    return prop.attributes.category === 'type' && prop.attributes.type === 'scale';
  },
  transform: function (prop) {
    return `${getRem(getTypeSize(prop.value))}rem`;
  },
});

StyleDictionary.registerTransform({
  name: 'asset/scss-string',
  type: 'value',
  filter: function (prop) {
    return prop.attributes.category === 'asset';
  },
  transform: function (prop) {
    return `"${prop.value}"`;
  },
});

StyleDictionary.registerTransform({
  name: 'asset/base64-custom',
  type: 'value',
  filter: function (prop) {
    return prop.attributes.category === 'asset';
  },
  transform: async function (prop) {
    const fs = await import('fs');
    const path = await import('path');
    try {
      const filePath = path.resolve(prop.value);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return Buffer.from(fileContent).toString('base64');
    } catch (error) {
      console.error(`Error reading file: ${prop.value}`, error);
      return prop.value;
    }
  },
});

// REGISTER THE CUSTOM TRANFORM GROUPS

// if you want to see what a pre-defined group contains, uncomment the next line:
// console.log(StyleDictionary.transformGroup['group_name']);

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'time/seconds',
    'html/icon',
    'size/rem',
    'color/hex',
    'asset/scss-string',
    'scale/rem',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'time/seconds',
    'html/icon',
    'size/rem',
    'color/hex',
    'asset/base64',
    'scale/rem',
  ],
});

StyleDictionary.registerFormat({
  name: 'css/js',
  format: function (dictionary) {
    return (
      fileHeader() +
      `import { css } from 'lit';\n\n` +
      `export const designTokens = css\`\n` +
      `  :host {\n` +
      dictionary.allTokens.map((token) => '    ' + cssVar(token)).join('\n') +
      `\n  }\n` +
      `\`;\n`
    );
  },
});

StyleDictionary.registerFormat({
  name: 'js/object',
  format: function (dictionary) {
    return (
      fileHeader() +
      'const ' +
      (this.name || '_styleDictionary') +
      ' = ' +
      JSON.stringify(dictionary.tokens, null, 2) +
      ';' +
      `\n\nexport default ` +
      (this.name || '_styleDictionary') +
      ';'
    );
  },
});

StyleDictionary.registerFormat({
  name: 'javascript/es6-default',
  format: function (dictionary) {
    return (
      fileHeader() +
      dictionary.allTokens
        .map(function (prop) {
          const value = `export default ${JSON.stringify(prop.value)};`;
          const comment = prop.comment ? ` // ${prop.comment}` : '';
          return `${value}${comment}`;
        })
        .join('\n')
    );
  },
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = new StyleDictionary({
  ...config,
  log: {
    verbosity: 'verbose',
  },
});

// FINALLY, BUILD ALL THE PLATFORMS
await StyleDictionaryExtended.buildAllPlatforms();

console.log('\n==============================================');
console.log('\nBuild completed!');
