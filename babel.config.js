module.exports = (api) => {
  api.cache.never();

  return {
    plugins: ['@babel/plugin-syntax-import-assertions'],
  };
};
