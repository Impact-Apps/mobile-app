import React, { useEffect, useState } from "react";
import {
    Alert, Button, Modal,
    StyleSheet,
    Text,
    View,
    Picker, FlatList,
} from "react-native";
import { round } from 'lodash'
import EmptyCart from "../common/EmptyCart";
import {connect} from "react-redux";
import {addToCart, emptyCart, removeItemFromCart, createOrder} from "../../stores/redux";
import CartItem from "./CartItem";
import { HeaderBackButton } from 'react-navigation';

const mapDispatchToProps = (dispatch) =>{
  return {
    emptyCart: () => dispatch(emptyCart()),
    addToCart: item => dispatch(addToCart(item)),
    removeItemFromCart: item => dispatch(removeItemFromCart(item)),
    createOrder: (order) => dispatch(createOrder(order))
  }
}
const mapStateToProps = (state) =>{
  return {
    cart: state.cart.items,
    totalPrice: round(state.cart.items.reduce((totalPrice,item) => totalPrice + (item.price*item.quantity), 0),2),
    restaurant: state.restaurantDetails.selectedRestaurant
  }
}



const Cart = (props) => {
    const [selectedValue, setSelectedValue] = useState("Collection");
    let total = props.totalPrice


    return props.cart.length === 0 ? (<EmptyCart/>) :
        (<View style={styles.container}>
            <FlatList
                data={props.cart}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return(
                        <CartItem
                            updateItemQuantity={(quantity) =>{
                                props.addToCart({...item, quantity})
                            }}
                            name={item.name}
                            image={item.image}
                            quantity={item.quantity}
                            subTotal={round(item.quantity*item.price,2)}
                            removeItemFromCart={()=>{props.removeItemFromCart(item)}}

                        />
                    )
                }}/>
            <Text
                style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#ef6136"
                }}
            >
                {`Total: ${total}`}
            </Text>
            <View style={styles.itemContainer}>
                <Button
                    onPress={() => {
                        
                            Alert.alert(
                                'Empty Cart',
                                'Are you sure you want to empty your cart?',
                                [
                                    {text: 'Empty', onPress: props.emptyCart},
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    }
                                ]
                            );
                    }}
                    title="Empty cart"
                    color="#c53c3c"
                />
            </View>
            <View style={styles.itemContainer}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                    <Picker.Item key="collection" label="Collection" value="Collection" />
                    {[1,2,3,4,5].map(table => <Picker.Item key={table} label={`Table Number ${table}`} value={table} />)}
                </Picker>
            </View>
            <View style={styles.itemContainer}>
                <Button
                    onPress={() => {
                        props.createOrder({location: selectedValue, items: props.cart.map(item => ({itemId: item._id, quantity: item.quantity, price: item.price, name: item.name})), total, restaurant: props.restaurant, status: "pending"})
                        props.navigation.navigate('Checkout')
                    }}
                    title="Checkout"
                    color="#c53c3c"
                />
            </View>
    </View>)
}

Cart.navigationOptions = ({ navigation }) => {
    return{
        headerLeft:(<HeaderBackButton title='Menu' onPress={()=>{ navigation.navigate('Items') }}/>),
    };
};

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default ConnectedCart;

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
