import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View, Text } from 'react-native';
const width = Dimensions.get('window').width;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const PhotoComponent = ( {uri }) => {

    function renderDefault() {
        return (
            <View style={styles.container}>
                <MaterialCommunityIcons name="image-off" size={20} style={styles.iconProfile} />
                <Text style={styles.textDefault}>No hay imagen</Text>
            </View>
        )
    }

    function renderImage() {
        return (
            <View style={styles.containerImage}>
                <Image
                    resizeMode='contain'
                    style={styles.chosenImage}
                    source={{ uri: uri}} />
            </View>

        )
    }

    return (
        <>
            {uri ? renderImage() : renderDefault()}
        </>
    )

}

export default PhotoComponent;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        width: '97%',
        backgroundColor: 'white',
        paddingBottom: 20,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 1,
        borderColor: "#F9F9F9",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 15,
    },
    textDefault: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSize: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    chosenImage: {
        width: '96%',
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerImage: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
    }
})