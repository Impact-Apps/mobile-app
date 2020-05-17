import 'react-native-gesture-handler';
import React from "react";
import { OrderStack } from "./order-router";
import { HistoricalOrdersStack } from "../../historical-orders-router";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ConnectedUpdates from "../update-components/Updates";
import { AccountRouter } from "./account-router";
import AsyncStorage from "@react-native-community/async-storage";
import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({
    domain: 'impact-apps.eu.auth0.com',
    clientId: 'In5Sed5tKPvCSPF9Uf13vgZUCOfvcT50'
});
const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

const Tab = createMaterialBottomTabNavigator();
let sessionTimeout
class MainRouter extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        await this.refreshAccessToken()
    }
    setSessionTimeout = (duration) => {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(
            this.refreshAccessToken,
            (duration - SESSION_TIMEOUT_THRESHOLD) * 1000
        );
    };

    refreshAccessToken = async () => {
        const refreshToken = await AsyncStorage.getItem('refreshToken')
        auth0
            .auth
            .refreshToken({refreshToken})
            .then(async res => {
                await AsyncStorage.setItem('accessToken', res.accessToken)
                this.setSessionTimeout(res.expiresIn)
            })
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        return (
                    <Tab.Navigator
                        initialRouteName="Restaurant"
                        activeColor={'white'}
                        style={{backgroundColor: 'clear'}}>
                        <Tab.Screen
                            name="Restaurant"
                            component={OrderStack}
                            options={{
                                tabBarLabel: 'Order',
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="food" color={color} size={26}/>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Updates"
                            component={ConnectedUpdates}
                            options={{
                                tabBarLabel: 'Updates',
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="bell" color={color} size={26}/>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Past Orders"
                            component={HistoricalOrdersStack}
                            options={{
                                tabBarLabel: 'Past Orders',
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="history" color={color} size={26}/>
                                ),
                            }}
                        />
                        <Tab.Screen
                            name="Account"
                            component={AccountRouter}
                            options={{
                                tabBarLabel: 'Account',
                                tabBarIcon: ({color}) => (
                                    <MaterialCommunityIcons name="account" color={color} size={26}/>
                                ),
                            }}
                        />
                    </Tab.Navigator>
        );
    }
}

export default MainRouter;
