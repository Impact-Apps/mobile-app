import React, { useEffect} from "react";
import axios from 'axios'
import {
    StyleSheet,
    View,
    FlatList,
} from "react-native";
import OrderItem from "./OrderItem";
import {connect} from "react-redux";
import {getHistoricalOrders} from "../../stores/orders-store";
import { BASE_API_URL } from 'react-native-dotenv'
import { get } from 'lodash'

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchHistoricalOrders: historicalOrders => dispatch(getHistoricalOrders(historicalOrders)),
  }
}

const mapStateToProps = (state) =>{
  return {
    historicalOrders: state.orders.historical,
    userId: get(state, 'user.user._id')
  }
}

export const fetchHistoricalOrders = async (userId) => {
    const params = {
        filter: {
            userId,
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
        const response =  await fetchHistoricalOrders(props.userId)
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
        renderItem={({ order }) => {
            return (
                <OrderItem
                    restaurantId={order.restaurantId}
                    orderedAt={order.createdAt.split('T')[0]}
                    numberOfItems={order.items.length}
                    total={order.total}
                    handleNavigation={() => handleNavigation(order.items)}
                />
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
