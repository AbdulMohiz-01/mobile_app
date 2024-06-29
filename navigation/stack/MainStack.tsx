import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text } from "react-native";
import HomeScreen from "screens/main/Home";
import AnalyseImage from "screens/main/AnalyseImage";
import Profile from "@screens/main/Profile";
import EditProfile from "@screens/main/EditProfile";
import ViewArticle from "component/article/ViewArticle";
import { icons } from "constants/paths";

// Define the type for the root stack param list
type RootStackParamList = {
  Main: undefined;
  EditProfile: undefined;
  ArticleDetail: undefined; // Add ArticleDetail to the stack navigator
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerTitle: "Edit Profile" }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ViewArticle}
        options={{ headerTitle: "Article Detail" }} // Set the title for the ArticleDetail screen
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator: React.FC = () => {
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
