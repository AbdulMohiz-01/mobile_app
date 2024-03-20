import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "redux/slice/userSlice";
// Import other reducers if you have them

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
