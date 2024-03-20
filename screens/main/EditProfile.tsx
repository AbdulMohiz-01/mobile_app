import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { navigate } from "navigation/NavigationService";
import { PrimaryButton, Input, ErrorModal } from "component";
import { theme } from "constants/theme";
import { EditProfileFormData, FormData } from "model/signupForm";
import { editUser, invalidAlert } from "service/screens/signupService";
import { Response } from "model/response";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { login } from "redux/slice/userSlice";



const EditProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [formData, setFormData] = useState<EditProfileFormData>({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(true);
  const [buttonText, setButtonText] = useState("Update Profile");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    validateField("name", formData.name);
    validateField("email", formData.email);
    validateField("password", formData.password);
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

      default:
        break;
    }

    setErrors(formErrors);
  };

  const handleSignup = async () => {
    if (Object.keys(errors).length === 0) {
      // Perform signup logic
      setButtonText("Updating...");
      const response = await editUser(formData, user);
      if (response.status) {
        dispatch(login({ user: { ...user, name: formData.name, email: formData.email, password: formData.password } }));
        navigate("Main", {});
        console.log("hello")
      } else {
        // Handle error
        setButtonText("Update Profile");
        // show error modal
        invalidAlert(response.message);
      }
    } else {
      // Show error
      invalidAlert("Invalid input");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
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


      <PrimaryButton text={buttonText} onClick={handleSignup} width={null} disable={buttonText == "Update Profile" ? false : true} />
      {/* <TouchableOpacity onPress={() => navigate("Login", {})}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity> */}

      {/* {
        !showModal && <ErrorModal text={"Signup failed"} dismissText={"OK"} onDismiss={() => setShowModal(false)} />
      } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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

export default EditProfile;
