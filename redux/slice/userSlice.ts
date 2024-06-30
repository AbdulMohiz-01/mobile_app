import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "model/user"; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the type for the initial state
interface UserState {
  user: User | null;
}

// Define the initial state
const initialState: UserState = {
  user: null,
};

// Create a slice with TypeScript
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem('user');
    },
    loadUserFromStorage: (state, action: PayloadAction<{ user: User | null }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, loadUserFromStorage } = userSlice.actions;

export default userSlice.reducer;
