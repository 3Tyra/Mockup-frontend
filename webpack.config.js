// webpack.config.js
module.exports = {
  // ... other config
  ignoreWarnings: [
    {
      module: /node_modules\/react-datepicker/,
    },
  ],
};