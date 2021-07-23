import loginService from '../services/login';
import { showNotification } from './notificationReducer';

const initialState = null;

export const login = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      });
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      );
      dispatch( {
        type: 'LOGIN',
        data: user,
      });
    } catch(error) {
      dispatch(showNotification('wrong username or password', true));
    }
  };
};

export const logout = (user) => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser');
    dispatch( {
      type: 'LOGOUT',
      data: user,
    });
  };
};

export const loggedInUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch( {
        type: 'LOGIN',
        data: user,
      });
    }
  };
};


const reducer = (state = initialState, action) => {
  console.log('notification state now: ', state);
  console.log('notification action', action);

  switch (action.type) {
  case 'LOGIN':
    return action.data;
  case 'LOGOUT':
    return null;
  default:
    return state;
  }
};

export default reducer;