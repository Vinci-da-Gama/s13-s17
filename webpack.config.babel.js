import nPath                from 'path';
import wpk                  from 'webpack';
import WriteFilePlugin      from 'write-file-webpack-plugin';
import UglifyJsPlugin       from 'uglifyjs-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin   from 'clean-webpack-plugin';
import HtmlWebpackPlugin    from 'html-webpack-plugin';
import CopyWebpackPlugin    from 'copy-webpack-plugin';
// import ManifestPlugin       from 'webpack-manifest-plugin';
import CompressionPlugin    from 'compression-webpack-plugin';
import OptimizeCSSAssetsPlugin  from "optimize-css-assets-webpack-plugin";
import DotEnv               from 'dotenv';
// faviconWebpackPlugin is for application, donot use it for website.
// import FavcWpkPlugin         from 'favicons-webpack-plugin';
import wpkMerge             from 'webpack-merge';   

// to avoid heroku deployment require this.
import eslintChecking from './wpkConfig/config_eslint';

const ast = './_asserts', distDir = `${ast}/dist`, 
    communal = './communal', devSrc = `${communal}/src/`,
    srcImg = `${communal}/img`;
const entryIdx = `${devSrc}index.js`;
const npmLifecycle = process.env.npm_lifecycle_event;
console.log('22 -- npmLifecycle: ', npmLifecycle);
const isProduction = npmLifecycle === 'build:prod';

const miniExtractSCSS = new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: isProduction ? '[id].css' : '[id].[hash:3].css',
}); 

const pathsToClean = [
    `${distDir}/js/`,
    `${distDir}/*.json`,
    `${distDir}/*.js`/* ,
    `${distDir}/*.css` */
];

const cleanOptions = {
    watch: true
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    DotEnv.config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    DotEnv.config({ path: '.env.dev' });
}

const commonConfig = {
    // for development.
    devtool: isProduction ? 'inline-source-map' : 'source-map',
    entry: {
        testApp: [
            '@babel/polyfill',
			'webpack/hot/only-dev-server',
            entryIdx
        ]
    },
    output: {
        path: nPath.resolve(__dirname, `${distDir}`),
        filename: 'js/[name]_bundle.js',
        pathinfo: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
				exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
							plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'],
							compact: true
						}
                    }
                ]
            },
            {   
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
						/* ,
                        options: {
                            publicPath: '../'
                        } */
                    },
                    { 
                        loader: 'css-loader',
                        options: { minimize: true, sourceMap: true, importLoaders: 1 }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff|jpe?g$|gif|png|ico|xml|json)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 6000,
                            fallback: 'url-loader',
                            name: '[name].[ext]',
                            // useRelativePath: true
                            // publicPath: `${ast}`,
                            outputPath: '../img'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', 'less']
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js($|\?)/i,
                parallel: true,
                sourceMap: false,
                extractComments: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        portableRecords: true
    },
    plugins: [
        new wpk.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            title: 'Test_ShowCase',
            template : nPath.resolve(__dirname, `${communal}/index.html`),
            filename: '../index.html',
            // when it is website, then use favicon here, due to it only requires one favicon.
            // favicon: nPath.resolve(__dirname, `${communal}/img/favicon_0.ico`),
            // js and css insertd into template already, do inject again, otherwise, it cause use babel-polyfill twice.
            inject: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        // new ManifestPlugin(`${ast}`),
        new CopyWebpackPlugin(
            [{
                from: `${communal}/manifest.json`,
                to: nPath.resolve(__dirname, `${ast}`),
                toType: 'dir'
            },
            {
                from: `${communal}/sw.js`,
                to: nPath.resolve(__dirname, `${ast}`),
                toType: 'dir'
            },
            {
                from: `${srcImg}`,
                to: nPath.resolve(__dirname, `${ast}/img`),
                toType: 'dir'
            }],
            { ignore: ['.DS_Store'] }
        ),
        new CompressionPlugin({
            filename: "[path].gz[query]",
            test: /\.js$|\.css$|\.html$/,
            algorithm: "gzip",
            threshold: 10240,
            minRatio: 0.8
        }),
        // remove all moment.js local files
        // new wpk.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // keep some specific moment.js local files -- zh=China, us=United State, au=Australia
        new wpk.ContextReplacementPlugin(/moment[/\\]locale$/, /zh|au|us/),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new wpk.HotModuleReplacementPlugin(),
        new wpk.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
        }),
        new wpk.optimize.OccurrenceOrderPlugin(),
        new wpk.optimize.AggressiveMergingPlugin(),
        /*when you use webpack-dev-server and you also want to output bundle.js*/
        new WriteFilePlugin(),
        miniExtractSCSS
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    devServer: {
        historyApiFallback: true,
        contentBase: nPath.resolve(__dirname, `${ast}`),
        publicPath: `${ast}`,
        stats: {
            colors: true,
            timings: true,
            cached: false
        },
        quiet: false,
        noInfo: false
    }
};

// you also can define customized host and port here.
/* const processHostAndPort = {
    host: process.env.HOST,
    port: process.env.PORT
}; */

let wpkConfig;

// Detect how npm is run and branch based on that
switch (npmLifecycle) {
    case 'build:dev':
        console.log('248 -- development configutation...');
        wpkConfig = wpkMerge(commonConfig, {});
        break;
    case 'build:eslint':
        console.log('252 -- run production mode with eslint...');
        wpkConfig = wpkMerge(commonConfig, eslintChecking.eslintLoader());
        break;
    default:
        console.log('256 -- default or product wpk configutation...');
        wpkConfig = wpkMerge(commonConfig, {});
        break;
}

module.exports = wpkConfig;