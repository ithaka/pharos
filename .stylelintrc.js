module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  rules: {
    'length-zero-no-unit': [true, { ignore: 'custom-properties' }],
    'selector-type-no-unknown': [true, { ignore: ['custom-elements'] }],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'declaration-no-important': true,
  },
};
