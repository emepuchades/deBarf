import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { styleAddPost } from './AddPost.style';
import Preview from './Preview';
import CameraComponent from '../../../components/Camera/Camera';

const AddPost = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [uploadSource, setUploadSource] = useState(null);
    const [isCamera, setisCamera] = useState(null);
    const [isPreview, setIsPreview] = useState(false);

    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                alert("You've refused to allow this appp to access your photos!");
                return;
            }
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
            setIsPreview(true)
        } else {
            alert('Imagen no seleccionada')
        }

    };

    const takePicture = async () => {
        const data = await camera.takePictureAsync(null);
        setUploadSource(data.uri);
        setImage(data.uri);
        setisCamera(false)
        setIsPreview(true)
    };

    return (
        !isPreview ?
            <View style={styles.container}>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContentContainer}>
                    <CameraComponent
                        takePicture={takePicture}
                        setCamera={setCamera}
                        setType={setType}
                        type={type}
                        pickImage={pickImage}
                    />
                </ScrollView>
            </View>
            :
            <>
                <Preview 
                    image={image}
                />
            </>
    );
}

export default AddPost;

const styles = StyleSheet.create(styleAddPost)