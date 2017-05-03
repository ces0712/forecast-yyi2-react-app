import { FETCH_CITIES } from '../actions';

export default function(state={}, action) {
  switch(action.type) {
    case FETCH_CITIES: 
        return _.omit(...state, action.payload.data);
    default:
        return state;
  }
}