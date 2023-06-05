const path = require("path");

var OUT_DIR = path.normalize(path.join(__dirname, "..", '..', 'server', 'public', 'forgot_pass'));  //"../../server/public/app/"

var OUT_FILENAME = "forgot_pass.js"

const ENTRY_PATH = path.normalize(path.join(__dirname, "src", '.index.tsx'));

console.log('ENTRY_PATH', ENTRY_PATH);
console.log('OUT_DIR', OUT_DIR);

module.exports = {
  devtool: 'eval-source-map',
    entry: ENTRY_PATH,
    module: {
        rules: [   //загрузчик для tsx
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },


            { // SASS
              test: /\.s[ac]ss$/i,
              use: [
                // Загрузчик стилей в строку JS
                "style-loader",
                // Трансляция CSS по типу CommonJS
                "css-loader",
                // Компиляция Sass в CSS
                "sass-loader",
              ],
            },
            { // SVG
              test: /\.svg$/,
              use: ['@svgr/webpack'],
            },/*
            {
              test: /\.svg$/,
              loader: 'svg-inline-loader'
            },*/
            { // FILE-LOADER
              test: /\.(eot|woff|ttf)$/i, /* test: /\.(png|jpe?g|gif|eot|woff|ttf)$/i, */
              use: [
                {
                  loader: 'file-loader',
                },
              ],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      filename: OUT_FILENAME,
      path: path.resolve(__dirname, OUT_DIR),
      sourceMapFilename: "[forgot].js.map"
    },

}