import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Snackbar from './Snackbar';
import SnackbarContext from './SnackbarContext';

export default function SpackbarProvider(props) {
  const { children } = props;
  const [message, setMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const showMessage = (newMessage) => {
    setMessage(newMessage);
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <SnackbarContext.Provider value={showMessage}>
        {children}
      </SnackbarContext.Provider>
      <Snackbar message={message} isOpen={isOpen} onClose={handleClose} />
    </React.Fragment>
  );
}

SpackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
