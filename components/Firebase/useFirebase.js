import { useContext } from 'react';
import FirebaseContext from './FirebaseContext';

export default function useFirebase() {
  return useContext(FirebaseContext);
}
