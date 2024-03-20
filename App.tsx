import React from "react";
import { NavigationContainerRef } from "@react-navigation/native";
import RootStack from "./navigation/stack/index";
import { navigationRef } from "./navigation/NavigationService";
import { NavigationContainer } from "@react-navigation/native";
import store from "redux/store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <RootStack />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
