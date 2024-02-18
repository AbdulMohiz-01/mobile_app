import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export const Button = ({ text, onClick, style, textStyle, ...props }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.button, style]}
      {...props}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
