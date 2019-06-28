import firebase from 'firebase/app';

// Singleton
export default firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(process.env.firebase);
