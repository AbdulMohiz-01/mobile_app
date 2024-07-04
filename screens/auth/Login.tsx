import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { navigate } from "navigation/NavigationService";
import { Login } from "service/screens/loginService";
import { PrimaryButton, Input, IconButton } from "component";
import { theme } from "constants/theme";
import { Response } from "model/response";
import { Role } from "model/role";
import { login, loadUserFromStorage } from "redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from "constants/paths";
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LoginScreen: React.FC = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user); // Select user from Redux state
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const toggleSecureTextEntry = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const loadUserFromStorageAsync = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          dispatch(loadUserFromStorage({ user: JSON.parse(userData) }));
        }
      } catch (error) {
        console.error('Failed to load user data from storage:', error);
      }
    };

    loadUserFromStorageAsync();

    if (user) {
      navigate("MainStack", {});
    }
  }, [user, dispatch]);

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      setModalMessage("Email and password are required.");
      setModalVisible(true);
      return;
    }

    setLoading(true);

    try {
      let response: Response = await Login(data.email, data.password);
      if (response.status && response.data.role === Role.User) {
        dispatch(login({ user: response.data }));
        navigate("MainStack", {});
      } else {
        setModalMessage("Invalid credentials");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("An error occurred during login. Please try again.");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    try {
      // Handle forgot password logic
    } catch (error) {
      setModalMessage("An error occurred. Please try again.");
      setModalVisible(true);
    }
  };

  const handleGoogleLogin = async () => {
    // Handle Google sign-in logic
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Image source={images.eye3dModal} style={{ width: 200, height: 200 }} />
      </View>

      <View style={styles.inputView}>
        <Input
          value={data.email}
          onChangeText={(value) => setData({ ...data, email: value })}
          placeholder="Enter your email"
          beforeIcon="email"
        />
      </View>
      <View style={styles.inputView}>
        <Input
          value={data.password}
          onChangeText={(value) => setData({ ...data, password: value })}
          placeholder="Enter your password"
          secureTextEntry={showPassword}
          beforeIcon="password"
          afterIcon="eye"
          toggleSecureTextEntry={toggleSecureTextEntry}
        />
      </View>
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotContainer}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <PrimaryButton
        text={loading ? "Logging in..." : "Login"}
        isLoading={loading}
        disable={loading}
        onClick={handleLogin}
        width={null}
      />
      <View style={styles.signUpContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigate("Signup", {})}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.or}>OR</Text>
      </View>
      <IconButton
        text="Login with Google"
        backgroundColor="white"
        icon="google"
        textColor="black"
        onClick={handleGoogleLogin}
        width={null}
      />

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} animationIn="zoomIn" animationOut="zoomOut">
        <View style={styles.modalContent}>
          <Icon name="error-outline" size={40} color="red" />
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.modalButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#333",
    marginBottom: 40,
    marginTop: 40,
  },
  inputView: {
    marginTop: 10,
  },
  forgotContainer: {
    width: "80%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgot: {
    color: theme.primary_color,
    fontSize: 12,
  },
  signUpContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  signUpLink: {
    color: theme.primary_color,
    marginLeft: 5,
  },
  or: {
    color: "#a0a7b0",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
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

export default LoginScreen;
