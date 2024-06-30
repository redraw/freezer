module.exports = function(api) {
  api.onCreateNode((options) => {
    if (!options.fileInfo) return;
    options.id = `content/${options.fileInfo.path}`;
    return options;
  });
};
