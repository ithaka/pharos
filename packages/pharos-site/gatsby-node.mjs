export const onPostBuild = () => {
  console.log('Build is done!');
};

export const onCreateWebpackConfig = ({ getConfig, stage, actions, plugins }) => {
  if (stage === 'build-javascript') {
    const currentConfig = getConfig();

    if (currentConfig?.optimization?.minimizer.length) {
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

  console.log('Webpack config is ready!');
};
