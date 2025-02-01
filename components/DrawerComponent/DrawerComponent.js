import React, { useContext, useEffect, useState } from "react";
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
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { styleDrawer } from "./drawerComponent.style";
import { lightTheme } from "../../utils/theme";
import { Picker } from "@react-native-picker/picker";
import DualButtonTab from "../DualButtonTab";
import { languages, parseLanguages } from "../../utils/info/languages";
import { AuthenticatedUserContext } from "../../utils/context/context";
import { getLanguage, updateLanguage } from "../../utils/db/dbLanguage";
import { supabase } from "../../utils/db/supabaseClient";
import { useNavigation } from "@react-navigation/native";

const DrawerComponent = (props) => {
  const { t, i18n } = useTranslation();
  const { db, user, session } = useContext(AuthenticatedUserContext);
  const navigation = useNavigation();
  const [currentLanguages, setLanguage] = useState("es-ES");
  const [selectedTabKg, setSelectedTabKg] = useState(true);

  useEffect(() => {
    async function initDB() {
      const isLanguage = await getLanguage(db);
      console.log('isLanguage', isLanguage);
      setLanguage(isLanguage.data.code);
    }
    initDB();
  }, []);

  useEffect(() => {
    async function update() {
      await updateLanguage(db, currentLanguages, parseLanguages(currentLanguages));
    }
    update();
  }, [currentLanguages]);

  const currentLanguagei18 = (value) => {
    i18n
      .changeLanguage(parseLanguages(value))
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  const onSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log("Signed out!");
    }
    if (error) {
      alert(error.message);
    }
  };
  const handleActivityChange = (value) => {
    currentLanguagei18(value);
  };
  const updateKg = () => {
    setSelectedTabKg(!selectedTabKg);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: lightTheme.colors.backgroundSecondary }}
      >
        <View style={styles.listNavigaton}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.navContainer}>
        <Text style={styles.titleSection}>{t("drawer.settings")}</Text>
        <View style={styles.navBottom}>
          <Picker
            style={styles.buttons}
            selectedValue={currentLanguages}
            onValueChange={handleActivityChange}
          >
            {languages.map((language, index) => (
              <Picker.Item
                key={index}
                label={language.label}
                value={language.value}
              />
            ))}
          </Picker>
          <DualButtonTab
            style={styles.buttons}
            onClick={updateKg}
            activeTab={selectedTabKg}
            leftButtonText={t("kilos")}
            rightButtonText={t("pounds")}
          />
        </View>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.buttons}>
          <View style={styles.containerSignOut}>
            <AntDesign name="setting" size={22} color="black" />
            <Text style={styles.textSignOut}>{t("drawer.ajustes_privacidad")}</Text>
          </View>
        </TouchableOpacity>
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
