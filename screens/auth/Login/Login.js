import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/db/firebase";
import { styleLogin } from "./Login.style";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { showToast } from "../../../components/Toast/Toast";
import { handleFirebaseLoginError } from "../../../utils/functions/firebaseErrors";
const backImage = require("../../../assets/images/signin.jpg");
import { supabase } from "../../../utils/db/supabaseClient";

import { AuthenticatedUserContext } from "../../../utils/context/context";

export default function Login({ navigation }) {
  const { t } = useTranslation();
  const { user, setUser, db } = useContext(AuthenticatedUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = async () => {
    console.log('email', email)
    console.log('password', password)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (!error && !data) {
      alert("Check your email for the login link!");
    } else {
      setUser(data);
      console.log("userLogged", data.user);
    }
    if (error) {
      alert(error.message);
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
