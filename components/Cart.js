import React, { useEffect} from "react";
import {
    Alert, Button, Modal,
    StyleSheet,
    Text,
    View
} from "react-native";
import { round } from 'lodash'
import EmptyCart from "./common/EmptyCart";
import {connect} from "react-redux";
import {addToCart, emptyCart, removeItemFromCart} from "../redux";
import CartItem from "./CartItem";
import { HeaderBackButton } from 'react-navigation';
import {isMobile} from 'react-device-detect';
const mapDispatchToProps = (dispatch) =>{
  return {
    emptyCart: () => dispatch(emptyCart()),
    addToCart: item => dispatch(addToCart(item)),
    removeItemFromCart: item => dispatch(removeItemFromCart(item))

  }
}
const mapStateToProps = (state) =>{
  return {
    cart: state.cart.items,
    totalPrice: round(state.cart.items.reduce((totalPrice,item) => totalPrice + (item.price*item.quantity), 0),2)
  }
}



const Cart = (props) => {
    const promptEmptyBasket =() =>{
        state.isModalVisible = true
    }

    const state ={
        isModalVisible: false
    }

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
                            props.emptyCart()
                        }
                    }}
                    title="Empty cart"
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
