import React from 'react';
import { StyleSheet, View,  TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CameraComponent = ({ takePicture, setCamera, setType, type }) => {

    return (
        <View>
            <Camera
                ref={ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                ratio={'1:1'} />
            <View style={styles.buttonContentCamera}>
                <TouchableOpacity onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                    );
                }}
                >
                    <MaterialCommunityIcons name="camera-switch" size={35} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => takePicture()} >
                    <MaterialCommunityIcons name="camera" size={35} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <MaterialCommunityIcons name="flash" size={35} />
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default CameraComponent;

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})

