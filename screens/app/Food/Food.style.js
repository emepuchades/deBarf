
import { windowHeight } from "../../../utils/Dimentions";
import { windowWidth } from "../../../utils/Dimentions";


export const styleFood = {
  container: {
    backgroundColor: "#fff",
    height: windowHeight - 85,
  },
  content: {},
  menuItems: {
    height: 60,
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
  },
  foodContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#ffffff",
    flex: 1,
    flexDirection: "row",
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
  },
  type: {
    color: "white",
    fontSize: 18,
    margin: 10,
    marginLeft: 22,
    fontWeight: "600",
  },
  typeContainer: {
    marginTop: 10,
    height: 70,
  },
  searchInput: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
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
    marginTop: 10,
    marginBottom: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
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
};