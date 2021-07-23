import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';

const reducer = combineReducers({
  login: loginReducer,
  blogs: blogReducer,
  notification: notificationReducer });

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default store;