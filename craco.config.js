const darkTheme = require('@ant-design/dark-theme');

module.exports = {
  style: {
    less: {
      loaderOptions: {
        modifyVars: darkTheme,
        javascriptEnabled: true,
      }
    },
  },
}
