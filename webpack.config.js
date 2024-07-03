const path = require( 'path' );
const webpack = require( 'webpack' );

module.exports = (env) => ({
    // bundling mode
    mode: 'development',

    // entry files
    entry: './src/main.ts',

    // output bundles (location)
    output: {
        library: "main",
        libraryTarget: "var",
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },

    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.(ts|js)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-typescript"],
                    },
                },
            },
        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            'ROOM_TOKEN': env.token ? `"${env.token}"` : "undefined",
        })
    ]
});