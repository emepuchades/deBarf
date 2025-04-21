import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";
import { stylePolicy } from "./PrivacyPolicy.style";

const PrivacyPolicyModal = ({ isVisible, onClose, onAccept }) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>{t("privacy.title")}</Text>
            <Text style={styles.version}>{t("privacy.version")}</Text>
            <Text style={styles.sectionTitle}>{t("privacy.sectionTitle")}</Text>
            <Text style={styles.bodyText}>{t("privacy.bodyText")}</Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={onAccept}
            >
              <Text style={styles.acceptButtonText}>{t("privacy.accept")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create(stylePolicy);

export default PrivacyPolicyModal;
