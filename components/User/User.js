import Router from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';

export default class User {
  constructor(authUser) {
    this.authUser = authUser;
  }

  get displayName() {
    return this.authUser.displayName;
  }

  get email() {
    return this.authUser.email;
  }

  get emailVerified() {
    return this.authUser.emailVerified;
  }

  get isAnonymous() {
    return this.authUser.isAnonymous;
  }

  get photoURL() {
    return this.authUser.photoURL;
  }

  get uid() {
    return this.authUser.uid;
  }

  signOut = () => {
    firebase.auth().signOut();
    Router.push('/');
  }
}
