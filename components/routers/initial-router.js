import 'react-native-gesture-handler';
import React from "react";
import Login from "../../Login";
import MainRouter from "./main-router";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

class InitialRouter extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Stack.Navigator
                initialRouteName="Login"
                activeColor={'white'}
                style={{backgroundColor: 'clear'}}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Main"
                    component={MainRouter}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        );
    }
}

export default InitialRouter;
