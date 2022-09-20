import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Profile from "../Profile/Profile";
import Main from "../Main";
import DrawerComponent from "../../../components/DrawerComponent/DrawerComponent";
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { styleNavigator } from "./navigator.style";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t } = useTranslation();
  const size = 22

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponent {...props} />}
      screenOptions={styleNavigator}>
      <Drawer.Screen
        name={t('navBottom.home')}
        component={Main}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('navBottom.foods')}
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="md-nutrition-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('navBottom.menu')}
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="reader-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('navBottom.shoppingList')}
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-basket-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;