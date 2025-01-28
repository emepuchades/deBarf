import { showToast } from "../../components/Toast/Toast";

export const handleFeedback = ({ type = "success", key = "", t, customMessage = "" }) => {
  const supabaseErrors = {
    AuthWeakPasswordError: t("signup.weakPassword"),
    "Password should be at least 6 characters.": t("signup.weakPassword"),
    "Unable to validate email address: invalid format": t("signup.invalidEmail"),
    "User already registered": t("signup.userExists"),
  };

  const validationErrors = {
    emptyFields: t("signup.fillFields"),
    privacyPolicy: t("signup.acceptPrivacyPolicy"),
  };

  const messages = {
    errors: {
      default: t("signup.unexpectedError"),
    },
    success: {
      title: t("signup.success"),
      message: t("signup.verifyEmail"),
    },
  };

  const title = type === "success" ? messages.success.title : t("signup.error");
  const message =
    customMessage || 
    validationErrors[key] ||
    supabaseErrors[key] ||
    messages.errors.default;

  showToast({
    type,
    title,
    message,
  });
};

export const validateInputs = ({ email, password, isSelected, t }) => {
  if (!email || !password) {
    handleFeedback({ type: "error", key: "emptyFields", t });
    return false;
  }

  if (!isSelected) {
    handleFeedback({ type: "error", key: "privacyPolicy", t });
    return false;
  }

  return true;
};
