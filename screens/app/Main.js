import * as React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Home from "./Home/Home";
import ProfileScreen from "./Profile/Profile";
import Calendar from "./Calendar/Calendar";
import colors from "../../utils/colors";
import { useTranslation } from "react-i18next";
import Calculator from "./Calculator/Calculator";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      initialRouteName={t("navBottom.pets")}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: Platform.OS === "ios" ? 60 : 60,
          paddingBottom: 6,
        },
        tabBarInactiveTintColor: colors.navColor,
        tabBarActiveTintColor: colors.navHover,
      }}
    >
      <Tab.Screen
        name={t("navBottom.pets")}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="dog" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={t("navBottom.newPet")}
        component={Calculator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={t("navBottom.planner")}
        component={Calendar}
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-calendar-sharp" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Main() {
  return <MyTabs />;
}

const styles = StyleSheet.create();
