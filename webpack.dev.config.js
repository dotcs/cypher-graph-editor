var path = require("path"),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer-core'),
    csswring = require('csswring');

module.exports = {
    context: __dirname,

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './index'
    ],

    output: {
        path: path.resolve('./bundles/'),
        filename: "[name].js",
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(), // don't reload if there is an error

        new webpack.ResolverPlugin([
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("package.json", ["main"])
        ]),

        new webpack.ProvidePlugin({
            '_': "lodash",
            'd3': "d3",
            'cx': "classnames"
        })
    ],

    module: {
        loaders: [
            // SASS support: transform from SCSS into CSS
            { test: /\.scss$/, exclude: /node_modules|bower_components/, loader: 'style!css!postcss-loader!sass?sourceMap' },
            // Typescript support: transform TS into JS
            { test: /\.ts$/, exclude: /node_modules|bower_components/, loader: 'ts-loader' },
            // React support: transform JSX into JS
            { test: /\.jsx?$/, exclude: /node_modules|bower_components/, loader: 'react-hot!babel-loader?{"stage":1}!eslint-loader'},

            // Loader for fonts
            { test: /\.woff2?($|\?)/, loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf($|\?)/, loader: "url?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot($|\?)/, loader: "file" },
            { test: /\.svg($|\?)/, loader: "url?limit=10000&minetype=image/svg+xml" },
        ],
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.ts', '.js', '.jsx']
    },

    postcss: function () {
        return [autoprefixer, csswring];
    }

};