module.exports = {
	// Tell webpack to run babel on every file it runs through
	module: {
		rules: [
			{
				// Only apply babel to JS files
				test: /\.js?$/,
				loader: 'babel-loader', // this transpiles our code
				exclude: /node-modules/, // Tells webpack to not run babel over anything in the specified directory
				options: {
					presets: [
						'react',
						'stage-0',
						['env', { targets: { browsers: ['last 2 versions'] }}]
					]
				}
			}
		]
	}
};
