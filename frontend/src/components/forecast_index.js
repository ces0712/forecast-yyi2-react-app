import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCity } from '../actions';
import ForecastChart from './forecast_chart';
import GoogleMap from './google_map.js';

class ForecastIndex extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCity(id);
  }
 
  onRandomClick() {
    // es preferible tomarlo del params en lugar del post
    const { id } = this.props.match.params;
    const newId = _.random(1,5);
    console.log(newId);
    if (id!==newId) {
      this.props.fetchCity(newId).then(()=>{
        this.props.history.push(`/${newId}`);
      });
    }else
      this.onRandomClick.bind(this);
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

  render() {
    const { city } = this.props;
    if (!city) {
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
        <div style={{height: '100%'}}>
          <GoogleMap lon={ lon } lat={lat} />
        </div>
        <div>{ name }</div>
        <div>{ country }</div>
        <div>{ lat }</div>
        <div> { lon }</div>
         {this.forecastCharts()}
      </div>
    );
  }
}

function mapStateToProps({ city }, ownProps) {
  return { city: city[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchCity })(ForecastIndex);