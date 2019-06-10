import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SignInDialog from './SignInDialog';
import SignInDialogContext from './SignInDialogContext';

export default function SpackbarProvider(props) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleCancel = () => setIsOpen(false);

  return (
    <React.Fragment>
      <SignInDialogContext.Provider value={handleOpen}>
        {children}
      </SignInDialogContext.Provider>
      <SignInDialog open={isOpen} onCancel={handleCancel} />
    </React.Fragment>
  );
}

SpackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
