import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Home from './Home/Home';
import AddPost from './AddPost/AddPost';

const Tab = createBottomTabNavigator();

const MyTabs = ({ navigation }) => {
    return (
        <Tab.Navigator
            initialRouteName="Mascotas"
            screenOptions={{
                headerShown: true,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 90,
                },
                tabBarInactiveTintColor: 'grey',
                tabBarActiveTintColor: '#9c4ef7',
            }}
        >
            <Tab.Screen name="Mascotas" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="dog" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Comunidad" component={AddPost}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="contacts" color={color} size={26} />
                    ),
                }} />

            <Tab.Screen name="Publicar" component={AddPost}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Alimentos" component={Home}
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Add")
                    }
                })}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="food-drumstick" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Perfil" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default function Main() {
    return (
        <MyTabs />
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
})