// Startup point for the client side app - the server-side rendered a "skeleton" html document but there isn't any javascript until we load this file
import 'babel-polyfill'; // lets us use async/await syntax
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // for async action creators
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';
import Routes from './Routes';
import reducers from './reducers';

const axiosInstance = axios.create({
	baseURL: '/api'
});

const store = createStore(
	reducers,
	window.INITIAL_STATE, // set initial state to the list of users we got for initial state server render
	applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// Find the server-rendered div with an id of root and render the Home component
// Use ReactDOM.hydrate() to rehydrate our server skeleton with our React component (kind of like ReactDOM.render())
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(Routes)}</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);
