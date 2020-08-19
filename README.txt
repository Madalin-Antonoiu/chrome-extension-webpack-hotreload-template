## Getting Started  

### a. Create Directory & Init
1. `mkdir` *chroext-webpack*
2. `cd` *chroext-webpack*
3. `npm init -y`
>This will create `package.json` in your folder. Don't forget to add `"build": "webpack"` in the scripts. We will get back to it later.
   
### b. Install *Webpack*, *Webpack CLI*, *Copy Webpack Plugin* and a 3rd party *webpack-chrome-extension-reloader* as dev dependencies.

4. `npm install webpack webpack-cli copy-webpack-plugin webpack-chrome-extension-reloader --save-dev`

>Copy Webpack Plugin is an official plugin needed to copy a file over. The extension reloader, you guessed it, will do hot reload for it.

### c. Source and build separation
5. Create new folder with a file in it: `src\manifest.json` and paste in the following :
``` json
{
    "name": "Chrome Ext with Webpack",
    "version": "0.1",
    "description": "Build a chrome extension with webpack included",
    "background": {
        "scripts": ["background.js"],
        "persistent": false
    },
    "manifest_version": 2
}
```
> This file will be copied over from src to build once we configure webpack

6. Create `webpack.config.js` next to `package.json`
   
``` js
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
```

6. `src\background.js`

```js
console.log("Blue cheese.")
```

> The build folder can be now imported into Chrome! Open background script from there and see the console log.
> 
>Edit the console log and watch it being reloaded automatically!