import firebase from 'firebase/app';
import config from './config';

// Singleton
export default firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(config);
