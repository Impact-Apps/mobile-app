import React from "react";
import { createStackNavigator } from "react-navigation";
import RestaurantsScreen from "./components/Restaurants";
import ItemsScreen from "./components/Items";
import CartScreen from "./components/Cart";
import EmptyCartScreen from "./components/common/EmptyCart";
import ItemDetailsScreen from "./components/ItemDetails";
import CheckoutScreen from "./components/Checkout";

const RootStack = createStackNavigator({
  Restaurants: {
    screen: RestaurantsScreen,
    navigationOptions: {
      title: "Food Shop",
      headerBackTitle: 'Restaurants',
      gesturesEnabled: false,
    }
  },
  Items: {
    screen: ItemsScreen,
    navigationOptions: {
      title: "Items",
      headerBackTitle: 'Menu',
      gesturesEnabled: false,
    }
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      title: "Cart",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      gesturesEnabled: false,
    }
  },

  EmptyCart: {
    screen: EmptyCartScreen,
    navigationOptions: {
      title: "Empty Cart",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      },
      gesturesEnabled: false,
    }
  },
  ItemDetails: {
    screen: ItemDetailsScreen,
    navigationOptions: {
      title: "Item Details",
      gesturesEnabled: false,
    }
  },
  Checkout: {
    screen: CheckoutScreen,
    navigationOptions: {
      title: "Checkout",
      gesturesEnabled: false,
    }
  }
});

export default RootStack;
