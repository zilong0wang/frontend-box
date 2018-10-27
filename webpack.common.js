const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const outputDir = path.resolve(__dirname, 'app/dist');

const cssLoader = {
    loader: 'css-loader',
    options: { importLoaders: 1 }
};
const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('autoprefixer')
        ]
    }
};

module.exports = {
    // The base directory, an absolute path, for resolving entry points and loaders from configuration.
    context: path.resolve(__dirname, 'app'),
    entry: {
        main: [
            './src/index.tsx',
            './scss/main.scss'
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: outputDir
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin([
            outputDir
        ]),
        new CopyWebpackPlugin(
            [{
                from: path.resolve(__dirname, 'app/assets'),
                to: './' // Output root if from is file or dir, resolved glob path if from is glob
            }],
            {
                // By default, we only copy modified files during a webpack --watch or webpack-dev-server build. 
                // Setting this option to true will copy all files.
                copyUnmodified: true
            }
        ),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            components: path.resolve(__dirname, 'app/src/components')
        }
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    cssLoader,
                    postCssLoader
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // extract css to separate file
                    cssLoader, // translates CSS into CommonJS
                    postCssLoader, // autoprefixing stuff
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /* externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    } */
};