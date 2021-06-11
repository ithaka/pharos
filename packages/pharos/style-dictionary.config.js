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
          options: {
            outputReferences: true,
          },
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
          options: {
            outputReferences: true,
          },
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
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    'assets/embed/javascript': {
      transforms: ['attribute/cti', 'name/cti/constant', 'asset/base64'],
      prefix: 'pharos',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'icons.ts',
          format: 'javascript/es6',
          name: 'icons',
          filter: {
            attributes: {
              category: 'asset',
              type: 'icon',
            },
          },
          options: {
            outputReferences: true,
          },
        },
      ],
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
          options: {
            outputReferences: true,
          },
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
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
