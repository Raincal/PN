import { createAction, handleActions } from 'redux-actions';
import {request} from '../utils/RequestUtils';
import {HOST} from '../constants/api';

// Action types;
export const FETCH_BANNER = 'app/banner/fetch_banner';

// Initial state
const initialState = '';

// reducer
const reducer = handleActions({
    [FETCH_BANNER]: (state, action) => {
        return action.payload;
    },
}, initialState);
export default reducer;

// action creators:
export const receiveBanner = createAction(FETCH_BANNER);

// async action creators: create async function as redux-thunk.
export function fetchBanner() {
    return async (dispatch) => {
        try {
            let response = await request(`${HOST}home/banners?type=2`, 'get');
            dispatch(receiveBanner(response));
        } catch (error) {
            console.warn(error);
        }
    }
}
