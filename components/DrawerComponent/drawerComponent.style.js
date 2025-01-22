import { lightTheme } from "../../utils/theme";

export const styleDrawer = {
  imageProfile: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  textUsername: {
    color: lightTheme.colors.primary,
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  imageBackground: {
    padding: lightTheme.dimensions.paddingHorizontal,
  },
  listNavigation: {
    flex: 1,
    backgroundColor: lightTheme.colors.primary,
    paddingTop: 15,
  },
  navBottom: {
    paddingTop: 10,
    paddingLeft: 2,
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.secondary,
  },
  titleSection: {
    color: lightTheme.colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 10,
  },
  navContainer: {
    padding: 15,
  },
  textSignOut: {
    fontSize: 15,
    marginLeft: 5,
    padding: 15,
    color: lightTheme.colors.textSecondary,
  },
  containerSignOut: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    paddingVertical: 8,
  },
  listNavigaton: {
    paddingTop: 35,
  },
  versionContainer: {
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  versionText: {
    textAlign: "center",
    paddingLeft: "25%",
    color: lightTheme.colors.textSecondary,
  },
};
