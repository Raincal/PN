import { createAction, handleActions } from 'redux-actions';
import {request} from '../utils/RequestUtils';
import {HOST} from '../constants/api';

// Action types;
export const FETCH_ACTIVITIES = 'app/sell/fetch_activities';
export const REFRESH_ACTIVITIES = 'app/sell/refresh_activities';
export const MODAL_SHOW = 'app/sell/modal';
export const CHANGE_CATEGORY = 'app/sell/category';
export const CHANGE_SORT = 'app/sell/sort';
export const CHANGE_TIME = 'app/sell/time';
export const LOAD_MORE = 'app/sell/load_more';

// Initial state
const initialState = {
    activitiesList: [],
    totalPage: 1,
    modalShow: false,
    canLoadMore: false,
    selected: '',
    currentCategory: 0,
    currentSort: 1,
    currentTime: 'all'
};

// reducer
const reducer = handleActions({
    [FETCH_ACTIVITIES]: (state, action) => {
        return Object.assign({}, state, {
            activitiesList: state.activitiesList.concat(action.payload.data),
            totalPage: action.payload.totalPage
        })
    },
    [REFRESH_ACTIVITIES]: (state, action) => {
        return Object.assign({}, state, {
            activitiesList: [],
            modalShow: false,
            canLoadMore: false
        })
    },
    [MODAL_SHOW]: (state, action) => {
        return Object.assign({}, state, {
            modalShow: !state.modalShow,
            selected: action.selected
        })
    },
    [CHANGE_CATEGORY]: (state, action) => {
        return Object.assign({}, state, {
            currentCategory: action.currentCategory
        })
    },
    [CHANGE_SORT]: (state, action) => {
        return Object.assign({}, state, {
            currentSort: action.currentSort
        })
    },
    [CHANGE_TIME]: (state, action) => {
        return Object.assign({}, state, {
            currentTime: action.currentTime
        })
    },
    [LOAD_MORE]: (state, action) => {
        return Object.assign({}, state, {
            canLoadMore: !state.canLoadMore
        })
    }
}, initialState);
export default reducer;

// action creators:
export const receiveActivities = createAction(FETCH_ACTIVITIES);
export const resetActivities = createAction(REFRESH_ACTIVITIES);

// async action creators: create async function as redux-thunk.
export function fetchActivities(page = 1, categoryId = 0, sort = 1, time = 'all') {
    return async (dispatch) => {
        try {
            let response = await request(`${HOST}activities?pageIndex=${page}&pageSize=10&categoryId=${categoryId}&sort=${sort}&time=${time}`, 'get');
            dispatch(receiveActivities({
                data: response.data,
                totalPage: Math.ceil(response.totalNum / response.pageSize)
            }))
        } catch (error) {
            console.warn(error)
        }
    };

}

export function refreshActivities() {
    return (dispatch) => {
        dispatch(resetActivities());
    }
}

export function modalShow(selected) {
    return (dispatch) => {
        dispatch({
            type: MODAL_SHOW,
            selected
        });
    }
}

export function changeCategory(cid) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_CATEGORY,
            currentCategory: cid
        });
    }
}

export function changeSort(sid) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_SORT,
            currentSort: sid
        });
    }
}

export function changeTime(tid) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_TIME,
            currentTime: tid
        });
    }
}

export function loadMore() {
    return (dispatch) => {
        dispatch({
            type: LOAD_MORE
        })
    }
}