// Startup point for the client side app - the server-side rendered a "skeleton" html document but there isn't any javascript until we load this file
import 'babel-polyfill'; // lets us use async/await syntax
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // for async action creators
import { Provider } from 'react-redux';
import Routes from './Routes';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(thunk));

// Find the server-rendered div with an id of root and render the Home component
// Use ReactDOM.hydrate() to rehydrate our server skeleton with our React component (kind of like ReactDOM.render())
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	</Provider>,
	document.querySelector('#root')
);
