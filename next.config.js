// const withSass = require("@zeit/next-sass");
// const webpack = require("webpack");
// const withGraphQL = require("next-plugin-graphql");

module.exports = {
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    // config.module.rules.push({
    //   test: /\.mdx/,
    //   use: [
    //     options.defaultLoaders.babel,
    //     {
    //       loader: '@mdx-js/loader',
    //       options: pluginOptions.options,
    //     },
    //   ],
    // });
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      // include: [dir],
      exclude: /node_modules/,
      use: [
          {
            loader: 'graphql-tag/loader',
            // options: pluginOptions.options,
          }
      ]
    });


    return config
  },
  webpackDevMiddleware: (config) => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    return config
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
}