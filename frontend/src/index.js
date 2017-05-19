import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import { AppContainer } from 'react-hot-loader';
import Root from './root';
require('../style/style.css');

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


  ReactDOM.render(
    <AppContainer>
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Root />
      </Provider>  
    </AppContainer>
    , document.querySelector('.container'));


// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    const NextApp = require('./root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.querySelector('container')
    );
  });
}
