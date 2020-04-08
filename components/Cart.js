import React, { useEffect, useState } from "react";
import {
    Alert, Button, Modal,
    StyleSheet,
    Text,
    View,
    Picker,
} from "react-native";
import { round } from 'lodash'
import EmptyCart from "./common/EmptyCart";
import {connect} from "react-redux";
import {addToCart, emptyCart, removeItemFromCart, createOrder} from "../redux";
import CartItem from "./CartItem";
import { HeaderBackButton } from 'react-navigation';
import {isMobile} from 'react-device-detect';
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
            {props.cart.map((item)=>(
                <CartItem
                    key={item._id}
                    name={item.name}
                    image={item.image}
                    cuisine={item.cuisine}
                    price={item.price}
                    label={item.label}
                    isVegetarian={item.isVegetarian}
                    quantity={item.quantity}
                    subTotal={round(item.quantity*item.price,2)}
                    qtyChanged={(quantity)=>{
                        props.addToCart({...item, quantity})
                    }}
                    removeFromCart={()=>props.removeItemFromCart(item)}
                />
            ))}
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
                        if(isMobile) {
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
                        }
                        else{
                            console.log('Cart Emptied')
                            props.emptyCart()
                        }
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
                        props.createOrder({location: selectedValue, items: props.cart.map(item => ({_id: item._id, quantity: item.quantity, price: item.price, name: item.name})), total, restaurant: props.restaurant})
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
