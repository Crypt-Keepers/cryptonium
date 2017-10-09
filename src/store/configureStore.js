import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
<<<<<<< HEAD
    applyMiddleware(thunk),
=======
    // applyMiddleware(thunk),
>>>>>>> (feat) redux setup
  );
}
