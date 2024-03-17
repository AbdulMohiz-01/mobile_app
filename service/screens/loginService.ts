import { Alert } from "react-native";
import { Collection } from "../../model/collection";
import { findByEmail } from "../firebase/firebaseService"
import { Response } from "model/response";

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
    // console.log(email, password)
    let data = await findByEmail(Collection.User, email);
    let response: Response = {
        status: false,
        message: "Invalid Login",
        data: {}
    }
    if (data?.password === password) {
        response = {
            status: true,
            message: "Login Successful",
            data: data
        }
    }
    return response;
}