import React from "react";
import { NavigationContainerRef } from "@react-navigation/native";
import RootStack from "./navigation/stack/index";
import { navigationRef } from "./navigation/NavigationService";
import { NavigationContainer } from "@react-navigation/native";
import store from "redux/store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PaperProvider>
          <RootStack />
        </PaperProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
