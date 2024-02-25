import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useColorScheme } from "react-native";
import { theme } from "constants/theme";
import { icons } from "constants/paths";


const IconButton = ({
  text,
  icon,
  onClick,
  width,
  backgroundColor,
  textColor,
}) => {
  const colorScheme = useColorScheme();
  const colors = theme[colorScheme];

  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.button,
        { width: width ? width : "80%", backgroundColor: backgroundColor || colors.primary_color },
      ]}
    >
      {icon && (
        <Image source={icons[icon]} style={styles.buttonIcon} />
      )}
      {
        text &&
        <Text style={[styles.buttonText, { color: textColor || colors.primary_text }]}>
          {text}
        </Text>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 26,
    justifyContent: "center",
    marginVertical: 5,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: theme.google_button_border_color,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginRight: 10,
    width: 20,
    height: 20,
  },
});

export default IconButton;
