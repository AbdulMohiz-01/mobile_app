import { Role } from "./role";

export interface User {
    name: string;
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