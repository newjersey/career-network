import { useContext } from 'react';
import SignInDialogContext from './SignInDialogContext';

export default function useSignInDialog() {
  return useContext(SignInDialogContext);
}
