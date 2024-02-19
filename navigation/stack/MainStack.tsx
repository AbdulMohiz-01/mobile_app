import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/main/Home";
import AnalyseImage from "../../screens/main/AnalyseImage";
import Dashboard from "../../screens/main/Dashboard";

// Define the type for the root stack param list
type RootStackParamList = {
  Dashboard: undefined;
  Home: undefined;
  AnalyseImage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Specify the type of the stack navigator

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: "Dashboard" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="AnalyseImage"
        component={AnalyseImage}
        options={{ title: "Analyse Image" }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
