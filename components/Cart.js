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
    console.log(props)
    return props.items.length === 0 ? (<EmptyCart/>) :
        (<View style={styles.container}>
            {/*<Text*/}
            {/*    style={{*/}
            {/*        textAlign: "center",*/}
            {/*        color: "#ef6136",*/}
            {/*        fontSize: 18,*/}
            {/*        opacity: 0.55*/}
            {/*    }}*/}
            {/*>*/}
                <FlatList
                    data={props.items}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        console.log(item.name)
                        return(
                            <ListItem
                                name={item.name}
                                image={item.image}
                                cuisine={item.cuisine}
                                price={item.price}
                                label={item.label}
                                isVegetarian={item.isVegetarian}
                                handleNaviagation={() => console.log('clicked')}
                            />
                        )
                    }}
                />
                <button onClick={() => props.navigation.pop(2)}>button</button>
            {/*</Text>*/}
    </View>)
}

const ConnectedCart = connect(mapStateToProps, mapDispatchtoProps)(Cart)

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
