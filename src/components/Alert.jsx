import React from 'react';
import PropTypes from 'prop-types';

export default function Alert(props) {
  const captialized = (word) => {
    if(word === 'danger') {
      return 'Error';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  if (!props.alert) {
    return null;
  }
  return (
    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{captialized(props.alert.type)}</strong>: {props.alert.msg}
    </div>
  );
}

Alert.propTypes = {
  alert: PropTypes.object,
};