"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack = require("@ngtools/webpack");
const TsMacros = require("ts-macros").default;
function findAngularWebpackPlugin(webpackCfg) {
  return webpackCfg.plugins.find((plugin) => plugin instanceof webpack.AngularWebpackPlugin);
}
function addTransformerToAngularWebpackPlugin(plugin, transformer) {
  const originalCreateFileEmitter = plugin.createFileEmitter; // private method
  plugin.createFileEmitter = function (program, transformers, getExtraDependencies, onAfterEmit) {
    if (!transformers) {
      transformers = {};
    }
    if (!transformers.before) {
      transformers = { before: [] };
    }
    transformers.before.push(TsMacros(program.getProgram()));
    return originalCreateFileEmitter.apply(plugin, [program, transformers, getExtraDependencies, onAfterEmit]);
  };
}

exports.default = {
  pre() {
    console.debug('<pre build hook>');
  },
  // This hook is used to manipulate the webpack configuration
  config(cfg) {
    console.debug('<config hook>');
    // Find the AngularWebpackPlugin in the webpack configuration
    const angularWebpackPlugin = findAngularWebpackPlugin(cfg);
    // console.debug('angularWebpackPlugin = ', angularWebpackPlugin);
    if (!angularWebpackPlugin) {
      console.error('Could not inject the typescript transformer: Webpack AngularWebpackPlugin not found');
      return;
    }
    addTransformerToAngularWebpackPlugin(angularWebpackPlugin, TsMacros.default);
    return cfg;
  },
  post() {
    console.debug('<post build hook>');
  }, // This hook is not used in our example
};
