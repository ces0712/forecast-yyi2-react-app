import React from 'react'; 
import { expect } from '../test_helper';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { mockCities, mockCity } from '../data';
import { google } from '../mocks';
import GoogleMap from '../../src/components/google_map.js';
// https://github.com/fullstackreact/google-maps-react
// http://frontend.turing.io/lessons/testing-react.html

 describe('GoogleMap', () => {
    let sandbox;
    let prop_data;
    let wrapper;

    before(function () {
      this.jsdom = require('jsdom-global')();
    });

   after(function () {
      this.jsdom();
    });
    
    beforeEach(() => {
      const { lat, lon } = mockCity.city.coord;
      prop_data = {
        lat: lat,
        lon: lon
      };
    });

    it('renders a div with id map', () => {
      wrapper = shallow(<GoogleMap />);
      expect(wrapper.find('div')).to.have.id('map');   
    });

    describe('GoogleMap renders a Map', () => {
      

      beforeEach(function(){
        if (!global.google) {
          global.google = google;
        }

        sandbox = sinon.sandbox.create();
        sandbox.stub(google.maps, 'Map').returns(google.maps.Map);
      });

      afterEach(function(){
        sinon.assert.called(google.maps.Map);
        sandbox.restore();
      });


      it('renders after receiving first props', function(){
        sinon.spy(GoogleMap.prototype, 'componentDidMount');
        wrapper = mount(<GoogleMap {...prop_data} />);
        expect(GoogleMap.prototype.componentDidMount.calledOnce).to.equal(true);
      });

      it('renders after new set of props', function(){
        const prop_aux_data = {
          lat: 42.5244,
          lon: 23.4105
        };

        sinon.spy(GoogleMap.prototype, 'componentWillUpdate');
        wrapper = mount(<GoogleMap {...prop_data} />);
        wrapper.setProps(prop_aux_data);
        expect(GoogleMap.prototype.componentWillUpdate.calledOnce).to.equal(true);
      });

    });

  });