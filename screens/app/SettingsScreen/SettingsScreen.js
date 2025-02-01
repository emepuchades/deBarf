import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { styleSettings } from "./settingsScreen.style";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const MenuItem = ({ icon, title, hasChevron = false, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemContent}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {hasChevron && <AntDesign name="right" size={20} color="#666" />}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("drawer.ajustes_privacidad")}</Text>
      </View>

      <ScrollView style={styles.content}>
        <SectionHeader title={t("settings.section_header")} />
        <MenuItem
          title={t("settings.terms_conditions")}
          onPress={() => navigation.navigate("PushNotifications")}
        />
        <MenuItem
          title={t("drawer.privacy_policy")}
          onPress={() => navigation.navigate("LiveEvents")}
        />
        <MenuItem
          title={t("drawer.faq")}
          onPress={() => navigation.navigate("LiveEvents")}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create(styleSettings);
