import { windowHeight, windowWidth } from "../../../utils/Dimentions";
import colors from "../../../utils/colors";

export const styleHome = {
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    padding: 10,
    marginBottom: 70,
  },
  settingsContainer: {
    width: windowWidth,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 50,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 65,
    backgroundColor: "#92AEF1",
    borderRadius: 28,
  },
  tinyLogo: {
    height: 140,
    width: 140,
  },
  containerNewPet: {
    flex: 1,
    alignItems: "center",
    margin: 8,
    fontSize: 18,
  },
  addPetTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 15,
  },
  imagePet: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  petText: {
    fontSize: 16,
  },
  deleteButtonContainer: {
    position: "absolute",
    top: 25,
    right: 15,
  },
  settingsButtonContainer: {
    position: "absolute",
    top: 25,
    right: 55,
  },
  tabsContainer: {
    padding: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#ffffff",
    height: 70,
    margin: 5,
  },
  tabsContainerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  tabButtonSectionFood: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    margin: 5,
    width: "46%",
  },
  activeTabSectionFood: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    textAlign: "center",
  },
  tabButtonText: {
    color: "#626A72",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  activeTabButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
};
