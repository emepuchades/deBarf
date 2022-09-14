import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const PhotoComponent = ({ uri }) => {

    return (
        <View style={styles.containerImage}>
            <Image
                resizeMode='contain'
                style={styles.chosenImage}
                source={{ uri: uri }} />
        </View>
    )

}

export default PhotoComponent;

const styles = StyleSheet.create({
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
})