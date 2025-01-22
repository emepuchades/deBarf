import { Dimensions } from "react-native";
import { lightTheme } from "../../../utils/theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const styleLogin = {
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: lightTheme.colors.secondary,
    alignSelf: "center",
    paddingBottom: 24,
    fontFamily: lightTheme.fonts.bold,
    textAlign: "center",
  },
  input: {
    backgroundColor: lightTheme.colors.inputBackground,
    height: lightTheme.dimensions.inputHeight,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: lightTheme.dimensions.borderRadius,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    color: lightTheme.colors.textPrimary,
    fontFamily: lightTheme.fonts.regular,
  },
  backImage: {
    width: windowWidth,
    height: windowHeight * 0.4,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: lightTheme.colors.background,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: lightTheme.dimensions.paddingHorizontal,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: lightTheme.dimensions.paddingHorizontal,
  },
  button: {
    backgroundColor: lightTheme.colors.secondary,
    height: lightTheme.dimensions.buttonHeight,
    borderRadius: lightTheme.dimensions.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    ...lightTheme.shadows,
  },
  textInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: lightTheme.colors.textButton,
    fontFamily: lightTheme.fonts.bold,
    textAlign: "center",
  },
  textSecondary: {
    color: lightTheme.colors.textSecondary,
    fontSize: 14,
    fontFamily: lightTheme.fonts.regular,
    textAlign: "center",
    marginTop: 10,
  },
  containerLogIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  textSignIn: {
    color: lightTheme.colors.secondary,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: lightTheme.fonts.regular,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
};
