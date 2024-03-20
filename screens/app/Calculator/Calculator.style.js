import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import colors from "../../../utils/colors";

export const styleCalculator = {
  container: {
    backgroundColor: "#ffffff",
    height: windowHeight - 140,
    width: windowWidth,
    padding: 20,
  },
  tinyLogo: {
    height: 35,
    width: 35,
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
    fontSize: 17,
    fontWeight: "bold",
  },
  containerSelectPet: {
    marginBottom: 20,
  },
  petNameTitle: {
    marginLeft: 20,
    marginTop: 30,
    fontSize: 16,
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
    flex: 1,
  },
  textDateBirth: {
    fontSize: 16,
  },
  textDateBirthTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  containerDateText: {
    flex: 1,
    flexDirection: "row",
  },
  weigthTitle: {
    fontSize: 16,
    fontWeight: "bold",
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
    marginTop: 15,
  },
  button: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: "#fAfAfA",
  },
  buttonText: {
    fontSize: 16,
  },
  buttonPressed: {
    backgroundColor: "#4F98FE",
  },
  buttonTextPressed: {
    color: "#fff",
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  datePicker: {
    backgroundColor: "#4F98FE",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
    backgroundColor: "#4F98FE",
  },
  checkBoxText: {
    fontSize: 13,
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
  checkBoxContainerText: {
    fontSize: 15,
  },
  guardarButton: {
    margin: 20,
    marginBottom: 40,
    backgroundColor: "#4F98FE",
  },
};
