import { windowHeight } from "../../../utils/Dimentions";
import colors from "../../../utils/colors";

export const styleHome = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    padding: 10,
    height: windowHeight,
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
    bottom: 20,
    backgroundColor: colors.secondary,
    borderRadius: 28,
  },
  tinyLogo: {
    height: 140,
    width: 140,
  },
  containerNewPet: {
    flex: 1,
    alignItems: "center",
    margin: 35,
    fontSize: 18,
  },
  addPetTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
};
