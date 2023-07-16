
import { windowHeight } from "../../../utils/Dimentions";


export const styleFood = {
  container: {
    backgroundColor: "#fff",
    height: windowHeight - 55,
  },
  content: {},
  menuItems: {
    borderBottomColor: "#F5F5F9",
    borderBottomWidth: 1,
    height: 70,
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
    shadowColor: "#000",
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
    color: "#000",
    fontSize: 18,
    margin: 10,
    marginLeft: 22,
    fontWeight: "600",
  },
  searchInput: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
};