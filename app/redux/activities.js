import { createAction, handleActions } from 'redux-actions';

// Action types;
export const FETCH_ACTIVITIES = 'app/sell/fetch_activities';
export const REFRESH_ACTIVITIES = 'app/sell/refresh_activities';
export const MODAL_SHOW = 'app/sell/modal';
export const CHANGE_CATEGORY = 'app/sell/category';
export const CHANGE_SORT = 'app/sell/sort';
export const CHANGE_TIME = 'app/sell/time';

// Initial state
const initialState = {
    activitiesList: [],
    totalPage: 1,
    modalShow: false,
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
            modalShow: false
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
    }
}, initialState);
export default reducer;

// action creators:
export const receiveActivities = createAction(FETCH_ACTIVITIES);
export const resetActivities = createAction(REFRESH_ACTIVITIES);

// async action creators: create async function as redux-thunk.
export function fetchActivities(page = 1, categoryId = 0, sort = 1, time = 'all') {
    const BASE = 'http://m.piaoniu.com/api/v1/activities?';
    return async (dispatch) => {
        await fetch(`${BASE}pageIndex=${page}&pageSize=10&categoryId=${categoryId}&sort=${sort}&time=${time}`)
            .then(response => response.json())
            .then(json => dispatch(receiveActivities({
                data: json.data,
                totalPage: Math.ceil(json.totalNum / json.pageSize)
            })));
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