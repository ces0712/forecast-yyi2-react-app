import { expect, renderComponent, renderJsx } from '../test_helper';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {mount, render, shallow} from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
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



  it('renders something', () => {
    // expect(wrapper.find(Field).filter({name:'map'})).to.exist;
  /*  const data = {
       params: {id: 1}
    };
     handleSubmit = () =>{};
   
    let propsState = {
      city: mockCity,
      cities: mockCities,
      submitting: false,
      params: {id: 1},
      handleSubmit: handleSubmit
    }
   
    let sandbox;
*/
    
    
    // const Decorated = reduxForm({ form: 'forecastForm' })(ForecastIndex);
    // const mockStore = configureStore();
    // const dispatch = sinon.spy();

    // const store = createStore(reducers, propsState);
    

  /*  const options = { context: {store},  childContextTypes: { store: React.PropTypes.object.isRequired }  };
    wrapper = mount(
        <Decorated   />, options
    );
    console.log(wrapper.html());*/
    // const jsdom = require('jsdom-global')();
    
    // wrapper = shallow(renderJsx(Decorated, data, propsState));
    // wrapper.setProps({ params: ' });
    // wrapper = mount(renderJsx(ForecastIndex,props, propsState));
    // wrapper.setProps({ ...context });
    // expect(wrapper.find('button')).to.have.length(1);
   /* wrapper.setProps({ 
      city: mockCity, 
      cities:mockCities, 
      submitting: false, 
      handleSubmit: handleSubmit 
    });*/
    // console.log(wrapper.html());

    // expect(wrapper).to.have.html().match(/Loading.../);


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