import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { styleLanding } from "./Landing.style";

export default function Landing({ navigation }) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title1}>{t(`landig.title`)}</Text>
        <Text style={styles.description}>{t(`landig.subtitle`)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>{t(`landig.register`)}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>{t(`landig.login`)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(styleLanding);
