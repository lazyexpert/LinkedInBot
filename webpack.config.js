'use strict';

/* ENVIRONMENT VARIABLES AND DEPENDENCIES */
const NODE_ENV = process.env.NODE_ENV || "development",
      webpack = require('webpack'),
      path = require('path')

const plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    NODE_ENV : JSON.stringify(NODE_ENV)
  })
]

const modules = {
  loaders : [
    {
      test : /\.js$/,
      loader : 'babel'
    },
    {
      test: /\.json$/,
      loader : 'json'
    }
  ]
}

const popupWindowConfig = {
  entry: "./dev/popupExtension.js",

  output: {
    path: path.join(__dirname, "./build/js/"),
    filename: "app.js"
  },

  devtool : "cheap-inline-module-source-map", /* TODO: uncomment in REAl production : NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,*/

  plugins : plugins,
  module : modules
}

const contestScriptConfig = {
  entry: "./dev/contentScript.js",

  output: {
    path: path.join(__dirname, "./build/js"),
    filename: "start.js"
  },

  devtool : "cheap-inline-module-source-map", /* TODO: uncomment in REAl production : NODE_ENV == "development" ? "cheap-inline-module-source-map" : null,*/

  plugins : plugins,
  module : modules
}

/* EXPORTS */
module.exports = [ popupWindowConfig, contestScriptConfig ]
