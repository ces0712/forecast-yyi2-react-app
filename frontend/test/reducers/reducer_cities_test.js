import { expect } from '../test_helper';

import citiesReducer from '../../src/reducers/reducer_cities';
import { FETCH_CITIES, UPDATE_CITY }  from '../../src/actions';
import { mockCities, mockCity } from '../data';
import _ from 'lodash';
// check chai docs
describe('Cities Reducer', () => {
  let action;

  it('handles action with unknown type', () => {
    // checks if is instance of array
    // expect(commentReducer()).to.be.instanceof(Array);
    // check if array is empty
    expect(citiesReducer(undefined, {})).to.eql({});
  });
  
  it('handles action of type FETCH_CITIES', () => {
    action = { type: FETCH_CITIES, payload: { data: mockCities } };
    expect(citiesReducer({}, action)).to.eql(_.mapKeys(mockCities, 'id'));
  });

  it('handles action of type UPDATE_CITY', () => {
    action = { type: UPDATE_CITY, payload: { data: mockCities } };
    expect(citiesReducer({}, action)).to.eql(_.omit(mockCities));
  });


});