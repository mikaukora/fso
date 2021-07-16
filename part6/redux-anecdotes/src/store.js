import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = anecdoteReducer;

const store = createStore(
  reducer,
  composeWithDevTools()
);

export default store;
