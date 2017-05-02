import { combineReducers } from 'redux';
import CityReducer from '../reducers/reducer_city';

const rootReducer = combineReducers({
  city: CityReducer
});

export default rootReducer;
