import React from 'react';
import { Text, View, Button, Platform, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { windowHeight, windowWidth } from '../../utils/Dimentions';

export default function Landing({ navigation })  {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title1}>Barfeando</Text>
            <Text style={styles.description}>Alimentar bien a tu animal nunca fue tan fácil</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.buttonR}>
                    <Text style={styles.textR}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.buttonL}>
                    <Text style={styles.textL}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        paddingTop: 130,
        backgroundColor: 'white',
        height: '100%'
    },
    logo: {
        height: 245,
        width: 220,
        resizeMode: 'cover',
    },
    title1: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    description: {
        fontSize: 12,
        color: 'grey',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
    },
    buttonR: {
        width: windowWidth - 100,
        padding: 20,
        margin: 10,
        borderRadius: 20,
        fontWeight: '400',
        color: 'white',
        backgroundColor: '#9c4ef7',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.16,
            },
            android: {
                elevation: 4,
            },
        }),
        //boxShadow: 'inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17)',
        position: 'relative',
    },
    textR: {
        textTransform: 'uppercase',
        fontWeight: '500',
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textL: {
        textTransform: 'uppercase',
        fontWeight: '500',
        color: '#9c4ef7',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonL: {
        width: windowWidth - 100,
        padding: 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: '#9c4ef7',
        borderWidth: 1,
        position: 'relative',
    },
    text: {
        color: 'white',
    }
});
