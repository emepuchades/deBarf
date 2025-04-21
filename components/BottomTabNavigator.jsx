import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AuthenticatedUserContext } from "../utils/context/context";
import { lightTheme } from "../utils/theme";

function BottomTabNavigator() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { bottomTabSelected, setBottomTabSelected } = useContext(
    AuthenticatedUserContext
  );

  const handleChangeNavigator = (number, redirect) => {
    setBottomTabSelected(number)
    navigation.navigate(redirect);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={bottomTabSelected === 0 ? styles.tabSelected : styles.tab}
          onPress={() => handleChangeNavigator(0, t("navBottom.home"))}
        >
          <MaterialCommunityIcons
            name="dog"
            size={22}
            style={
              bottomTabSelected === 0 ? styles.tabIconSelected : styles.tabIcon
            }
          />
          <Text
            style={
              bottomTabSelected === 0 ? styles.textTabSelected : styles.textTab
            }
          >
            {t("navBottom.pets")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={bottomTabSelected === 1 ? styles.tabSelected : styles.tab}
          onPress={() => handleChangeNavigator(1, t("navBottom.menu"))}
        >
          <Ionicons
            name="md-calendar-sharp"
            size={20}
            style={
              bottomTabSelected === 1 ? styles.tabIconSelected : styles.tabIcon
            }
          />
          <Text
            style={
              bottomTabSelected === 1 ? styles.textTabSelected : styles.textTab
            }
          >
            {t("navBottom.planner")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={bottomTabSelected === 2 ? styles.tabSelected : styles.tab}
          onPress={() => handleChangeNavigator(2, "Recursos")}
        >
          <Ionicons
            name="flame-outline"
            size={20}
            style={
              bottomTabSelected === 2 ? styles.tabIconSelected : styles.tabIcon
            }
          />
          <Text
            style={
              bottomTabSelected === 2 ? styles.textTabSelected : styles.textTab
            }
          >
            {t("navBottom.picks")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={bottomTabSelected === 3 ? styles.tabSelected : styles.tab}
          onPress={() => navigation.navigate(t("screen.food"))}
        >
          <MaterialCommunityIcons
            name="food-drumstick-outline"
            size={20}
            style={
              bottomTabSelected === 3 ? styles.tabIconSelected : styles.tabIcon
            }
          />
          <Text
            style={
              bottomTabSelected === 3 ? styles.textTabSelected : styles.textTab
            }
          >
            {t("navBottom.foods")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: lightTheme.colors.backgroundSecondary,
    paddingBottom: 10,
    width: "100%",
    height: 60,
    position: "relative",
    bottom: 0,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  tabSelected: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: lightTheme.colors.primary,
    color: lightTheme.colors.primary,
  },
  tabIconSelected: {
    color: lightTheme.colors.primary,
  },
  tabIcon: {
    color: lightTheme.colors.iconMenu,
  },
  textTab: {
    fontSize: 13,
    color: lightTheme.colors.iconMenu,
  },
  textTabSelected: {
    fontSize: 13,
    color: lightTheme.colors.primary,
    fontWeight: "bold",
  },
});
