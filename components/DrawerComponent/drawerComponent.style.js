import { lightTheme } from "../../utils/theme";

export const styleDrawer = {
  listNavigation: {
    flex: 1,
    backgroundColor: lightTheme.colors.backgroundSecondary,
    paddingTop: 15,
  },
  navBottom: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: lightTheme.colors.secondary,
  },
  titleSection: {
    color: lightTheme.colors.primary,
    fontWeight: "bold",
    fontSize: 17,
    paddingBottom: 10,
  },
  navContainer: {
    paddingLeft: 15,
  },
  textSignOut: {
    fontSize: 15,
    marginLeft: 5,
    padding: 15,
    color: lightTheme.colors.text,
  },
  containerSignOut: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    paddingVertical: 4,
  },
  listNavigaton: {
    paddingTop: 20,
    backgroundColor: lightTheme.colors.backgroundSecondary,
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
