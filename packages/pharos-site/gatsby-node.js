exports.onCreateWebpackConfig = ({ getConfig, stage, actions, plugins }) => {
  if (stage === 'build-javascript') {
    const currentConfig = getConfig();

    if (
      currentConfig.optimization &&
      currentConfig.optimization.minimizer &&
      currentConfig.optimization.minimizer.length
    ) {
      currentConfig.optimization.minimizer = currentConfig.optimization.minimizer.map((plugin) => {
        if (plugin.constructor.name !== `TerserPlugin`) {
          return plugin;
        }

        return plugins.minifyJs({
          terserOptions: {
            keep_classnames: /^Pharos/,
            keep_fnames: /^Pharos/,
          },
        });
      });

      actions.replaceWebpackConfig(currentConfig);
    }
  }
};
