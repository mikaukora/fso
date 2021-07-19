const notificationAtStart = '';
    
const initialState = notificationAtStart;
  
const addNotification = (text, id) => {
  return {
    type: 'NEW_NOTE',
    data: {
      text,
      id
    }
  }
}

const clearNotification = (id) => {
    return {
      type: 'CLEAR_NOTE',
      data: {
        id,
      }
    }
  }

let runningId = 0;

export const showNotification = (text, timeout) => {
    return async dispatch => {
      const nextId = runningId++;
      dispatch(addNotification(text, nextId));
      const timeoutId = setTimeout(() => dispatch(clearNotification(nextId)), timeout * 1000);
      console.log('timeoutId', timeoutId);
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
