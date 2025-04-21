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
import { styleTerms } from "./Terms.style";

const Terms = ({ isVisible, onClose, onAccept }) => {
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
          <ScrollView style={styles.content}>
            <Text style={styles.title}>{t("terms.title")}</Text>
            <Text style={styles.version}>{t("terms.version")}</Text>

            <Text style={styles.sectionTitle}>{t("terms.usageTitle")}</Text>
            <Text style={styles.bodyText}>{t("terms.usageText")}</Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={onAccept}
            >
              <Text style={styles.acceptButtonText}>{t("terms.accept")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create(styleTerms);

export default Terms;
