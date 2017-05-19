import { expect, renderComponent, renderJsx } from '../test_helper';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Field, reduxForm, reducer as form } from 'redux-form';
import {mount, render, shallow} from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducers from '../../src/reducers';

import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import _ from 'lodash';

import { mockCities, mockCity } from '../data';
import { ForecastIndex } from '../../src/components/forecast_index';
import ForecastChart from '../../src/components/forecast_chart';


describe('ForecastIndex', () => {
  let wrapper;
  let props;
  let submitting, handleSubmit;

   before(function () {
      this.jsdom = require('jsdom-global')();
    });

   after(function () {
      this.jsdom();
    });

  it('renders loading message when you dont have cities and city', () => {
    // expect(wrapper.find(Field).filter({name:'map'})).to.exist;
    props = {
      params: {id: 1}
    };
    wrapper = renderComponent(ForecastIndex, 'shallow', props);
    // console.log(wrapper.html());
    // console.log(wrapper.debug());
    expect(wrapper).to.have.html().match(/Loading.../);

  });

  describe('ForecastIndex passing cities and city as props static way', () => {
    let propsState;
    beforeEach(() => {
      propsState = {
        city: mockCity,
        cities: mockCities,
        params: {id: 1},
        form: 'forecastForm'
      };
      const store = createStore(reducers);
      const Decorated = reduxForm({...propsState })(ForecastIndex);

      wrapper = render(
        <Provider store={store}>
          <Decorated />
        </Provider>
      );

    });

    it('shows a form', () => {
      expect(wrapper.find('form')).to.exist;
    });  
    
    it('shows a submit buttom', () => {
      // expect(wrapper.find('button')).to.have.className('btn');
      expect(wrapper.find('button')).to.have.attr('type', 'submit');
    });

    it('shows a map div', () => {
      expect(wrapper.find('div')).to.have.id('map');     
    });

    it('renders a chart', () => {
      expect(wrapper.find('svg')).to.exist;     
    });
  });

  describe('ForecastChart', () => {
    it('renders a chart given props', () => {
      // <ForecastChart data={_.map(main, 'temp')} color="yellow" units="K" /></td>
      //  const { main } = field;
      const { main } = mockCity;
      const prop_data = {
        data: _.map(main, 'temp'),
        color: 'yellow',
        units: 'K'
      }; 
      const element = ForecastChart({...prop_data});
      wrapper = shallow(element);
      expect(wrapper.find('div').last()).to.have.html().match(/284 K/);
    });
  });

 

});