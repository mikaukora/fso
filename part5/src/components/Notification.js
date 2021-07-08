import PropTypes from 'prop-types';

const Notification = ({ message }) => {
    if (Object.keys(message).length === 0 || message.message === "") {
      return null;
    }
  
    return (
      <div className={message.error ? "error" : "info"}>{message.message}</div>
    );
  };

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification;
