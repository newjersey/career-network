import firebase from 'firebase';

export default class UserPreAuthorizations {
  constructor(userRef, preAuthRef) {
    this.userRef = userRef;
    this.preAuthRef = preAuthRef;
  }

  apply() {
    if (this.missingOrAlreadyApplied()) {
      return;
    }

    this.userRef.ref.set(this.preAuthRef.data(), { merge: true });
    this.preAuthRef.ref.set(
      {
        mergeTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      },
      { merge: true }
    );
  }

  missingOrAlreadyApplied() {
    return (
      !UserPreAuthorizations.documentExists(this.userRef) ||
      !UserPreAuthorizations.documentExists(this.preAuthRef) ||
      this.preAuthRef.data().mergeTimestamp
    );
  }

  static documentExists(doc) {
    return doc && doc.exists;
  }
}
