import Toast from "react-native-toast-message";

export const showToast = ({ type = "success", title = "", message = "", autoHide = true, duration = 6000 }) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    visibilityTime: duration,
    autoHide,
    position: "bottom",
  });
};