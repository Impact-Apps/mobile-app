import React from "react";
import { Button, TouchableOpacity, Text, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import RestaurantsScreen from "./components/Restaurants";
import DishesScreen from "./components/Dishes";
import CartScreen from "./components/Cart";
import ItemDetailsScreen from "./components/ItemDetails";

const RootStack = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: {
      title: "Food Shop"
    }
  },
  Dishes: {
    screen: DishesScreen,
    navigationOptions: {
      title: "Dishes"
    }
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      title: "Cart",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    }
  },
  ItemDetails: {
    screen: ItemDetailsScreen,
    navigationOptions: {
      title: "Item Details",
    }
  }
});

export default RootStack;
