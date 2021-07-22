const notificationAtStart = '';

const initialState = notificationAtStart;

const addNotification = (text, error, timeoutId) => {
  return {
    type: 'NEW_NOTE',
    data: {
      text,
      error,
      timeoutId
    }
  };
};

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTE',
  };
};

export const showNotification = (text, error=false, timeout=5) => {
  return async (dispatch, getState) => {
    const { notification } = getState();
    console.log('Cleaning timer ID ', notification.timeoutId);
    console.log(text, error, timeout);
    clearTimeout(notification.timeoutId);
    const timeoutId = setTimeout(() => dispatch(clearNotification()), timeout * 1000);
    dispatch(addNotification(text, error, timeoutId));
  };
};

const reducer = (state = initialState, action) => {
  console.log('notification state now: ', state);
  console.log('notification action', action);

  switch (action.type) {
  case 'NEW_NOTE':
    // Newest on top, it is shown
    return action.data;
  case 'CLEAR_NOTE':
    return '';
  default:
    return state;
  }
};

export default reducer;