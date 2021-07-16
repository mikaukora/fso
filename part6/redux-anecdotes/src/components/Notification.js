
import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  // Take the first (newest) note only
  const notification = useSelector(state => state.notification[0]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const noteBox = () => <div style={style}>{notification.text}</div>;

  return (
    <div>{notification?.text ? noteBox() : null}</div>
  );
}

export default Notification;
