import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../Profile/Profile";
import Main from "../Main";
import DrawerComponent from "../../../components/DrawerComponent/DrawerComponent";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { styleNavigator } from "./navigator.style";
import Food from "../Food/Food";
import PetDetails from "../PetDetails/PetDetails";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Calendar from "../Calendar/Calendar";
import EditPet from "../../../components/Edit/EditPet";
import AddFoodScreen from "../AddMeal/AddFoddScreen";
import EditMenu from "../../../components/Edit/EditMenu";
import Calculator from "../Calculator/Calculator";
import Shoplist from "../Profile/Profile";
import Home from "../Home/Home";
import { AuthenticatedUserContext } from "../../../utils/context/context";
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
        component={Home}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <Ionicons name="paw-outline" size={size} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name={t("screen.recipes")}
        component={Shoplist}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <Ionicons name="md-nutrition-outline" size={size} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name={t("screen.resources")}
        component={Shoplist}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        })}
      />
      <Drawer.Screen
        name={t("screen.shoppinglist")}
        component={Shoplist}
        options={({ navigation, route }) => ({
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ios-basket-outline" size={size} color={color} />
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
      <Drawer.Screen
        name={t("navBottom.menu")}
        component={Calendar}
        options={{
          drawerItemStyle: { height: 0 },
          drawerLockMode: "locked-closed",
          gestureEnabled: false,
          hideStatusBar: false,
          drawerLabel: () => null,
        }}
      />
      <Drawer.Screen
        name={"Food"}
        component={Food}
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
