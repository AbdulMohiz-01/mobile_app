import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { navigate } from "navigation/NavigationService";
import { PrimaryButton, Input } from "component";
import { theme } from "constants/theme";
import { FormData } from "model/signupForm";
import { createUser } from "service/screens/signupService";
import { Response } from "model/response";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-gifted-charts/src/Components/common/LinearGradient";

const SignupScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<{ [key in keyof FormData]?: boolean }>({});
  const [showPassword, setShowPassword] = useState(true);
  const [buttonText, setButtonText] = useState("Sign Up");
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (fieldName: keyof FormData, value: string): string => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Name is required";
        } else if (value.length < 3) {
          errorMessage = "Name must be at least 3 characters";
        } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
          errorMessage = "Name is invalid";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMessage = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Email is invalid";
        }
        break;
      case "password":
        if (!value.trim()) {
          errorMessage = "Password is required";
        } else if (value.length < 8) {
          errorMessage = "Password must be at least 8 characters";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          errorMessage = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: errorMessage }));
    return errorMessage;
  };

  const handleBlur = (fieldName: keyof FormData) => {
    setTouched((prevTouched) => ({ ...prevTouched, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };

  const handleBlurConfirmPassword = () => {
    setTouched((prevTouched) => ({ ...prevTouched, confirmPassword: true }));
    if (formData.password && formData.confirmPassword !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const handleSignup = async () => {
    // Validate all fields
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const passwordError = validateField("password", formData.password);
    const confirmPasswordError = formData.password !== formData.confirmPassword ? "Passwords do not match" : "";

    if (nameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setButtonText("Signing Up...");

    try {
      const response: Response = await createUser(formData);
      if (response.status) {
        setModalMessage("Signup successful. Please login to continue.");
        setModalVisible(true);
        setButtonText("Sign Up");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        navigate("Login", {});
      } else {
        setModalMessage(response.message || "Signup failed. Please try again.");
        setModalVisible(true);
        setButtonText("Sign Up");
      }
    } catch (error) {
      setModalMessage("An error occurred during signup. Please try again.");
      setModalVisible(true);
      setButtonText("Sign Up");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#fff", theme.primary_color]}
          style={styles.gradientContainer}
        ></LinearGradient>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputView}>
          <Input
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter your name"
            beforeIcon="user"
            isValid={!errors.name}
            onBlur={() => handleBlur("name")}
          />
          {touched.name && errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        </View>
        <View style={styles.inputView}>
          <Input
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            placeholder="Enter your email"
            beforeIcon="email"
            isValid={!errors.email}
            onBlur={() => handleBlur("email")}
          />
          {touched.email && errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
        </View>
        <View style={styles.inputView}>
          <Input
            value={formData.password}
            onChangeText={(value) => setFormData({ ...formData, password: value })}
            placeholder="Enter your password"
            secureTextEntry={showPassword}
            beforeIcon="password"
            afterIcon="eye"
            toggleSecureTextEntry={toggleShowPassword}
            isPassword={true}
            onBlur={() => handleBlur("password")}
          />
          {touched.password && errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
        </View>
        <View style={styles.inputView}>
          <Input
            value={formData.confirmPassword}
            onChangeText={(value) => setFormData({ ...formData, confirmPassword: value })}
            placeholder="Confirm Password"
            secureTextEntry={showPassword}
            beforeIcon="password"
            isValid={!errors.confirmPassword}
            isPassword={true}
            onBlur={handleBlurConfirmPassword}
          />
          {touched.confirmPassword && errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
        </View>
        <View style={styles.hiddenSpace}></View>
        <PrimaryButton text={buttonText} onClick={handleSignup} width={null} disable={buttonText !== "Sign Up"} />
        <TouchableOpacity onPress={() => navigate("Login", {})}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} animationIn="zoomIn" animationOut="zoomOut">
          <View style={styles.modalContent}>
            <Icon name="error-outline" size={40} color="red" />
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenSpace: {
    height: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  error: {
    color: "red",
    marginBottom: 5,
  },
  link: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  inputView: {
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
  modalButton: {
    color: theme.primary_color,
    fontSize: 16,
    marginTop: 10,
  },
});

export default SignupScreen;
