/* eslint-disable no-underscore-dangle */
export default class User {
  constructor(userDoc, preauthorizationDoc = { data: () => ({}) }) {
    this.uid = userDoc.id;
    this.userData = userDoc.data();
    this.preauthorizationData = preauthorizationDoc.data();
    this.authProfile = this.userData.authProfile;
    this.authProviders = this.userData.authProviders;
    this._isAssessmentComplete = !!this.userData.isAssessmentComplete;
  }

  get firstName() {
    const { displayName } = this.authProfile;

    return ((
      Object.values(this.authProviders)
        .map(profile => profile.firstName
          || profile.first_name
          || profile.given_name
          || profile.givenName)
        .reduce((a, b) => a || b, null)
      || (displayName.includes(',')
        ? displayName.split(',')[1]
        : displayName.split(' ')[0])
    ).trim());
  }

  get displayName() {
    const { displayName } = this.authProfile;

    return displayName.includes(',')
      ? `${displayName.split(',')[1]} ${displayName.split(',')[0]}`
      : displayName;
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

  get isCoach() {
    return this.preauthorizationData.coach;
  }

  get coachAssignments() {
    return this.preauthorizationData.assignments;
  }

  // a bit hacky to update at runtime this way (vs. binding to DB) but quick and easy
  set isAssessmentComplete(isAssessmentComplete) {
    this._isAssessmentComplete = isAssessmentComplete;
  }
}
