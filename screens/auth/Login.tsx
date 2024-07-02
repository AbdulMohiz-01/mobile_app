import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { navigate } from "navigation/NavigationService";
import { Login, invalidLoginAlert } from "service/screens/loginService";
import { PrimaryButton, Input, IconButton } from "component";
import { theme } from "constants/theme";
import { Response } from "model/response";
import { Role } from "model/role";
import { login, loadUserFromStorage } from "redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from "constants/paths";

// Add these imports for Google Sign-In
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";

const LoginScreen: React.FC = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true); // Ensure you have this state if used for password visibility
  const [userInfo, setUserInfo] = React.useState<any>(null); // State to store user info from Google sign-in

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user); // Select user from Redux state

  // Function to toggle password visibility if used
  const toggleSecureTextEntry = () => {
    setShowPassword(!showPassword);
  };

  // Function to configure Google sign-in
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: "699664001248-5r0b83dsf2hpbghug2dr4ld01kh0fask.apps.googleusercontent.com",
      androidClientId: "699664001248-uo7of65otovk8os6ehejojqbulgun4vk.apps.googleusercontent.com",
      iosClientId: "699664001248-oqevv5fbkrev2ukhbgb1ehh2mf3hspkf.apps.googleusercontent.com",
    });
  };

  // Hook to run configuration once on component mount
  useEffect(() => {
    configureGoogleSignIn();
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

    // Check if user is already logged in (e.g., from Redux state)
    if (user) {
      navigate("MainStack", {});
    }
  }, [user, dispatch]);

  // Function to handle regular email/password login
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

  // Function to handle forgot password functionality
  const handleForgotPassword = () => {
    try {
      // Implement forgot password logic here
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  // Function to handle Google sign-in
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Check if Google Play Services are available
      const userInfo = await GoogleSignin.signIn(); // Perform Google sign-in
      setUserInfo(userInfo); // Store user info in state
      // Handle further logic such as dispatching to Redux or navigating to next screen
    } catch (error) {
      console.error('Google sign-in error:', error);
      // Handle error, e.g., display error message
    }
  };

  // UI rendering
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
      {/* Conditional rendering based on userInfo state */}
      {userInfo ? (
        <View>
          <Text>User Info: {JSON.stringify(userInfo)}</Text>
          <IconButton
            text="Logout from Google"
            backgroundColor="white"
            icon="google"
            textColor="black"
            onClick={() => {
              setUserInfo(null); // Clear user info state
              GoogleSignin.revokeAccess(); // Revoke access token
              GoogleSignin.signOut(); // Sign out from Google
            }}
            width={null}
          />
        </View>
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={handleGoogleLogin} // Call handleGoogleLogin on press
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1d0515",
  },
  welcome: {
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
