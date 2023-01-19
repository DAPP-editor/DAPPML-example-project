const webpack = require("webpack");

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    url: require.resolve("url/"),
  };
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  config.devServer = {
    ...config.devServer,
    client: {
      overlay: false,
      webSocketURL: {
        port: 443,
      },
    },
    watchFiles: {
      options: {
        atomic: true,
        awaitWriteFinish: true,
      },
    },
    hot: true,
    host: "0.0.0.0",
    watchOptions: {
      poll: true, // Or you can set a value in milliseconds.
    },
  };
  console.log(config);
  return config;
};
