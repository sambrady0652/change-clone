import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import currentUser from './auth'
import petitions from './petitions'
import topics from './topics'
import users from './users'
import updates from './updates'
import currentPetition from './currentPetition'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  currentUser,
  currentPetition,
  petitions,
<<<<<<< HEAD
  users, 
  updates,
  topics
=======
  users,
  updates
>>>>>>> 10d2d7da25b7119e5da8680ec3cc24d3f6a94ea0
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