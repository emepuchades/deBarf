import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, ScrollView, Text, TouchableOpacity, TextInput } from 'react-native';
import { Camera } from 'expo-camera';
import ButtonComponent from '../../../components/ButtonComponent';
import PhotoComponent from '../../../components/PhotoComponent';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Preview from './Preview';
import CameraComponent from '../../../components/Camera/Camera';

const AddPost = ({ navigate }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [uploadSource, setUploadSource] = useState(null);
    const [isCamera, setisCamera] = useState(null);
    const [isPreview, setIsPreview] = useState(null);

    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
        })();
    }, []);

    if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setUploadSource(result.uri);
            setImage(result.uri);
        }

    };
    const takePicture = async () => {
        const data = await camera.takePictureAsync(null);
        setUploadSource(data.uri);
        setImage(data.uri);
        setisCamera(false)
    };
    const takePhoto = async () => {
        setisCamera(true)
    };

    const savePost = async () => {
        if (image) {
            setIsPreview(true)
        } else {
            alert('Debes hacer una imagen para poder continuar')
        }
    };


    return (
        !isPreview ?
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}>

                    {isCamera ?
                        <CameraComponent
                            takePicture={takePicture}
                            setCamera={setCamera}
                            setType={setType}
                            type={type}
                        />
                        :
                        <View style={{ padding: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <ButtonComponent onPress={() => takePhoto()} icon='camera' text='Hacer una foto' />
                                <ButtonComponent onPress={() => pickImage()} icon='image' text='Galeria' />
                            </View>

                            <PhotoComponent uri={uploadSource} />

                            <View style={styles.containerButtons}>
                                <Button title="Vista Previa" onPress={() => savePost()} />
                                <Button title="Publicar" onPress={() => savePost()} />
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>

            :
            <>
                <Preview />
            </>
    );
}

export default AddPost;

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