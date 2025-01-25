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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/db/firebase";
import { styleRegister } from "./Signup.style";
import { useTranslation } from "react-i18next";
const backImage = require("../../../assets/images/login.jpg");

export default function Signup({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);

  const onHandleSignup = async () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Signup success"))
        .catch((err) => {
          console.log("err", err);
          Alert.alert("Login error", err.message);
        });
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
        </SafeAreaView>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create(styleRegister);
