const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
	// Inform webpack that we're building a bundle for nodeJS, rather than for the browser
	// (Note that this file is called webpack.server.js) - this config is for the server, not the client
	target: 'node',

	// Tell webpack the root file of our server app
	entry: './src/index.js',

	// Tell webpack where to put the output file that gets generated
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')
	},

	externals: [webpackNodeExternals()] // anything we're requiring inside node_modules will not be bundled
};

module.exports = merge(baseConfig, config);
