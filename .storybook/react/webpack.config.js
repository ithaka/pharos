const configure = require('../webpack.config');

module.exports = async ({ config, mode }) => {
  return configure({ config, mode });
};
