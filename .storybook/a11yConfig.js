const a11yConfig = {
  config: {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'section508', 'best-practice'],
    },
    rules: [
      {
        id: 'region',
        enabled: false,
      },
    ],
  },
};

export default a11yConfig;
