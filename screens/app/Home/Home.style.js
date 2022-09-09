import colors from '../../../colors'

export const styleHome = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    scrollContentContainer: {
        paddingTop: 40,
        paddingBottom: 50,
    },
    dogBlock: {
        width: '100%',
        borderRadius: 5,
        borderTopWidth: 3,
        flexDirection: "row",
        flexWrap: "wrap",
        borderTopColor: '#9c4ef7',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor: 'white',
        padding: 30,
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 15,
    },
    text: {
        marginTop: 8,
        marginLeft: 10,
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50,
    }
}