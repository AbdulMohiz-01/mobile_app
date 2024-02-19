import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { navigate } from "../../navigation/NavigationService";
import { Login, invalidLoginAlert } from "../../service/screens/loginService";


const LoginScreen : React.FC = () => {

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // Handle login logic
    let isAuth = await Login(data.email, data.password);
    if (isAuth){
      navigate("MainStack", {});
    }
    else{
      invalidLoginAlert();
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic
  };

  const handleGoogleLogin = () => {
    // Handle login with Google logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Retinopathy</Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#666"
          onChangeText={(val) => setData({ ...data, email: val })}
          value={data.email}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#666"
          onChangeText={(val) => setData({ ...data, password: val })}
          value={data.password}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
        <Text style={styles.googleText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#333",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#333",
  },
  forgot: {
    color: "#666",
    fontSize: 12,
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
