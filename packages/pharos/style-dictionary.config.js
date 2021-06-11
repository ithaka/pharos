import icons from './tokens/assets/icons.json';

export default {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'custom/scss',
      prefix: 'pharos',
      buildPath: 'src/styles/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
    },
    css: {
      transformGroup: 'custom/css',
      prefix: 'pharos',
      buildPath: 'lib/styles/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
    'css/js': {
      transformGroup: 'custom/css',
      prefix: 'pharos',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'variables.css.ts',
          format: 'css/js',
        },
      ],
    },
    'assets/embed/javascript': {
      transforms: ['attribute/cti', 'name/cti/constant', 'asset/base64'],
      prefix: 'pharos',
      buildPath: 'src/styles/icons/',
      files: Object.keys(icons.asset.icon).map((icon) => ({
        destination: `${icon}.ts`,
        format: 'javascript/es6-default',
        filter: (prop) =>
          prop.attributes.category === 'asset' &&
          prop.attributes.type === 'icon' &&
          prop.attributes.item === icon,
      })),
    },
    js: {
      transformGroup: 'js',
      prefix: 'pharos',
      buildPath: 'src/styles/',
      files: [
        {
          name: 'tokens',
          destination: 'tokens.ts',
          format: 'js/object',
        },
      ],
    },
    ts: {
      transformGroup: 'js',
      prefix: 'pharos',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'variables.ts',
          format: 'javascript/es6',
        },
      ],
    },
  },
};
