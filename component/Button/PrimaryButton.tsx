import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { theme } from "constants/theme";
import { Image } from "react-native";
import { loaders } from "constants/paths";
const PrimaryButton = ({
  text,
  onClick,
  width,
  disable = false,
  isLoading = false,
}) => {

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.button, { width: width ? width : "80%" }]}
      disabled={disable}
    >
      {
        isLoading && <Image source={loaders["circle"]} style={{ width: 30, height: 30 }} />
      }
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.primary_color,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 9999,
    gap: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  }
});

export default PrimaryButton;
