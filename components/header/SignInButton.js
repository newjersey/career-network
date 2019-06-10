import Button from '@material-ui/core/Button';
import React from 'react';

import { useSignInDialog } from '../SignInDialog';

export default function SignInButton() {
  const openSignInDialog = useSignInDialog();

  return (
    <Button variant="contained" color="secondary" onClick={openSignInDialog}>
      Sign in
    </Button>
  );
}
