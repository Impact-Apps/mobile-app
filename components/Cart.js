import React, { useEffect} from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { round } from 'lodash'
import EmptyCart from "./common/EmptyCart";
import {connect} from "react-redux";
import {addToCart, emptyCart} from "../redux";
import CartItem from "./CartItem";
import { HeaderBackButton } from 'react-navigation';

const mapDispatchToProps = (dispatch) =>{
  return {
    emptyCart: () => dispatch(emptyCart()),
    addToCart: item => dispatch(addToCart(item))
  }
}
const mapStateToProps = (state) =>{
  return {
    cart: state.cart.items,
    totalPrice: round(state.cart.items.reduce((totalPrice,item) => totalPrice + (item.price*item.quantity), 0),2)
  }
}


const Cart = (props) => {

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

    title: {
        fontSize: 24,
        color: "#4099ff",
        margin: 8
    }
});
