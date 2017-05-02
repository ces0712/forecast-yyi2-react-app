import React, { Component } from 'react';

class GoogleMap extends Component {
  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    new google.maps.Map(
      this.refs.map, {
        zoom: 12,
        center: {
          lat: this.props.lat,
          lng: this.props.lon
        }
      }
    );
  }
  render() {
    return (
      <div id="map" ref="map"></div>
    );
  }
}

export default GoogleMap;