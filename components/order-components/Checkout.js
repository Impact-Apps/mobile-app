import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";
import axios from 'axios';
import {connect} from "react-redux";
import { BASE_API_URL } from 'react-native-dotenv'
import { emptyCart, resetOrder } from "../../redux";
import {getActiveOrders} from "../../orders-store";
import {fetchOrders} from "../update-components/Updates";
import Payment from '../payment-components/Payment'


const mapStateToProps = (state) =>{
  return {
    order: state.order,
    userId: state.user.user._id
  }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        emptyCart: () => dispatch(emptyCart()),
        getActiveOrders: orders => dispatch(getActiveOrders(orders))

    }
  }

const postOrder = async (order, userId, tokenId, amount) => {
    const orderObject = {
        restaurantId: order.restaurant._id,
        ...order,
        userId,
        tokenId,
        amount
    }
    await axios.post(`${BASE_API_URL}/order/`, orderObject)
}


const Checkout = (props) => {

        async function payNow(tokenId, amount) {
            console.warn(props.userId)
            await postOrder(props.order, props.userId, tokenId, amount)
            props.emptyCart()
            props.navigation.navigate('Items')
            const response = await fetchOrders(props.userId)
            props.getActiveOrders(response)
        }

    return (
        <View style={styles.container}>
            <Text style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}>Order for: {props.order.restaurant.name}</Text>
            {props.order.items.map(item => 
            <Text key={item._id} style={{
                fontSize: 21,
                fontWeight: "bold",
                color: "#ef6136"
              }}>{item.quantity} X {item.name} - {item.quantity * item.price}</Text>
            )}
            <Text style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}>Total: {props.order.total}</Text>
            <Text style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}>{props.order.location}</Text>
            <Payment submitOrder={payNow} amount={props.order.total} />
        </View>
    )
}

const ConnectedCheckout = connect(mapStateToProps, mapDispatchToProps)(Checkout)

export default ConnectedCheckout;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 8,
        marginBottom: 8
    },
    itemContainer: {
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        color: "#4099ff",
        margin: 8
    }
});
