import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SnackbarManager from './SnackbarManager';
import SnackbarContext from './SnackbarContext';

export default function SnackbarProvider(props) {
  const { children } = props;
  const [message, setMessage] = useState(null);

  return (
    <>
      <SnackbarContext.Provider value={setMessage}>{children}</SnackbarContext.Provider>

      <SnackbarManager message={message} />
    </>
  );
}

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
