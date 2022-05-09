import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import { listReducer } from '../reducers/listReducer';
import { taskReducer } from '../reducers/taskReducer';

// Middleware For Asynchronous Requests
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Combination Of Reducers
const reducers = combineReducers({
  lists: listReducer,
  tasks: taskReducer,
});

// Store
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
