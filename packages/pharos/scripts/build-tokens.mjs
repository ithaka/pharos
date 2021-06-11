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

const cssVar = (token, dictionary) => {
  let value = JSON.stringify(token.value);
  if (dictionary.usesReference(token.original.value)) {
    const reference = dictionary.getReferences(token.original.value);
    if (reference[0]?.name) {
      value = `var(--${reference[0].name})`;
    } else {
      value = token.attributes.category === 'asset' ? `'${token.value}'` : token.value;
    }
  } else {
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
  matcher: function (prop) {
    return prop.attributes.category === 'type' && prop.attributes.type === 'scale';
  },
  transformer: function (prop) {
    return `${getRem(getTypeSize(prop.value))}rem`;
  },
});

// REGISTER THE CUSTOM TRANFORM GROUPS

// if you want to see what a pre-defined group contains, uncomment the next line:
// console.log(StyleDictionary.transformGroup['group_name']);

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup['scss'].concat(['scale/rem']),
});

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup['css'].concat(['scale/rem']),
});

StyleDictionary.registerFormat({
  name: 'css/js',
  formatter: function (dictionary) {
    return (
      fileHeader() +
      `import { css } from 'lit';\n\n` +
      `export const designTokens = css\`\n` +
      `  :host {\n` +
      dictionary.allProperties.map((token) => '    ' + cssVar(token, dictionary)).join('\n') +
      `\n  }\n` +
      `\`;\n`
    );
  },
});

StyleDictionary.registerFormat({
  name: 'js/object',
  formatter: function (dictionary) {
    return (
      fileHeader() +
      'const ' +
      (this.name || '_styleDictionary') +
      ' = ' +
      JSON.stringify(dictionary.properties, null, 2) +
      ';' +
      `\n\nexport default ` +
      (this.name || '_styleDictionary') +
      ';'
    );
  },
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(config);

// FINALLY, BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();

console.log('\n==============================================');
console.log('\nBuild completed!');
