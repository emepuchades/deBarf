import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Home from './Home/Home';
import AddPost from './AddPost/AddPost';
import colors from '../../utils/colors';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Mascotas"
            screenOptions={{
                headerShown: true,
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    height: 90,
                },
                tabBarInactiveTintColor: colors.navColor,
                tabBarActiveTintColor: colors.navHover,
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
                        <MaterialCommunityIcons name="contacts-outline" color={color} size={26} />
                    ),
                }} />

            <Tab.Screen name="Publicar" component={AddPost}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="plus" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Alimentos" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="food-drumstick-outline" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Perfil" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
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

const styles = StyleSheet.create()