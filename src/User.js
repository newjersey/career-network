export default class User {
  constructor(authResult) {
    this.authResult = authResult;
  }

  get firstName() {
    const { profile } = this.authResult.additionalUserInfo;
    const { displayName } = this.authResult.user;
    const firstName = profile.first_name
      || profile.given_name
      || profile.givenName
      || (displayName.includes(',')
        ? displayName.split(',')[1]
        : displayName.split(' ')[0]);

    return firstName.trim();
  }

  get displayName() {
    const { displayName } = this.authResult.user;

    return displayName.includes(',')
      ? `${displayName.split(',')[1]} ${displayName.split(',')[0]}`
      : displayName;
  }

  get email() {
    return this.authResult.user.email;
  }

  get emailVerified() {
    return this.authResult.user.emailVerified;
  }

  get isAnonymous() {
    return this.authResult.user.isAnonymous;
  }

  get photoURL() {
    return this.authResult.user.photoURL;
  }

  get uid() {
    return this.authResult.user.uid;
  }
}
