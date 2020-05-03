import HistoricalOrders from "./components/order-components/HistoricalOrders";
import OrderSummary from "./components/order-components/OrderSummary";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
export function HistoricalOrdersStack(){
  return(
      <Stack.Navigator>
        <Stack.Screen name="PastOrders" component={HistoricalOrders} options={{
          title: "Past Orders",
          headerBackTitle: 'Past Orders',
          gestureEnabled: false,
        }} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} options={{
          title: "Order Summary",
          headerBackTitle: 'Order Summary',
          gestureEnabled: false,
        }} />
      </Stack.Navigator>
  )
}
