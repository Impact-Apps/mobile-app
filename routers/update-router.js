import 'react-native-gesture-handler';
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import Updates from "../components/update-components/Updates"


const Stack = createStackNavigator();
export function UpdateRouter(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Updates" component={Updates} options={{
                title: "Updates",
                headerBackTitle: 'Updates',
                gestureEnabled: false,
            }} />
        </Stack.Navigator>
    )
}
