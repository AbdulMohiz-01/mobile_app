import { Collection } from "model/collection";
import { Response } from "model/response";
import { Role } from "model/role";
import { EditProfileFormData, FormData } from "model/signupForm";
import { User } from "model/user";
import { addDocument, findByEmail, getDocumentIdbyEmail, updateDocument } from "service/firebase/firebaseService";

const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


export const createUser = async (data: FormData): Promise<Response> => {

    // console.log(data, "checking the existing user createUser function");

    const existingUser = await findByEmail(Collection.User, data.email);
    if (existingUser != null) {
        return {
            status: false,
            message: "Email already exists",
        }
    }

    // console.log("no existing user found")
    const user: User = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: Role.User,
        createdAt: new Date().toISOString(),
        profileColor: generateRandomColor(),
    }

    // console.log("hitting the addDocument function in createUser function")
    const response = await addDocument(Collection.User, user);

    if (response) {
        // TODO: add the user to the local storage or redux
        // console.log("User created successfully");
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

export const editUser = async (data: EditProfileFormData, user: User): Promise<Response> => {

    console.log(data, "checking the existing user editUser function");

    const existingUser = await findByEmail(Collection.User, data.email);
    if (existingUser != null) {
        return {
            status: false,
            message: "Email already exists",
        }
    }
    console.log(user.email, "user email")
    const docId = await getDocumentIdbyEmail(Collection.User, user.email);

    console.log("no existing user found")
    const updatedUser: User = {
        ...user,
        name: data.name,
        email: data.email,
        password: data.password,
    }
    console.log(updatedUser, "updated user")
    console.log("hitting the updateDocument function in editUser function")
    console.log(docId, "docId")
    const response = await updateDocument(Collection.User, docId, updatedUser);

    console.log(response, "response from updateDocument function")

    if (response) {
        console.log("inside response")
        return {
            status: true,
            message: "User updated successfully",
        }
    } else {
        return {
            status: false,
            message: "Error updating user",
        }
    }
}

export const invalidAlert = (text: string) => {
    alert(text);
}