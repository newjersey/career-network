import firebase from 'firebase/app';
import 'firebase/auth';

import app from './app';

class Firebase {
  constructor() {
    this.app = app;
    this.auth = firebase.auth;
  }

  // onAuthStateChanged = (callback) => {
  //   this.auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       this.user(authUser.uid)
  //         .once('value')
  //         .then(snapshot => {
  //           const dbUser = snapshot.val();

  //           // default empty roles
  //           if (!dbUser.roles) {
  //             dbUser.roles = {};
  //           }

  //           // merge auth and db user
  //           authUser = {
  //             uid: authUser.uid,
  //             email: authUser.email,
  //             emailVerified: authUser.emailVerified,
  //             providerData: authUser.providerData,
  //             ...dbUser,
  //           };

  //           next(authUser);
  //         });
  //     }

  //     callback(authUser);
  //   });
  // }
}

export default Firebase;
