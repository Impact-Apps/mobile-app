import React, { useEffect} from "react";
import axios from 'axios'
import {
    StyleSheet,
    View,
    FlatList,
} from "react-native";
import OrderItem from "./OrderItem";
import {connect} from "react-redux";
import {getHistoricalOrders} from "../../orders-store";
import { BASE_API_URL } from 'react-native-dotenv'

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchHistoricalOrders: historicalOrders => dispatch(getHistoricalOrders(historicalOrders)),
  }
}

const mapStateToProps = (state) =>{
  return {
    historicalOrders: state.orders.historical,
  }
}

export const fetchHistoricalOrders =  async () => {
    const params = {
        filter: {
            userId: 123,
            status: 'done'
        }
    }
    const response =  await axios.get(`${BASE_API_URL}/order/`, {params})
    return response.data
}

const HistoricalOrders = (props) => {

//   const navigation = useNavigation();

  useEffect( () =>  {
    const initialFetch = async () => {
        const response =  await fetchHistoricalOrders()
        // console.log(response)
        props.fetchHistoricalOrders(response)
        // console.log(props, 'hitpricals')

    }
    initialFetch()
  },[])

  const handleNavigation = (items) => {
    props.navigation.navigate("OrderSummary", {items});
  };

  return (
    <View style={styles.container}>
      <FlatList // Might have to get rid of this 
        data={props.historicalOrders}
        keyExtractor={order => order._id}
        renderItem={({ item }) => {
            return (
                // console.log(order)
                <OrderItem
                    restaurantId={item.restaurantId}
                    orderedAt={item.createdAt.split('T')[0]}
                    numberOfItems={item.items.length}
                    total={item.total}
                    handleNavigation={() => handleNavigation(item.items)}
                />
                // <Text>{order.total}</Text>
            )
        }
    }
/>
    </View>
  );
}

const ConnectedHistoricalOrders = connect(mapStateToProps, mapDispatchToProps)(HistoricalOrders);

export default ConnectedHistoricalOrders;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
