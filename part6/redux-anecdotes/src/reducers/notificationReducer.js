const notificationAtStart = '';
    
const initialState = notificationAtStart;
  
const addNotification = (text, timeoutId) => {
  return {
    type: 'NEW_NOTE',
    data: {
      text,
      timeoutId
    }
  }
}

const clearNotification = () => {
    return {
      type: 'CLEAR_NOTE',
    }
  }

export const showNotification = (text, timeout) => {
    return async (dispatch, getState) => {
      const {notification} = getState();
      console.log('Cleaning timer ID ', notification.timeoutId);
      clearTimeout(notification.timeoutId);
      const timeoutId = setTimeout(() => dispatch(clearNotification()), timeout * 1000);
      dispatch(addNotification(text, timeoutId));
    }
}

const reducer = (state = initialState, action) => {
  console.log('notification state now: ', state);
  console.log('notification action', action);

  switch (action.type) {
    case 'NEW_NOTE':
      // Newest on top, it is shown
      return action.data;
    case 'CLEAR_NOTE':
      return ''
    default:
      return state;
  }
}

export default reducer;
