import React from 'react';

const NotFoundPage  = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1 style={{ width: '50%', margin: 'auto', marginTop: '200px', 'text-align': 'center' }}>Oops, route not found.</h1>
};

export default {
  component: NotFoundPage
};
