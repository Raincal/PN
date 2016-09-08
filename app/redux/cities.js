import { createAction, handleActions } from 'redux-actions';
import {request} from '../utils/RequestUtils';
import {HOST} from '../constants/api';

// Action types;
export const FETCH_CITIES = 'app/fetch_cities';

// Initial state
const initialState = [];

// reducer
const reducer = handleActions({
    [FETCH_CITIES]: (state, action) => {
        return action.payload;
    },
}, initialState);
export default reducer;

// action creators:
export const receiveCities = createAction(FETCH_CITIES);

// async action creators: create async function as redux-thunk.
export function fetchCities() {
    return async (dispatch) => {
        try {
            let response = await request(`${HOST}cities`, 'get');
            dispatch(receiveCities(response));
        } catch (error) {
            console.warn(error);
        }
    }
}
