const config = {
  entry: `${__dirname}/app.js`,
  output: {
    filename: "bundle.js",
    path: `${__dirname}`
  },
  devtool: "source-map",
  }
};

module.exports = config;
