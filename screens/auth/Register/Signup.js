import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { styleRegister } from "./Signup.style";
import { useTranslation } from "react-i18next";
import {
  validateInputs,
  handleFeedback,
} from "../../../utils/functions/registerErrors";
const backImage = require("../../../assets/images/login.jpg");
import { supabase } from "../../../utils/db/supabaseClient";
import PrivacyPolicyModal from "../PrivacyPolicy/PrivacyPolicy";
import Icon from "react-native-vector-icons/Feather";
import Terms from "../../../components/Terms/Terms";

export default function Signup({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(null);

  const openModal = (modalName) => setModalVisible(modalName);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onHandleSignup = async () => {
    if (!validateInputs({ email, password, isSelected, t })) return;

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            accepted_terms: isSelected,
          },
        },
      });

      if (error) {
        const errorMessage = error?.message || error?.name || null;
        handleFeedback({ type: "error", key: errorMessage, t });
      } else {
        handleFeedback({ type: "success", t });
        navigation.navigate("Login");
        Alert.alert(t("welcome.title"), t("welcome.message"), [
          {
            text: t("welcome.button"),
            onPress: () => {
              console.log("");
            },
          },
        ]);
      }
    } catch (e) {
      console.error("Error inesperado:", e);
      handleFeedback({ type: "error", t });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet}>
        <SafeAreaView style={styles.form}>
          <Text style={styles.title}>{t(`signup.title`)}</Text>
          <TextInput
            style={styles.input}
            placeholder={t(`signup.inputEmail`)}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPass}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!isPasswordVisible}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={styles.eyeIcon}
            >
              <Icon
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contarinerPP}>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={[styles.checkBox, isSelected && styles.checkBoxSelected]}
                onPress={() => setSelection(!isSelected)}
              >
                {isSelected && <Text style={styles.checkBoxText}>✓</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModal("terms")}>
                <View style={styles.containerTerms}>
                  <Text style={styles.regularText}>
                    {t(`signup.privacy_policy`)}{" "}
                    <Text
                      style={[
                        styles.linkText,
                        isSelected && styles.linkTextSelected,
                      ]}
                    >
                      {t(`settings.terms_conditions`)}
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.containerPolicy}>
              <TouchableOpacity onPress={() => openModal("privacy")}>
                <Text style={styles.regularText}>
                  {t(`signup.check`)}{" "}
                  <Text
                    style={[
                      styles.linkText,
                      isSelected && styles.linkTextSelected,
                    ]}
                  >
                    {t(`signup.privacy_policy_link`)}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onHandleSignup}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.textInput}>{t(`signup.button`)}</Text>
            )}
          </TouchableOpacity>

          <View style={styles.containerLogIn}>
            <Text style={styles.textSecondary}>{t(`signup.subtitle`)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.textLogIn}>{t(`signup.login`)}</Text>
            </TouchableOpacity>
          </View>
          <Toast />
        </SafeAreaView>
      </View>
      <StatusBar barStyle="light-content" />
      <Terms
        isVisible={modalVisible === "terms"}
        onClose={() => setModalVisible(null)}
        onAccept={() => setModalVisible(null)}
      />
      <PrivacyPolicyModal
        isVisible={modalVisible === "privacy"}
        onClose={() => setModalVisible(null)}
        onAccept={() => setModalVisible(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create(styleRegister);
