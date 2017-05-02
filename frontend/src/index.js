import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import ForecastIndex from './components/forecast_index';
import App from './components/app';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
        <div>
            <Switch>
                 <Route path="/:id" component={ForecastIndex} />
                 <Route path="/" component={App} />
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
