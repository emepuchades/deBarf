import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import styleLanding from './Landing.style'
import { windowWidth } from '../../utils/Dimentions';
import colors from '../../utils/colors';
import { useTranslation } from "react-i18next";

export default function Landing({ navigation }) {
    const { t } = useTranslation();

    return (
      <View style={styles.container}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title1}>{t(`landig.title`)}</Text>
        <Text style={styles.description}>{t(`landig.subtitle`)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={styles.buttonR}
          >
            <Text style={styles.textR}>{t(`landig.register`)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.buttonL}
          >
            <Text style={styles.textL}>{t(`landig.login`)}</Text>
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
        backgroundColor: colors.background,
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
        color: colors.textDefault,
    },
    description: {
        fontSize: 12,
        color: colors.textSecondary,
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
        backgroundColor: colors.secondary,
        ...Platform.select({
            ios: {
                shadowColor: colors.colorText,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.16,
            },
            android: {
                elevation: 4,
            },
        }),
        position: 'relative',
    },
    textR: {
        textTransform: 'uppercase',
        fontWeight: '500',
        color: colors.textButton,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textL: {
        textTransform: 'uppercase',
        fontWeight: '500',
        color: colors.textButtonOutline,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonL: {
        width: windowWidth - 100,
        padding: 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: colors.textButton,
        borderColor: colors.secondary,
        borderWidth: 1,
        position: 'relative',
    },
    text: {
        color: colors.textButton,
    }});
