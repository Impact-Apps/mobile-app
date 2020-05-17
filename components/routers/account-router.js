import 'react-native-gesture-handler';
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Account from "../account-components/Account";


const Stack = createStackNavigator();
export function AccountRouter(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Account" component={Account} options={{
                title: "Account",
                headerBackTitle: 'Account',
                gestureEnabled: false,
            }} />
        </Stack.Navigator>
    )
}
