const path = require('node:path');

// React 18's Node pipeable renderer can corrupt UTF-8 at chunk boundaries.
// Use the Web Streams renderer only in the server build; client code is unchanged.
// Upstream reproduction: https://github.com/react/react/issues/31134
module.exports = function stableSsg() {
  return {
    name: 'stable-utf8-ssg',
    configureWebpack(_config, isServer) {
      if (!isServer) return {};
      return {
        resolve: {
          alias: {
            [require.resolve('@docusaurus/core/lib/client/renderToHtml.js') + '$']:
              path.join(__dirname, 'renderToHtml.js'),
          },
        },
      };
    },
  };
};
