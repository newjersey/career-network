import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';

export default function useSnackbar() {
  return useContext(SnackbarContext);
}
