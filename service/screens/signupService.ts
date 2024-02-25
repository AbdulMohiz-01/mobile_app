import { Collection } from "model/collection";
import { Response } from "model/response";
import { Role } from "model/role";
import { FormData } from "model/signupForm";
import { User } from "model/user";
import { addDocument, findByEmail } from "service/firebase/firebaseService";

const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


export const createUser = async (data: FormData): Promise<Response> => {

    console.log(data, "checking the existing user createUser function");

    const existingUser = await findByEmail(Collection.User, data.email);
    if (existingUser != null) {
        return {
            status: false,
            message: "Email already exists",
        }
    }

    console.log("no existing user found")
    const user: User = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: Role.User,
        createdAt: new Date().toISOString(),
        profileColor: generateRandomColor(),
    }

    console.log("hitting the addDocument function in createUser function")
    const response = await addDocument(Collection.User, user);

    if (response) {
        // TODO: add the user to the local storage or redux
        console.log("User created successfully");
        return {
            status: true,
            message: "User created successfully",
        }
    }
    return {
        status: false,
        message: "Error creating user",
    }


}