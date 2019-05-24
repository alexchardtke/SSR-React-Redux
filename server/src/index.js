// CommonJS modules - es2015 doesn't work unless it gets compiled by webpack/babel

// const express = require('express');
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;

// Now that we're compiling with webpack/babel, we can use import statements
import 'babel-polyfill'; // lets us use async/await syntax
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
	// this second argument is just for this api
	proxyReqOptDecorator(opts) {
		opts.headers['x-forwarded-host'] = 'localhost:3000';
		return opts;
	}
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
	// req includes cookies, which we need for accessing the api
	const store = createStore(req);

	// Some logic to initialize and load data into the store

	// matchRoutes() returns an array of components that are about to be rendered for the given path
	const promises = matchRoutes(Routes, req.path).map(({ route }) => {
		// mapping over the matched routes to call loadData()
		// pass loadData() the redux store
		return route.loadData ? route.loadData(store) : null; // if loadData() exists on each route, call it - otherwise return null
	}).map(promise => {
		if (promise) {
			return new Promise((resolve, reject) => {
				promise.then(resolve).catch(resolve);
			});
		}
	});

	// wait for loadData() promise to resolve, then render the app
	Promise.all(promises).then(() => {
		const context = {};
		const content = renderer(req, store, context);

		if (context.url) {
			return res.redirect(302, context.url);
		};
		if (context.notFound) {
			res.status(404);
		}

		res.send(content);
	});
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
