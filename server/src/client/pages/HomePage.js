import React from 'react';

const HomePage = () => {
	return (
		<div>
			<div>I'm the BEST Home component</div>
			<button onClick={() => console.log('Clicked')}>Press me!</button>
		</div>
	);
};

export default {
	component: HomePage
};
