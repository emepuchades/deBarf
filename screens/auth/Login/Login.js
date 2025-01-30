import React, { useState, useContext } from "react";
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
  ActivityIndicator,
} from "react-native";
import { styleLogin } from "./Login.style";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import {
  handleFeedback,
  validateInputs,
} from "../../../utils/functions/loginErrors";
import { supabase } from "../../../utils/db/supabaseClient";
import Icon from "react-native-vector-icons/Feather";
const backImage = require("../../../assets/images/signin.jpg");
import { AuthenticatedUserContext } from "../../../utils/context/context";

export default function Login({ navigation }) {
  const { t } = useTranslation();
  const { setUser } = useContext(AuthenticatedUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onHandleLogin = async () => {
    if (!validateInputs({ email, password, t })) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("errors", error);
        const errorMessage =
          error?.message || error?.name || "Invalid credentials";
        handleFeedback({ type: "error", key: errorMessage, t });
      } else if (!data) {
        handleFeedback({ type: "error", key: "invalidCredentials", t });
      } else {
        setUser(data);
        handleFeedback({ type: "success", t });
      }
    } catch (e) {
      console.error("Error inesperado:", e);
      handleFeedback({ type: "error", t });
    } finally {
      setIsLoading(false);
    }
  };

  const revertPassword = async () => {
    if (!email) {
      Alert.alert(t(`login.errorResetEmail`), t(`login.enterEmail`));
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://my-barf.vercel.app/reset-password",
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(t(`login.emailSent`), t(`login.checkInbox`));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet}>
        <SafeAreaView style={styles.form}>
          <Text style={styles.title}>{t(`login.title`)}</Text>
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
              placeholder={t(`signup.inputPassword`)}
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

          <View style={styles.containerReset}>
            <Text style={styles.textSecondary}>
              {t(`login.forgotPassword`)} /{" "}
            </Text>
            <TouchableOpacity onPress={revertPassword}>
              <Text style={styles.textSignIn}>{t(`login.reset`)}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onHandleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.textInput}>{t(`login.button`)}</Text>
            )}
          </TouchableOpacity>

          <View style={styles.containerLogIn}>
            <Text style={styles.textSecondary}>{t(`login.subtitle`)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.textSignIn}> {t(`login.login`)}</Text>
            </TouchableOpacity>
          </View>

          <Toast />
        </SafeAreaView>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create(styleLogin);
