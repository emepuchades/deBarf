import { windowHeight } from "../../../utils/Dimentions";
import { windowWidth } from "../../../utils/Dimentions";

export const styleFood = {
  container: {
    backgroundColor: "#fAfAfA",
    height: windowHeight - 85,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  rowContainer: {},
  menuItems: {
    height: 80,
    marginLeft: 10,
  },
  textMenu: {
    width: 34,
    height: 20,
    paddingBottom: 15,
  },
  imageFood: {
    marginRight: 50,
    marginLeft: 25,
    paddingLeft: 20,
    marginTop: 10,
  },
  foodContainer: {
    width: "43%",
    margin: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 10,
    shadowColor: "#c1c1c1",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#fff",
  },
  foodText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  type: {
    color: "white",
    fontSize: 21,
    marginLeft: 22,
    fontWeight: "600",
  },
  typeContainer: {
    height: 60,
  },
  searchInput: {
    flex: 1,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 5,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: "white",
  },
  searchContainerInput: {
    flex: 1,
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: "white",
  },
  searchIcon: {
    marginRight: 10,
  },
  imageContainerMenu: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 5,
    width: 185,
    height: 40,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconMenu: {
    width: 35,
    height: 35,
    marginRight: 5,
  },
  textMenu: {
    color: "#111111",
    textAlign: "center",
  },
  menuItem: {
    padding: 6,
    borderRadius: 5,
  },
};