import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Home from './Home/Home';
import AddPost from './AddPost/AddPost';
import ProfileScreen from './Profile/Profile'
import colors from '../../utils/colors';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
    const { t } = useTranslation();

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
            <Tab.Screen name={t('navBottom.pets')} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="dog" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen name={t('navBottom.community')} component={AddPost}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="contacts-outline" color={color} size={size} />
                    ),
                }} />

            <Tab.Screen name={t('navBottom.newPost')} component={AddPost}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="plus" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen name={t('navBottom.foods')} component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="food-drumstick-outline" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen name={t('navBottom.profile')} component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
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