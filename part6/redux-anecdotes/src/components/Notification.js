
import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const notification = props.notification;

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
const mapStateToProps = (state) => {
  return {
    // Take the first (newest) note only
    notification: state.notification[0],
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
