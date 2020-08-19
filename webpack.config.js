const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

module.exports = { 
  mode:"development",
  entry: {
    background: './src/background.js',
  },
  output: {
    filename : "background.js",
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new ChromeExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: { // The entries used for the content/background scripts
        contentScript: 'content-script', // Use the entry names, not the file name or the path
        background: 'background' // *REQUIRED
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/manifest.json'},
      ],
    }),
  ],
  watch: true,
  devtool: 'cheap-module-source-map',// Fixes an ugly development bug
};