export default class User {
  constructor(userDoc) {
    this.uid = userDoc.id;
    this.userData = userDoc.data();
    this.authProfile = this.userData.authProfile;
    this.authProviders = this.userData.authProviders;
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
}
