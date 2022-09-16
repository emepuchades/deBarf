import colors from "../../../utils/colors";

export const styleRegister = {
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.secondary,
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: colors.inputBackground,
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: colors.background,
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: colors.secondary,
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    textInput: {
        fontWeight: 'bold', 
        color: colors.textButton, 
        fontSize: 18 
    },
    textSecondary: {
        color: colors.textSecondary,
        fontWeight: '600',
        fontSize: 14 
    },
    containerLogIn: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    textLogIn: {
        color: colors.secondary,
        fontWeight: '600',
        fontSize: 14 
    },
}