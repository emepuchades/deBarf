import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';

const ButtonComponent = ({ onPress, icon, text }) => (
    <TouchableOpacity onPress={onPress} style={styles.dogBlock}>
        { icon === 'camera' ?
            <Image source={require('../assets/images/camera.png')} style={styles.image} />
            :
            <Image source={require('../assets/images/gallery.png')} style={styles.image} />
        }
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>

)
export default ButtonComponent;

const styles = StyleSheet.create({
    dogBlock: {
        borderRadius: 5,
        width: '45%',
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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
    text: {
        textAlign: 'center',
        marginTop: 10,
    },
    icon: {
        textAlign: 'center',
    },
    image: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})