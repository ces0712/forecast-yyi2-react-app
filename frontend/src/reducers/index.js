import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; 

import CityReducer from '../reducers/reducer_city';
import CitiesReducer from '../reducers/reducer_cities';

const rootReducer = combineReducers({
  city: CityReducer,
  cities: CitiesReducer,
  form: formReducer
});

export default rootReducer;
