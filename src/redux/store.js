import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './index';

const initialState = {

};

const middleware = [thunk];
var store = '';

//////////////////Esto es para desarrollo, para produccion tengo que eliminarlo///////////////////////
if (window.navigator.userAgent.includes('Chrome')) {
    store = createStore(rootReducer, initialState,
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ));
} else {
    //////////////////////////////////////////////////////////////////////

    store = createStore(rootReducer, initialState,
        compose(
            applyMiddleware(...middleware),
        ));
    ///////////////
}
/////////////////
export default store;