import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ForecastIndex from './components/forecast_index';
//import App from './components/app';


class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/:id" component={ForecastIndex} />
            <Redirect from="/" to="/1" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default Root;
