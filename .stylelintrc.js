module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'length-zero-no-unit': [true, { ignore: 'custom-properties' }],
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'declaration-no-important': true,
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'keyframes-name-pattern': null,
    'scss/operator-no-newline-after': null,
    'value-no-vendor-prefix': [true, { ignoreValues: ['box'] }],
    'alpha-value-notation': 'number',
  },
};
