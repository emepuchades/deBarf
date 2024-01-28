import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import colors from "../../../utils/colors";

export const styleCalculator = {
  container: {
    backgroundColor: "#ffffff",
    height: windowHeight - 140,
    width: windowWidth,
    padding: 20,
    marginBottom: 20,
  },
  tinyLogo: {
    height: 40,
    width: 40,
  },
  containerPetInfo: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  titleEligeType: {
    fontWeight: "bold",
  },
  containerSelectPet: {
    marginBottom: 20,
  },
  petNameTitle: {
    marginLeft: 20,
    marginTop: 30,
    fontWeight: "bold",
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  namePet: {
    width: "100%",
    backgroundColor: colors.inputBackground,
    height: 45,
    marginBottom: 20,
    fontSize: 16,
    padding: 12,
    margin: 20,
    borderRadius: 10,
  },
  containerDate: {
    marginBottom: 20,
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
  pickerItem: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 30,
  },
  pickerItemText: {
    fontSize: 18,
    color: "#000",
  },
  picker: {
    width: "90%",
    height: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "left",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,

    borderColor: "#000",
  },
  buttonText: {
    fontSize: 16,
  },
  buttonPressed: {
    backgroundColor: "#000",
  },
  buttonTextPressed: {
    color: "#fff",
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkBox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkBoxSelected: {
    backgroundColor: "#000",
  },
  checkBoxText: {
    color: "#fff",
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  weightInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  weightInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: colors.inputBackground,
    height: 45,
    borderRadius: 10,
  },
  weightUnitPicker: {
    width: 140,
  },
  guardarButton: {
    margin: 20,
  },
};
