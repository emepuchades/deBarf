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
import { styleFaq } from "./Faq.style";

const FAQ = ({ isVisible, onClose }) => {
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
            <Text style={styles.title}>{t("faq.title")}</Text>

            <Text style={styles.sectionTitle}>{t("faq.q1")}</Text>
            <Text style={styles.bodyText}>{t("faq.a1")}</Text>

            <Text style={styles.sectionTitle}>{t("faq.q2")}</Text>
            <Text style={styles.bodyText}>{t("faq.a2")}</Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>{t("faq.close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create(styleFaq );

export default FAQ;
