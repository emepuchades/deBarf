import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../Profile/Profile";
import Main from "../Main";
import DrawerComponent from "../../../components/DrawerComponent/DrawerComponent";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { styleNavigator } from "./navigator.style";
import Food from "../Food/Food";
import PetDetails from "../../../components/PetDetails";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Calendar from "../Calendar/Calendar";
import EditPet from "../../../components/EditPet";
import AddFoodScreen from "../../../components/AddFoddScreen";
import EditMenu from "../../../components/EditMenu";
import Calculator from "../Calculator/Calculator";
import Shoplist from "../Profile/Profile";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { t } = useTranslation();
  const size = 22;
  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerComponent {...props} />}
      screenOptions={styleNavigator}
    >
      <Drawer.Screen
        name={t("navBottom.home")}
        component={Main}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(t("navBottom.pets"));
              }}
            >
              <Ionicons name="paw-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name={"Recetas"}
        component={Shoplist}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(t("navBottom.foods"));
              }}
            >
              <Ionicons name="md-nutrition-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name={"Recursos"}
        component={Shoplist}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(t("navBottom.menu"));
              }}
            >
              <Ionicons name="library-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name={"Lista de la compra"}
        component={Shoplist}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(t("navBottom.shoppingList"));
              }}
            >
              <Ionicons name="ios-basket-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name={"PetDetails"}
        component={PetDetails}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLockMode: "locked-closed",
          gestureEnabled: false,
          drawerLabel: () => null,
        }}
      />
      <Drawer.Screen
        name={"EditPet"}
        component={EditPet}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLockMode: "locked-closed",
          gestureEnabled: false,
          drawerLabel: () => null,
        }}
      />
      <Drawer.Screen
        name={"AddFood"}
        component={AddFoodScreen}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLockMode: "locked-closed",
          gestureEnabled: false,
          drawerLabel: () => null,
        }}
      />
      <Drawer.Screen
        name={"EditFood"}
        component={EditMenu}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLockMode: "locked-closed",
          gestureEnabled: false,
          drawerLabel: () => null,
        }}
      />
      <Drawer.Screen
        name={t("navBottom.newPet")}
        component={Calculator}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLockMode: "locked-closed",
          gestureEnabled: false,
          drawerLabel: () => null,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
