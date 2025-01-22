import { Platform } from "react-native";

export const lightTheme = {
  colors: {
    background: "#F9F9F9",
    backgroundSecondary: "#FFFFFF",
    primary: "#4A90E2",
    secondary: "#6C757D",
    accent: "#FFD700",
    textPrimary: "#333333",
    textSecondary: "#666666",
    buttonText: "#FFFFFF",
    border: "#E5E5E5",
  },
  fonts: {
    regular: "MonaSans-Regular",
    bold: "MonaSans-Bold",
  },
  dimensions: {
    borderRadius: 10,
    paddingHorizontal: 20,
    buttonHeight: 50,
  },
  shadows: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
};
