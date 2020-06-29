const withSass = require("@zeit/next-sass");
const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
// const webpack = require("webpack");
// const withGraphQL = require("next-plugin-graphql");

module.exports = withImages(withCSS(withSass({
  webpack (config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // config.module.rules.push({
    //   test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 100000
    //     }
    //   }
    // });
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
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

    // config.module.rules.push({
    //   test: /\.(png|jpg|gif|ico)$/,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 3000
    //     }
    //   }
    // });

    return config
  }
})))
