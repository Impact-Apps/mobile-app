import { createStackNavigator } from "react-navigation";
import HistoricalOrders from "./components/order-components/HistoricalOrders";
import OrderSummary from "./components/order-components/OrderSummary";

const HistoricalOrdersStack = createStackNavigator({

  HistoricalOrders: {
    screen: HistoricalOrders,
    navigationOptions: {
      title: "Past Orders",
      headerBackTitle: 'Past Orders',
      gesturesEnabled: false,
    }
  },
  OrderSummary: {
    screen: OrderSummary,
    navigationOptions: {
      title: "Order Summary",
      headerBackTitle: 'Order Summary',
      gesturesEnabled: false,
    }
  },
});

export default HistoricalOrdersStack;
