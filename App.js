import 'react-native-gesture-handler';
import React from "react";
import { Provider } from 'react-redux';
import { store } from './stores/redux';
import { NavigationContainer } from '@react-navigation/native';
import InitialRouter from "./routers/initial-router"
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <InitialRouter/>
                </NavigationContainer>
            </Provider>
        );
  }
}

export default App;
