import { Dimensions } from "react-native";
import { lightTheme } from "../../../utils/theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const styleRegister = {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: lightTheme.colors.background,
  },
  title: {
    fontSize: 32,
    color: lightTheme.colors.title,
    alignSelf: "center",
    paddingBottom: 24,
    fontFamily: lightTheme.fonts.bold,
    textAlign: "center",
  },
  input: {
    backgroundColor: lightTheme.colors.backgroundSecondary,
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
    justifyContent: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: lightTheme.dimensions.paddingHorizontal,
    marginTop: 20,
  },
  button: {
    backgroundColor: lightTheme.colors.primary,
    height: lightTheme.dimensions.buttonHeight,
    borderRadius: lightTheme.dimensions.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    ...lightTheme.shadows,
  },
  textInput: {
    fontSize: 16,
    fontWeight: "bold",
    color: lightTheme.colors.buttonText,
    fontFamily: lightTheme.fonts.regular,
    textAlign: "center",
  },
  textSecondary: {
    color: lightTheme.colors.textSecondary,
    fontSize: 14,
    fontFamily: lightTheme.fonts.regular,
    textAlign: "center",
  },
  containerLogIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  textLogIn: {
    color: lightTheme.colors.secondary,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: lightTheme.fonts.regular,
    textDecorationLine: "underline",
    marginLeft: 5,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    backgroundColor: lightTheme.colors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkBoxSelected: {
    backgroundColor: lightTheme.colors.primary,
    borderWidth: 0,
  },
  checkBoxText: {
    fontSize: 13,
    color: lightTheme.colors.backgroundSecondary,
    fontFamily: lightTheme.fonts.regular,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxTextSelected: {
    fontFamily: lightTheme.fonts.bold,
  },
  contarinerPP: {
    flexDirection: "column",
    paddingLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center", // Alinea verticalmente
  },
  containerTerms: {
  },
  containerPolicy: {
    flexDirection: "row", // Asegura que el texto fluya correctamente
    flexWrap: "wrap",
    marginTop: 5, // Espaciado para estar en la línea de abajo
  },
  regularText: {
    fontSize: 14,
    color: "#333",
  },
  regularTextPrivacy: {
    marginTop: 5,
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    fontSize: 14,
    color: "#4a4a4a",
    textDecorationLine: "underline",
    marginLeft: 4,
  },
  linkTextSelected: {
    fontWeight: "bold",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  inputPass: {
    flex: 1,
    paddingRight: 40,
    backgroundColor: lightTheme.colors.backgroundSecondary,
    height: lightTheme.dimensions.inputHeight,
    fontSize: 16,
    borderRadius: lightTheme.dimensions.borderRadius,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: lightTheme.colors.border,
    color: lightTheme.colors.textPrimary,
    fontFamily: lightTheme.fonts.regular,
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    height: "100%",
    justifyContent: "center",
  },
};
