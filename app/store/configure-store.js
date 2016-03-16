import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../redux';

const middleWares = [
    thunk,
];

if (__DEV__) {
    middleWares.unshift(createLogger());
}

const finalCreateStore = applyMiddleware(
    ...middleWares
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(reducer, initialState);
    return store;
}

