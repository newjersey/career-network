import Button from '@material-ui/core/Button';
import React from 'react';

import { useAuth } from '../Auth';

export default function SignInButton() {
  const { showSignIn } = useAuth();

  const handleClick = () => showSignIn(true);

  return (
    <Button variant="contained" color="secondary" onClick={handleClick}>
      Sign in
    </Button>
  );
}
