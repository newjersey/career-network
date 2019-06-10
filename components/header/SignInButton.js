import Button from '@material-ui/core/Button';
import React from 'react';

import { useSignInDialog } from '../SignInDialog';

export default function SignInButton() {
  const setIsSignInDialogOpen = useSignInDialog();

  const handleClick = () => setIsSignInDialogOpen(true);

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      Sign in
    </Button>
  );
}
