import React, { Component } from 'react';

class GoogleMap extends Component {
  mapHelper(props) {
      this.map = new google.maps.Map(
        this.refs.map, {
          zoom: 12,
          center: {
            lat: props.lat,
            lng: props.lon
          }
        }
      );
  }
  // this lifecicle is call when receive new props
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.mapHelper(nextProps);
    }
  }
  // this lifecicle is call only the first time
  componentDidMount() {
    this.mapHelper(this.props);
  }

  render() {
    return (
      <div id="map" ref="map"></div>
    );
  }
}

export default GoogleMap;