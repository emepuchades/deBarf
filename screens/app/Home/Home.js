import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../../utils/colors';
import { styleHome } from "./Home.style";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    return (

        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContentContainer}>
                <TouchableOpacity style={styles.dogBlock} onPress={() => navigation.navigate("Calculator")}>
                    <AntDesign name="plus" size={35} style={styles.icon} />
                    <Text style={styles.text} >{t('newpet')}</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create(styleHome);