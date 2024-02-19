import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack"; // Import your AuthStack component
import MainStack from "./MainStack"; // Import your MainStack component

// Define the type for the root stack param list
type RootStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Specify the type of the stack navigator

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainStack"
        component={MainStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
