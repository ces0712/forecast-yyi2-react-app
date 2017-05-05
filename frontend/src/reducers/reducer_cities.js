import { FETCH_CITIES, UPDATE_CITY } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case FETCH_CITIES: 
      return _.mapKeys(action.payload.data, 'id');
    case UPDATE_CITY:
      return _.omit(...state, action.payload.data);
    default:
        return state;
  }
}