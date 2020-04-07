import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    Table,

    View,
} from "react-native";
import {connect} from "react-redux";


const mapStateToProps = (state) =>{
  return {
    order: state.order
  }
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
            <Button title="Pay Now" onPress={ () => console.log('Pay')}></Button>
        </View>
    )
}



const ConnectedCheckout = connect(mapStateToProps, null)(Checkout)

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
