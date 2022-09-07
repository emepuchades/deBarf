import React from 'react';
import { Text, View, StyleSheet } from 'react-native'

export default function RegisterScreen({ navigation })  {
    return (
        <View style={styles.container}>
            <Text style={styles.title1}>Register</Text>
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
    title1: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
});
