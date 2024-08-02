const ignoreFillColors = ['google-color', 'microsoft-color'];

const checkForRootSVG = (reporter, $, ast) => {
  Array.from($.find('svg')).forEach((item) => {
    reporter.error('Icon SVG files must omit the root <svg> tag.', item, ast);
  });
};

const ELEMENTS_ALLOWING_FILL = ['mask'];

const checkForFillAttributes = (reporter, $, ast, info) => {
  const filename = info.filepath.split('/').slice(-1)[0];
  const isIgnored = ignoreFillColors.includes(filename.split('.')[0]);

  if (!isIgnored) {
    Array.from($.find('[fill]')).forEach((item) => {
      if (item.attribs.fill !== 'none' && !ELEMENTS_ALLOWING_FILL.includes(item.name)) {
        // 'none' is necessary to make some icon parts transparent
        reporter.error(
          `Fill value '${item.attribs.fill}' should only be present if this part of the icon's color is not meant to be controlled by the consumer. If you're sure this icon is using fill attributes appropriately, add it to the fillAllowList in .svglintrc.js.`,
          item,
          ast
        );
      }
    });
  }
};

module.exports = {
  rules: {
    custom: [checkForRootSVG, checkForFillAttributes],
  },
};
