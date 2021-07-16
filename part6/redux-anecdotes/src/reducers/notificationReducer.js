const notificationAtStart = 'This is a test notification';
    
const initialState = notificationAtStart;
  
export const addNotification = (text) => {
  return {
    type: 'NEW_NOTE',
    note: text
  }
}
  
const reducer = (state = initialState, action) => {
  console.log('notification state now: ', state);
  console.log('notification action', action);

  switch (action.type) {
    case 'NEW_NOTE':
      return action.note;
    default:
      return state;
  }
}

export default reducer;
