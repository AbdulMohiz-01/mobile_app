import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigation/stack/index";
import { navigationRef } from "./navigation/NavigationService";

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default App;
