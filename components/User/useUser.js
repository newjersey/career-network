import { useContext } from 'react';
import UserContext from './UserContext';

export default function useUser() {
  return useContext(UserContext);
}
