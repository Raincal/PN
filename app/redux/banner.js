import { createAction, handleActions } from 'redux-actions';

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
        await fetch('http://m.piaoniu.com/api/v1/home/banners?type=2')
            .then(response => response.json())
            .then(banner => dispatch(receiveBanner(banner)))
    }
}
