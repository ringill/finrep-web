const darkTheme = require('@ant-design/dark-theme');
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: darkTheme.default
      }
    }
  ]
}
