import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";

import EmptyCart from "./common/EmptyCart";
import {connect} from "react-redux";
import {emptyCart} from "../redux";
import ListItem from "./ListItem";

const mapDispatchtoProps = (dispatch) =>{
  return {
    emptyCart: () => dispatch(emptyCart()),
  }
}
const mapStateToProps = (state) =>{
  return {
    items: state.items.items
  }
}


const Cart = (props) => {
    console.log(props.items.length)
    return props.items.length === 0 ? (<EmptyCart/>) :
        (<View style={styles.container}>
        <View>
            <Text
                style={{
                    textAlign: "center",
                    color: "#ef6136",
                    fontSize: 18,
                    opacity: 0.55
                }}
            >
                <FlatList
                    data={props.items}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <ListItem
                            name={item.name}
                            image={item.image}
                            cuisine={item.cuisine}
                            price={item.price}
                            label={item.label}
                            isVegetarian={item.isVegetarian}
                            handleNaviagation={() => console.log('clicked')}
                        />
                    )}
                />
                <button onClick={() => this.props.emptyCart()}>Empty Cart</button>
            </Text>
        </View>
    </View>)
}

const ConnectedCart = connect(mapStateToProps, mapDispatchtoProps)(Cart)

export default ConnectedCart;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    title: {
        fontSize: 24,
        color: "#4099ff",
        margin: 8
    }
});
