var path = require("path"),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer-core'),
    csswring = require('csswring');

module.exports = {
    context: __dirname,

    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],

    output: {
        path: path.resolve('./bundles/'),
        filename: "[name].js"
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
            { test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!postcss!sass?sourceMap' },
            // React support: transform JSX into JS
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot-loader!babel?{"stage":1}!eslint'},

            // Loader for fonts
            { test: /\.woff2?($|\?)/, loader: "url?limit=10000&minetype=application/font-woff" },
            { test: /\.ttf($|\?)/, loader: "url?limit=10000&minetype=application/octet-stream" },
            { test: /\.eot($|\?)/, loader: "file" },
            { test: /\.svg($|\?)/, loader: "url?limit=10000&minetype=image/svg+xml" },
        ]
    },

    resolve: {
        root: [path.join(__dirname, "./node_modules"), path.join(__dirname, "./src")],
        extensions: ['', '.js', '.jsx']
    },

    postcss: function () {
        return [autoprefixer, csswring];
    }

};