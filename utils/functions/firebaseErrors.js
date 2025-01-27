
export const handleFirebaseError = (error, t) => {

    if (!error || !error.code) {
    return t("firebaseErrors.unexpectedError");
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return t("firebaseErrors.emailAlreadyInUse");
    case "auth/invalid-email":
      return t("firebaseErrors.invalidEmail");
    case "auth/weak-password":
      return t("firebaseErrors.weakPassword");
    case "auth/network-request-failed":
      return t("firebaseErrors.networkError");
    default:
      return t("firebaseErrors.unexpectedError");
  }
};

export const handleFirebaseLoginError = (error, t) => {

  if (!error || !error.code) {
    return t("firebaseErrors.unexpectedError");
  }

  switch (error.code) {
    case "auth/invalid-email":
      return t("firebaseErrors.invalidEmail");
    case "auth/user-not-found":
      return t("firebaseErrors.userNotFound");
    case "auth/wrong-password":
      return t("firebaseErrors.wrongPassword");
    case "auth/network-request-failed":
      return t("firebaseErrors.networkError");
    case "auth/too-many-requests":
      return t("firebaseErrors.tooManyRequests");
    default:
      return t("firebaseErrors.unexpectedError");
  }
};
