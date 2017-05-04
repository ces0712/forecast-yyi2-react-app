require('../../style/style.css');
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { fetchCity, fetchCities } from '../actions';
import ForecastChart from './forecast_chart';
import GoogleMap from './google_map';

class ForecastIndex extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCity(id);
    this.props.fetchCities();
  }

  onSubmit(values) {
    const { id } = this.props.match.params;
    const {cities} = this.props;
    const array = _.map(cities, (value)=>{
      return value;
    });
    // generate random from array values
    const newId = array[Math.floor(Math.random()*array.length)];
    return this.props.fetchCity(newId).then(()=>{
      this.props.history.push(`/${newId}`);
    });
  }


  chartHelper(field) {
    const { main } = field;
    return (
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Temperature (K)</th>
              <th>Pressure (hPa)</th>
              <th>Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><ForecastChart data={_.map(main, 'temp')} color="yellow" units="K" /></td>
              <td><ForecastChart data={_.map(main, 'pressure')} color="blue" units="hPa" /></td>
              <td><ForecastChart data={_.map(main, 'humidity')} color="green" units="%" /></td> 
            </tr>
          </tbody>
        </table>
      </div>
    );
  }


  render() {
    const { city, cities } = this.props;
    if (!city || !cities) {
      return <div>Loading...</div>;
    }
    const { handleSubmit, submitting} = this.props;
    const { lat, lon } = city.city.coord;    
    const { main } = this.props.city;

    // const { name, country } = city.city;
    
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <button 
          type="submit"
          className="btn btn-primary pull-xs-right"
          disabled={submitting}
          >
          Surprise Me!!
        </button>        
        <Field name="map" lat={lat} lon={lon} component={GoogleMap} />                
        <Field name="chart" main={main} component={this.chartHelper} />
      </form>
    );
  }
}

function mapStateToProps({ city, cities }, ownProps) {
  return { 
    city: city[ownProps.match.params.id],
    cities: _.omit(_.map(cities, 'id'),[ownProps.match.params.id-1]:ownProps.match.params.id),
  };
}


export default reduxForm({
  form: 'forecastForm' 
})(
  connect(mapStateToProps, { fetchCity, fetchCities })(ForecastIndex)
);

