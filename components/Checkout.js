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
import { emptyCart } from "../redux";


const mapStateToProps = (state) =>{
  return {
    order: state.order
  }
}

const mapDispatchToProps = (dispatch) =>{
    return {
      emptyCart: () => dispatch(emptyCart()),
    }
  }

const postOrder = async (order) => {
    const orderObject = {
        restaurantId: order.restaurant._id,
        ...order
    }
    await axios.post(`${BASE_API_URL}/order/`, orderObject)
}


const Checkout = (props) => {
    
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
            <Button title="Pay Now" onPress={ () => {
                postOrder(props.order)
                props.navigation.navigate('Items')
                console.log(props.navigation)
                props.emptyCart()
            }}></Button>
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
