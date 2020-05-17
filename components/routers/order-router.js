import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantsScreen from "../order-components/Restaurants";
import CartScreen from "../order-components/Cart";
import EmptyCartScreen from "../common/EmptyCart";
import ItemDetailsScreen from "../order-components/ItemDetails";
import CheckoutScreen from "../order-components/Checkout";
import Items from "../order-components/Items";
const Stack = createStackNavigator();
export function OrderStack(){
  return(
      <Stack.Navigator>
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} options={{
          title: "Food Shop",
          headerBackTitle: 'Restaurants',
          gestureEnabled: false,
        }} />
        <Stack.Screen name="Items" component={Items} options={{
          headerTitle: "Items",
          headerBackTitle: 'Menu',
          gestureEnabled: false,
        }}  />
        <Stack.Screen name="Cart" component={CartScreen} options={{
          title: "Cart",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
          gestureEnabled: false,
        }} />
        <Stack.Screen name="EmptyCart" component={EmptyCartScreen} options={{
          title: "Empty Cart",
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          gestureEnabled: false,
        }} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{
          title: "Item Details",
          gestureEnabled: false,
        }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{
          title: "Checkout",
          gestureEnabled: false,
        }} />
      </Stack.Navigator>
  )
}
