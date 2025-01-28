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
} from "react-native";
import { styleLogin } from "./Login.style";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import {
  handleFeedback,
  validateInputs,
} from "../../../utils/functions/loginErrors";
import { supabase } from "../../../utils/db/supabaseClient";

const backImage = require("../../../assets/images/signin.jpg");
import { AuthenticatedUserContext } from "../../../utils/context/context";

export default function Login({ navigation }) {
  const { t } = useTranslation();
  const { setUser } = useContext(AuthenticatedUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = async () => {
    if (!validateInputs({ email, password, t })) return;

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
          <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
            <Text style={styles.textInput}>{t(`login.button`)}</Text>
          </TouchableOpacity>
          <View style={styles.containerLogIn}>
            <Text style={styles.textSecondary}>{t(`login.subtitle`)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.textSignIn}>{t(`login.login`)}</Text>
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
