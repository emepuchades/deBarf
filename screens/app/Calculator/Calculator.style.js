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
    marginTop: 10,
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
    color: "white",
  },
  namePet: {
    width: "70%",
    backgroundColor: colors.inputBackground,
    height: 40,
    fontSize: 16,
    padding: 12,
    margin: 10,
    marginLeft: 17,
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
  pickerContainer: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  picker: {
    width: "90%",
    height: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 15,
    width: "100%",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    alignItems: "center",
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
    marginTop: 5,
  },
  weightInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
    height: 40,
    borderRadius: 10,
  },
  weightUnitPicker: {
    width: 140,
  },
  checkBoxContainerText: {
    fontSize: 15,
  },
  guardarButton: {
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: "#4F98FE",
  },
};
