require('../../style/style.css');
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCity, fetchCities } from '../actions';
import ForecastChart from './forecast_chart';
import GoogleMap from './google_map';

class ForecastIndex extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCity(id);
    this.props.fetchCities();
  }

 
  onRandomClick() {    
    const { id } = this.props.match.params;
    const {cities} = this.props;
    const array = _.map(cities, (value)=>{
      return value;
    });
    // generate random from array values
    const newId = array[Math.floor(Math.random()*array.length)];
    this.props.fetchCity(newId).then(()=>{
      this.props.history.push(`/${newId}`);
    });
  }

  forecastCharts() {
    const { main } = this.props.city;
    return (
      <div>
        <ForecastChart data={_.map(main, 'temp')} color="yellow" units="K" />
        <ForecastChart data={_.map(main, 'pressure')} color="blue" units="hPa" />
        <ForecastChart data={_.map(main, 'humidity')} color="green" units="%" />
      </div>
    );
  }

  forecastMap() {
    const { lat, lon } = this.props.city.city.coord;
    return (
      <div className="map_div">
          <GoogleMap resize="true" lon={ lon } lat={lat} />
      </div>
    );
  }

  render() {
    const { city, cities } = this.props;
    if (!city || !cities) {
      return <div>Loading...</div>;
    }
    const { lat, lon } = city.city.coord;
    const { name, country } = city.city;
    
    return (
      <div >
        <button 
          className="btn btn-primary pull-xs-right" 
          onClick={this.onRandomClick.bind(this)}>
          Surprise Me!!
        </button>
        {this.forecastMap()}
        <div>{ name }</div>
        <div>{ country }</div>
        <div>{ lat }</div>
        <div> { lon }</div>
         {this.forecastCharts()}
      </div>
    );
  }
}

function mapStateToProps({ city, cities }, ownProps) {
  return { 
    city: city[ownProps.match.params.id],
    cities: _.omit(_.map(cities, 'id'),[ownProps.match.params.id-1]:ownProps.match.params.id),
  };
}

export default connect(mapStateToProps, { fetchCity, fetchCities })(ForecastIndex);