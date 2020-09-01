import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import currentUser from './auth'
import petitions from './petitions'
import users from './users'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  currentUser,
  petitions,
  users
  //ADD ADDITIONAL SLICES OF STATE HERE 
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};

export default configureStore;