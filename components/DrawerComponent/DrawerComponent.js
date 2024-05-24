import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import "../../languages/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { styleDrawer } from "./drawerComponent.style";
import colors from "../../utils/colors";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/db/firebase";
import { Picker } from "@react-native-picker/picker";
import DualButtonTab from "../DualButtonTab";

const DrawerComponent = (props) => {
  const { t, i18n } = useTranslation();

  const [currentLanguage, setLanguage] = useState("es");
  const [selectedTabKg, setSelectedTabKg] = useState(true);

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  const handleActivityChange = (value) => {
    changeLanguage(value);
  };
   const updateKg = () => {
     setSelectedTabKg(!selectedTabKg);
   };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.primary }}
      >
        <View style={styles.listNavigaton}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.navContainer}>
        <Text style={styles.titleSection}>Settings</Text>
        <View style={styles.navBottom}>
          <Picker
            style={styles.buttons}
            selectedValue={currentLanguage}
            onValueChange={handleActivityChange}
          >
            <Picker.Item label={t("languages.es")} value="es" />
            <Picker.Item label={t("languages.en")} value="en" />
          </Picker>
          <DualButtonTab
            style={styles.buttons}
            onClick={updateKg}
            activeTab={selectedTabKg}
            leftButtonText="KG"
            rightButtonText="Libras"
          />
        </View>
        <Text style={styles.titleSection}>Help</Text>
        <View style={styles.navBottom}>
          <View>
            <TouchableOpacity
              onPress={() => console.log()}
              style={styles.buttons}
            >
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                }}
              >
                FAQ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log()}
              style={styles.buttons}
            >
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                }}
              >
                Politica de privacidad
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => onSignOut()} style={styles.buttons}>
          <View style={styles.containerSignOut}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={styles.textSignOut}>{t("navBottom.signOut")}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>version 1.2.0</Text>
      </View>
    </View>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create(styleDrawer);
