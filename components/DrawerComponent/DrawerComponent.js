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
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { styleDrawer } from "./drawerComponent.style";
import colors from "../../utils/theme";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/db/firebase";
import { Picker } from "@react-native-picker/picker";
import DualButtonTab from "../DualButtonTab";
import { languages, parseLanguages } from "../../utils/info/languages";
import { AuthenticatedUserContext } from "../../utils/context/context";
import { getLanguage, updateLanguage } from "../../utils/db/dbLanguage";
const DrawerComponent = (props) => {
  const { t, i18n } = useTranslation();
  const { db } = useContext(AuthenticatedUserContext);

  // getLanguage(db).tag
  const [currentLanguages, setLanguage] = useState("es-ES");
  const [selectedTabKg, setSelectedTabKg] = useState(true);

  useEffect(() => {
    async function initDB() {
      const isLanguage = await getLanguage(db);
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

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
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
        contentContainerStyle={{ backgroundColor: colors.primary }}
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
        <Text style={styles.titleSection}>{t("drawer.help")}</Text>
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
                {t("drawer.faq")}
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
                {t("drawer.privacy_policy")}
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
