import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { navigate } from "navigation/NavigationService";
import { Login, invalidLoginAlert } from "service/screens/loginService";
import { PrimaryButton, Input, IconButton, LineLoading } from "component";
import { theme } from "constants/theme";
import { Response } from "model/response";
import { Role } from "model/role";
import { login, loadUserFromStorage } from "redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user); // Select user from Redux state
  const [showPassword, setShowPassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

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
      Alert.alert("Error", "Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      let response: Response = await Login(data.email, data.password);
      if (response.status && response.data.role === Role.User) {
        dispatch(login({ user: response.data }));
        navigate("MainStack", {});
      } else {
        invalidLoginAlert();
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    try {
      // Handle forgot password logic
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    // Handle Google sign-in logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#333",
    marginBottom: 40,
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
});

export default LoginScreen;
