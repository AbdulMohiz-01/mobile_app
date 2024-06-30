import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { navigate } from "navigation/NavigationService";
import { PrimaryButton, Input, ErrorModal } from "component";
import { theme } from "constants/theme";
import { FormData } from "model/signupForm";
import { createUser } from "service/screens/signupService";
import { Response } from "model/response";

const SignupScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(true);
  const [buttonText, setButtonText] = useState("Sign Up");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("password", formData.password);
    validateField("confirmPassword", formData.confirmPassword);
  }, [formData]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateField = (fieldName: keyof FormData, value: string) => {
    let formErrors: Partial<FormData> = { ...errors };

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          formErrors.name = "Name is required";
        } else if (value.length < 3) {
          formErrors.name = "Name must be at least 3 characters";
        } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(value)) {
          formErrors.name = "Name is invalid";
        } else {
          delete formErrors.name;
        }
        break;
      case "email":
        if (!value.trim()) {
          formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          formErrors.email = "Email is invalid";
        } else {
          delete formErrors.email;
        }
        break;
      case "password":
        if (!value.trim()) {
          formErrors.password = "Password is required";
        } else if (value.length < 6) {
          formErrors.password = "Password must be at least 6 characters";
        } else {
          delete formErrors.password;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          formErrors.confirmPassword = "Passwords do not match";
        } else {
          delete formErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(formErrors);
  };

  const handleSignup = async () => {
    if (Object.keys(errors).length === 0) {
      // Perform signup logic
      setButtonText("Signing Up...");
      const response: Response = await createUser(formData);
      if (response.status) {
        navigate("Login", {});
      } else {
        // Handle error
        setButtonText("Sign Up");
        setShowModal(true);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputView}>
          <Input
            value={formData.name}
            onChangeText={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter your name"
            beforeIcon="user"
            isValid={!errors.name}
            onBlur={() => validateField("name", formData.name)}
          />
          {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
        </View>
        <View style={styles.inputView}>
          <Input
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
            placeholder="Enter your email"
            beforeIcon="email"
            isValid={!errors.email}
            onBlur={() => validateField("email", formData.email)}
          />
          {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
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
          />
          {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
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
          />
          {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
        </View>
        <View style={styles.hiddenSpace}></View>
        <PrimaryButton text={buttonText} onClick={handleSignup} width={null} disable={buttonText !== "Sign Up"} />
        <TouchableOpacity onPress={() => navigate("Login", {})}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>

        {/* {
          showModal && <ErrorModal text={"Signup failed"} dismissText={"OK"} onDismiss={() => setShowModal(false)} />
        } */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    color: theme.primary_color,
  },
  inputView: {
    marginTop: 10,
  },
});

export default SignupScreen;
