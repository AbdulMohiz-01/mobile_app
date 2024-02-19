import { Role } from "react-native";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt?: string;
    profileColor?: string;
    profileImageUrl?: string;
    isOnline?: boolean;
    lastOnline?: string;
    role: Role;
}