import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ErrorMessage = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});

export default ErrorMessage;
