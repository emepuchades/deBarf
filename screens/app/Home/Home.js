import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { auth } from '../../../utils/firebase';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../../../colors';
import { styleHome } from "./Home.style";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={() => onSignOut()}
                >
                    <MaterialIcons name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
                </TouchableOpacity>

            ),
        });
    }, [navigation]);

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
                    <Text style={styles.text} >Añade a tu animal</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create(styleHome);