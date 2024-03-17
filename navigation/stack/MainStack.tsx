import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native'; // Import Image component
import HomeScreen from "screens/main/Home";
import AnalyseImage from "screens/main/AnalyseImage";
import Dashboard from "@screens/main/Profile";
import { icons } from "constants/paths";
import Profile from "@screens/main/Profile";

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
          let iconSource;

          if (route.name === 'Profile') {
            iconSource = icons['profile'];
          } else if (route.name === 'Home') {
            iconSource = icons['home'];
          } else if (route.name === 'AnalyseImage') {
            iconSource = icons['search'];
          }

          // You can return any component that you like here!
          return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarLabel: ({ focused }) => {
          let label;

          if (route.name === 'Profile') {
            label = 'Profile';
          } else if (route.name === 'Home') {
            label = 'Home';
          } else if (route.name === 'AnalyseImage') {
            label = 'D-Retinopathy';
          }

          return <Text style={{ color: focused ? '#199a8e' : '#666' }}>{label}</Text>;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AnalyseImage" component={AnalyseImage} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default MainStack;
