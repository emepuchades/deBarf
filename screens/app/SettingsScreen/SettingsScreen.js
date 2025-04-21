import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import PrivacyPolicyModal from "../../auth/PrivacyPolicy/PrivacyPolicy";
import Terms from "../../../components/Terms/Terms";
import Faq from "../../../components/FAQ/Faq";
import { styleSettings } from "./settingsScreen.style";

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

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(null);

  const openModal = (modalName) => setModalVisible(modalName);
  const closeModal = () => setModalVisible(null);

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
          onPress={() => openModal("terms")}
        />
        <MenuItem
          title={t("drawer.privacy_policy")}
          onPress={() => openModal("privacy")}
        />
        <MenuItem
          title={t("drawer.faq")}
          onPress={() => openModal("faq")}
        />
      </ScrollView>

      <PrivacyPolicyModal
        isVisible={modalVisible === "privacy"}
        onClose={closeModal}
        onAccept={closeModal}
      />
      <Terms
        isVisible={modalVisible === "terms"}
        onClose={closeModal}
        onAccept={closeModal}
      />
      <Faq
        isVisible={modalVisible === "faq"}
        onClose={closeModal}
        onAccept={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create(styleSettings);
