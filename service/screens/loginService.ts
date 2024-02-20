import { Alert } from "react-native";
import { Collection } from "../../model/collection";
import { findByEmail } from "../firebase/firebaseService"


// const handleEmailLogin = async () => {
//     try {
//       const userExists = await checkLogin(email, password);
//       console.log(userExists);
//       if (userExists) {
//         navigation.navigate("Dashboard");
//       } else {
//         invalidLoginAlert();
//       }
//     } catch (error) {
//       console.error("An error occurred while handling email login:", error);
//     }
//   };



export const invalidLoginAlert = () =>
    Alert.alert('Invalid Login', 'please check your Email and Password', [
        {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

export const Login = async (email: string, password: string) => {
    let data = await findByEmail(Collection.User, email);
    if (data.password === password) {
        return true;
    }
    return false;
}