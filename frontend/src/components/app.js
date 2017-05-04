import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { fetchCity, fetchCities } from '../actions';
import ForecastChart from './forecast_chart';


class App extends Component {
    fieldHelper(field){
        return(
            <div>
            <input type="text" {...field.input}/>

            </div>
        );
    }


    render(){
        return (
            <form action="">
                <Field 
                name="title"
                component={this.fieldHelper}
                />
            </form>
        );
    }
}

export default reduxForm({
  form: 'PostsNewForm' // nombre del formulario unico
})(App);
