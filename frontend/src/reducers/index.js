import { combineReducers } from 'redux';

import CityReducer from '../reducers/reducer_city';
import CitiesReducer from '../reducers/reducer_cities';

const rootReducer = combineReducers({
  city: CityReducer,
  cities: CitiesReducer
});

export default rootReducer;
