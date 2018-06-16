// CommonJS modules - es2015 doesn't work unless it gets compiled by webpack/babel

// const express = require('express');
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;

// Now that we're compiling with webpack/babel, we can use import statements
import 'babel-polyfill'; // lets us use async/await syntax
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
	const store = createStore();

	// Some logic to initialize and load data into the store

	res.send(renderer(req, store));
});

app.listen(3000, () => {
	console.log('Listening on port 3000');
});