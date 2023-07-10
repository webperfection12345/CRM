import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { Node } from "react";
import { StatusBar, Platform, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Colors from "./src/utils/Colors";
import { LogBox } from 'react-native';
import Apps from "./App";
const App = () => {
  useEffect(() => {});
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.PrimaryColor,
      }}
    >
      <StatusBar
        backgroundColor={Colors.PrimaryColor}
        barStyle="light-content"
      />
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
