import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Profile from "./Profile/Profile";
import Main from "./Main";
import DrawerComponent from "../../components/DrawerComponent";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import AddPost from "./AddPost/AddPost";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name={t('navBottom.home')}
        component={Main}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('navBottom.foods')}
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-nutrition-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('navBottom.menu')}
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="reader-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('navBottom.shoppingList')}
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-basket-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;