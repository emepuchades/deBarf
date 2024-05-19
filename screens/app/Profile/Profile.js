import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import BottomTabNavigator from "../../../components/BottomTabNavigator";
import { StyleSheet } from "react-native";

const Profile = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <BottomTabNavigator />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
