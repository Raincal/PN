/**
 * Created by Yun on 2015-12-21.
 */
import { combineReducers } from 'redux';
import bannerReducer from './banner';
import activitiesReducer from './activities';

export default combineReducers({
  banner: bannerReducer,
  activities: activitiesReducer
});
