import React, { Component } from 'react';
import GoogleMap from './google_map.js';
require('../../style/style.css');


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{height: '100%'}}>
      Map!
        <GoogleMap lon={-34.397} lat={150.644} />
    </div>
    );
  }
}
