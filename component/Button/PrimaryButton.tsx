import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { theme } from "constants/theme";
const PrimaryButton = ({
  text,
  onClick,
  width
}) => {
  
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.button, { width: width ? width : "80%" }]}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.primary_color,
    paddingVertical: 18,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 9999,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PrimaryButton;
