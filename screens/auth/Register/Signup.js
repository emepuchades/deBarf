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
import {getAuth,  createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { handleFirebaseError } from "../../../utils/functions/firebaseErrors";
import { showToast } from "../../../components/Toast/Toast";
import { styleRegister } from "./Signup.style";
import { useTranslation } from "react-i18next";
const backImage = require("../../../assets/images/login.jpg");
import { supabase } from "../../../utils/db/supabaseClient";

export default function Signup({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSelected, setSelection] = useState(false);
  
  const onHandleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, llena todos los campos.');
      return;
    }

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        Alert.alert('Error', error.message); // Muestra un mensaje de error en caso de fallo
      } else {
        Alert.alert('Éxito', 'Usuario registrado correctamente. Verifica tu correo.');
        navigation.navigate('Login'); // Navega al login después de un registro exitoso
      }
    } catch (error) {
      Alert.alert('Error', error.message);
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
