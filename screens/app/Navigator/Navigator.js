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
              <Ionicons name="ios-basket-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name={t("navBottom.foods")}
        component={Food}
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
        name={t("navBottom.menu")}
        component={Calendar}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(t("navBottom.menu"));
              }}
            >
              <Ionicons name="reader-outline" size={size} color={color} />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name={t("navBottom.shoppingList")}
        component={Calendar}
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
