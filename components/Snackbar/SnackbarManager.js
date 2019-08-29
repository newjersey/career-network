import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Snackbar from './Snackbar';

export default function SnackbarManager(props) {
  const { message } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(!!message);
  }, [message]);

  return <Snackbar message={message} isOpen={isOpen} onClose={handleClose} />;
}

SnackbarManager.propTypes = {
  message: PropTypes.string,
};

SnackbarManager.defaultProps = {
  message: null,
};
