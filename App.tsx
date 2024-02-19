import React from "react";
import { NavigationContainerRef } from "@react-navigation/native";
import RootStack from "./navigation/stack/index";
import { navigationRef } from "./navigation/NavigationService";
import { NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
