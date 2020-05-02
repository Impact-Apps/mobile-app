import 'react-native-gesture-handler';
import React from "react";
import { OrderStack } from "./order-router";
import { HistoricalOrdersStack } from "./historical-orders-router";
// import HistoricalOrders from "./components/order-components/HistoricalOrders";
import { Provider } from 'react-redux';
import { store } from './redux';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ConnectedUpdates from "./components/update-components/Updates";
import { View, Text } from 'react-native';

const Tab = createMaterialBottomTabNavigator();
export const Profile = () => <Text>Profile</Text>
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Provider store={store}>
              <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Feed"
                    activeColor={'white'}
                    style={{ backgroundColor: 'clear' }}>
                    <Tab.Screen
                        name="Restaurant"
                        component={OrderStack}
                        options={{
                            tabBarLabel: 'Order',
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="food" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                      name="Updates"
                      component={ConnectedUpdates}
                      options={{
                        tabBarLabel: 'Updates',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="bell" color={color} size={26} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Past Orders"
                      component={HistoricalOrdersStack}
                      options={{
                        tabBarLabel: 'Past Orders',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="history" color={color} size={26} />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Profile"
                      component={Profile}
                      options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="account" color={color} size={26} />
                        ),
                      }}
                    />
                </Tab.Navigator>
              </NavigationContainer>
            </Provider>
        )
  }
}

export default App;
