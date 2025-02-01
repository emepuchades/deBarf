import { lightTheme } from "../../../utils/theme";


export const styleSettings = {
    container: {
        flex: 1,
        backgroundColor: lightTheme.colors.backgroundSecondary,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: 16,
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: lightTheme.colors.settings.border,
      },
      backButton: {
        padding: 8,
        marginRight: 8,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: lightTheme.colors.text,
      },
      content: {
        flex: 1,
      },
      sectionHeader: {
        fontSize: 12,
        fontWeight: '600',
        color: lightTheme.colors.textSecondary,
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 8,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: lightTheme.colors.settings.borderItem,
      },
      menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuItemText: {
        fontSize: 16,
        marginLeft: 12,
        color: lightTheme.colors.text,
      },
};