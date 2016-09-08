import { combineReducers } from 'redux';
import citiesReducer from './cities';
import bannerReducer from './banner';
import activitiesReducer from './activities';

export default combineReducers({
  cities: citiesReducer,
  banner: bannerReducer,
  activities: activitiesReducer
});
