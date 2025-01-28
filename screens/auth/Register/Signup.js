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
} from "react-native";
import Toast from "react-native-toast-message";
import { styleRegister } from "./Signup.style";
import { useTranslation } from "react-i18next";
import { validateInputs, handleFeedback } from "../../../utils/functions/registerErrors";
const backImage = require("../../../assets/images/login.jpg");
import { supabase } from "../../../utils/db/supabaseClient";

export default function Signup({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);
  
  const onHandleSignup = async () => {
    if (!validateInputs({ email, password, isSelected, t })) return;

    try {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) {
        const errorMessage = error?.message || error?.name || null;
        handleFeedback({ type: "error", key: errorMessage, t });
      } else {
        handleFeedback({ type: "success", t });
        navigation.navigate("Login");
      }
    } catch (e) {
      console.error("Error inesperado:", e);
      handleFeedback({ type: "error", t });
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
          <TextInput
            style={styles.input}
            placeholder={t(`signup.inputPassword`)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.contarinerPP}>
            <TouchableOpacity
              style={[styles.checkBox, isSelected && styles.checkBoxSelected]}
              onPress={() => setSelection(!isSelected)}
            >
              {isSelected && <Text style={styles.checkBoxText}>✓</Text>}
            </TouchableOpacity>
            <Text style={[isSelected && styles.checkBoxTextSelected]}>
              {t(`signup.privacy_policy`)}
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
            <Text style={styles.textInput}>{t(`signup.button`)}</Text>
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
    </View>
  );
}
const styles = StyleSheet.create(styleRegister);
