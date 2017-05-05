import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ForecastIndex from './components/forecast_index';
import ForecastError from './components/forecast_error';
//import App from './components/app';


class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/error" component={ForecastError} />
            <Route path="/forecast/:id" component={ForecastIndex} />
            <Redirect from="/" to="/forecast/1" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default Root;
