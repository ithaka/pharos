module.exports = {
  extends: ['stylelint-config-prettier', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'length-zero-no-unit': [true, { ignore: 'custom-properties' }],
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'declaration-no-important': true,
    'string-quotes': 'single',
    'selector-class-pattern': null,
  },
};
