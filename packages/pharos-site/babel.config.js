module.exports = {
  plugins: [
    '@babel/plugin-transform-shorthand-properties',
    '@babel/plugin-transform-block-scoping',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
    '@babel/plugin-transform-classes',
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-parameters',
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-transform-spread',
    '@babel/plugin-transform-for-of',
    'babel-plugin-macros',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@emotion', { sourceMap: true, autoLabel: 'always' }],
  ],
  presets: [
    [
      'babel-preset-gatsby',
      {
        reactRuntime: 'automatic',
      },
    ],
  ],
};
