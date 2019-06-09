import Button from '@material-ui/core/Button';
import React, { useState } from 'react';

import SignInDialog from './SignInDialog';

function SignInButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <React.Fragment>
      <Button variant="contained" color="secondary" onClick={() => setIsDialogOpen(true)}>
        Sign in
      </Button>
      <SignInDialog open={isDialogOpen} onCancel={() => setIsDialogOpen(false)} />
    </React.Fragment>
  );
}

export default SignInButton;
