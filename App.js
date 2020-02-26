import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import RootStack from "./router";

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default App;
