import { combineReducers } from 'redux';
import bannerReducer from './banner';
import activitiesReducer from './activities';

export default combineReducers({
  banner: bannerReducer,
  activities: activitiesReducer
});
