// import react libraries
import React from 'react';
import { render } from 'react-dom';

// import modules
import { Provider } from 'react-redux';

// import project files
import './index.css';
import App from './App';
import store from './app/store';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
