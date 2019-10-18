/* eslint-disable no-underscore-dangle */

function ucFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default class User {
  constructor(userDoc) {
    this.uid = userDoc.id;
    this.userData = userDoc.data();
    this.authProfile = this.userData.authProfile;
    this.authProviders = this.userData.authProviders;
    this._isAssessmentComplete = !!this.userData.isAssessmentComplete;
  }

  get firstName() {
    const { displayName } = this.authProfile;

    return ucFirst(
      Object.values(this.authProviders)
        .map(
          profile =>
            profile.firstName || profile.first_name || profile.given_name || profile.givenName
        )
        .reduce((a, b) => a || b, null) ||
        (displayName.includes(',') ? displayName.split(',')[1] : displayName.split(' ')[0])
    ).trim();
  }

  get displayName() {
    const { displayName } = this.authProfile;

    return (displayName.includes(',')
      ? `${displayName.split(',')[1]} ${displayName.split(',')[0]}`.trim()
      : displayName
    )
      .split(' ')
      .map(str => ucFirst(str))
      .join(' ');
  }

  get email() {
    return this.authProfile.email;
  }

  get emailVerified() {
    return this.authProfile.emailVerified;
  }

  get isAnonymous() {
    return this.authProfile.isAnonymous;
  }

  get photoURL() {
    return this.authProfile.photoURL;
  }

  get isAssessmentComplete() {
    return this._isAssessmentComplete;
  }

  get isAdmin() {
    return !!this.userData.isAdmin;
  }

  get isCoach() {
    return !!this.userData.isCoach;
  }

  get coachAssignments() {
    return this.userData.assignments;
  }

  get intercomUserHash() {
    return this.userData.intercomUserHash;
  }

  get creationTimestamp() {
    return this.userData.creationTimestamp;
  }

  get lastSignInTimestamp() {
    return this.userData.lastSignInTimestamp;
  }

  get lastUpdateTimestamp() {
    return this.userData.lastUpdateTimestamp;
  }
}
