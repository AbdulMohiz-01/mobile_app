import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { navigate } from "navigation/NavigationService";
import { Login, invalidLoginAlert } from "service/screens/loginService";
import { PrimaryButton, Input, IconButton, LineLoading } from "component";
import { theme } from "constants/theme";
import { Response } from "model/response";
import { Role } from "model/role";
import { login } from "redux/slice/userSlice";
import store from "redux/store";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen: React.FC = () => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const toggleSecureTextEntry = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async () => {
    navigate("MainStack", {});

    if (!data.email || !data.password) {
      return;
    }
    setLoading(true);
    let response: Response = await Login(data.email, data.password);

    // if (response.status && response.data.role === Role.User) {
    //   dispatch(login({ user: response.data }));

    //   navigate("MainStack", {});
    // } else {
    //   invalidLoginAlert();
    // }
    setLoading(false);
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
  };

  const handleGoogleLogin = async () => {
    // Handle google login logic
    // await signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const user = result.user;
    //     console.log(user);
    //   })
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
      {/* forget password */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotContainer}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <PrimaryButton text={loading ? "Logging in..." : "Login"} isLoading={loading} disable={loading} onClick={handleLogin} width={null} />
      {/* dont have an account sign up */}
      <View style={styles.signUpContainer}>
        <Text>
          Don't have an account?
        </Text>
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
    // justifyContent: "center",
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
  inputText: {
    height: 50,
    color: "#333",
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
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  or: {
    color: "#a0a7b0",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
  },
  googleBtn: {
    width: "80%",
    backgroundColor: "#4285f4",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  googleText: {
    color: "#fff",
    fontWeight: "bold",
  },

});

export default LoginScreen;
