/* eslint-disable no-underscore-dangle */

function ucFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export default class User {
  constructor(userDoc) {
    // Firestore ID (generated by Firebase Auth)
    this.uid = userDoc.id;

    // full user document
    this.userData = userDoc.data();

    // values specified by user (generally overrides values obtained by SSO)
    this.userProfile = this.userData.userProfile || {};

    // values obtained by SSO
    this.authProfile = this.userData.authProfile;
    this.authProviders = this.userData.authProviders;
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
    const { displayNameOverride } = this.userProfile;
    const name = displayNameOverride || displayName;

    return (name.includes(',') ? `${name.split(',')[1]} ${name.split(',')[0]}`.trim() : name)
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
    return !!this.userData.isAssessmentComplete;
  }

  get shouldSeeAssesssmentCompletionCelebration() {
    return !!this.userData.shouldSeeAssesssmentCompletionCelebration;
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

  get lastSentimentTimestamp() {
    return this.userData.lastSentiment && this.userData.lastSentiment.timestamp;
  }

  get lastSentimentLabel() {
    return this.userData.lastSentiment && this.userData.lastSentiment.label;
  }

  get lastSentimentCloseTimestamp() {
    return this.userData.lastSentiment && this.userData.lastSentiment.closeTimestamp;
  }

  get isCovidSurveyShown() {
    return !!this.userData.isCovidSurveyShown;
  }
}
