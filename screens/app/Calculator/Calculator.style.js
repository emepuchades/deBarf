import { Dimensions } from "react-native";
import { lightTheme } from "../../../utils/theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const styleCalculator = {
  container: {
    backgroundColor: lightTheme.colors.background,
    height: windowHeight - 140,
    width: windowWidth,
    padding: lightTheme.dimensions.paddingHorizontal,
  },
  tinyLogo: {
    height: 35,
    width: 35,
  },
  containerPetInfo: {
    flexDirection: "row",
    backgroundColor: lightTheme.colors.background,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  titleEligeType: {
    fontSize: 17,
    fontWeight: "bold",
    color: lightTheme.colors.textPrimary,
  },
  containerSelectPet: {
    marginBottom: 20,
  },
  petNameTitle: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 16,
    fontWeight: "bold",
    color: lightTheme.colors.textPrimary,
  },
  petNameConatiner: {
    width: "92%",
  },
  petImage: {
    width: "12%",
    height: 100,
    resizeMode: "contain",
    flex: 1,
  },
  petImageContainer: {
    position: "absolute",
    bottom: -9,
    width: "100%",
    backgroundColor: "#919191",
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  changePetImageText: {
    textAlign: "center",
    fontSize: 13,
    color: lightTheme.colors.textButton,
  },
  namePet: {
    width: "70%",
    backgroundColor: lightTheme.colors.inputBackground,
    height: lightTheme.dimensions.inputHeight,
    fontSize: 16,
    padding: 12,
    margin: 10,
    marginLeft: 17,
    borderRadius: lightTheme.dimensions.borderRadius,
  },
  containerDate: {
    marginBottom: 20,
    flex: 1,
  },
  textDateBirth: {
    fontSize: 16,
    color: lightTheme.colors.textPrimary,
  },
  textDateBirthTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: lightTheme.colors.textPrimary,
  },
  containerDateText: {
    flexDirection: "row",
    flex: 1,
  },
  weigthTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: lightTheme.colors.textPrimary,
  },
  weightPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  weightPicker: {
    alignItems: "center",
  },
  selectActivityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: lightTheme.colors.textPrimary,
  },
  pickerItem: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: lightTheme.dimensions.borderRadius,
    height: 30,
  },
  pickerItemText: {
    fontSize: 18,
    color: lightTheme.colors.textPrimary,
  },
  pickerContainer: {
    borderRadius: lightTheme.dimensions.borderRadius,
    overflow: "hidden",
    marginBottom: 20,
  },
  picker: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 15,
    width: "100%",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: lightTheme.dimensions.borderRadius,
    marginRight: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    alignItems: "center",
    color: lightTheme.colors.textPrimary,
  },
  buttonPressed: {
    backgroundColor: lightTheme.colors.primary,
  },
  buttonTextPressed: {
    color: lightTheme.colors.textButton,
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  datePicker: {
    backgroundColor: lightTheme.colors.primary,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 3,
    paddingHorizontal: 10,
  },
  checkBox: {
    width: 18,
    height: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkBoxSelected: {
    backgroundColor: lightTheme.colors.primary,
  },
  checkBoxText: {
    fontSize: 13,
    color: lightTheme.colors.textButton,
  },
  weightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  weightInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    height: 40,
    borderRadius: lightTheme.dimensions.borderRadius,
  },
  weightUnitPicker: {
    width: 140,
  },
  checkBoxContainerText: {
    fontSize: 15,
    color: lightTheme.colors.textPrimary,
  },
  guardarButton: {
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: lightTheme.colors.primary,
  },
};
