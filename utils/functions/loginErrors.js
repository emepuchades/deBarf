import { showToast } from "../../components/Toast/Toast";

export const handleFeedback = ({ type = "success", key = "", t, customMessage = "" }) => {
  const supabaseErrors = {
    AuthInvalidCredentialsError: t("login.invalidCredentials"),
    "Invalid login credentials": t("login.invalidCredentials"),
    "User not found": t("login.userNotFound"),
    "Incorrect email or password": t("login.invalidCredentials"),
  };

  const messages = {
    errors: {
      default: t("login.unexpectedError"),
      emptyFields: t("login.emptyFields"),
    },
    success: {
      title: t("login.success"),
      message: t("login.welcomeBack"),
    },
  };

  const title = type === "success" ? messages.success.title : t("login.error");
  const message =
    customMessage ||
    supabaseErrors[key] ||
    messages.errors[key] ||
    messages.errors.default;

  showToast({
    type,
    title,
    message,
  });
};

export const validateInputs = ({ email, password, t }) => {
  if (!email || !password) {
    handleFeedback({ type: "error", key: "emptyFields", t });
    return false;
  }
  return true;
};
