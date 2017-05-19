import { expect } from '../test_helper';

import cityReducer from '../../src/reducers/reducer_city';
import { FETCH_CITY }  from '../../src/actions';
import { mockCity } from '../data';
import _ from 'lodash';
// check chai docs
describe('City Reducer', () => {
  let action;

  it('handles action with unknown type', () => {
    // checks if is instance of array
    // expect(commentReducer()).to.be.instanceof(Array);
    // check if array is empty
    expect(cityReducer(undefined, {})).to.eql({});
  });
  
  it('handles action of type FETCH_CITY', () => {
    action = { type: FETCH_CITY, payload: { data: mockCity } };
    expect(cityReducer({}, action)).to.eql({[mockCity.id]:mockCity});
  });


});