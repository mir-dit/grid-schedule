const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

const config = {
    entry: {
        all: ['./src/index.ts']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'eslint-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(scss)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(css)$/,
                include: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: 'src/assets/',
                    },
                }
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ],
        alias: {
            '@app': path.resolve(__dirname, 'src/app/'),
            '@components': path.resolve(__dirname, 'src/app/components/'),
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@mocks': path.resolve(__dirname, 'src/mocks/'),
            '@src': path.resolve(__dirname, 'src/')
        }
    },
    target: 'web',
    stats: 'errors-only',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new NgAnnotatePlugin({
            add: true,
        })
    ]
};

module.exports = config;
