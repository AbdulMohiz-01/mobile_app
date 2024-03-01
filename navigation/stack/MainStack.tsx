import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "screens/main/Home";
import AnalyseImage from "screens/main/AnalyseImage";
import Dashboard from "@screens/main/Profile";

// Define the type for the root stack param list
type RootStackParamList = {
  Dashboard: undefined;
  Home: undefined;
  AnalyseImage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Specify the type of the stack navigator
const Tab = createBottomTabNavigator();

const MainStack: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'AnalyseImage') {
            iconName = 'image-search';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={size} color="#199a8e" />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AnalyseImage" component={AnalyseImage} />
      <Tab.Screen name="Profile" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default MainStack;
