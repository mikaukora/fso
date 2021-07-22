import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  const getStyle = (error) => error ? { ...style, color: 'red' } : style;

  const noteBox = () => <div style={getStyle(notification.error)}>{notification.text}</div>;

  return (
    <div>{notification?.text ? noteBox() : null}</div>
  );
};

export default Notification;