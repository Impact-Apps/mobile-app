import React, { useEffect} from "react";
import axios from 'axios'
import {
    StyleSheet,
    View,
    FlatList,
    Text, Alert
} from "react-native";
import ListItem from "./ListItem";
import CartButton from "./common/CartButton";
import {connect} from "react-redux";
import {emptyCart, fetchItems} from '../redux';
import { get } from 'lodash';
import {HeaderBackButton} from "react-navigation";
import {isMobile} from 'react-device-detect';
import { BASE_API_URL } from 'react-native-dotenv'

const mapDispatchToProps = (dispatch) =>{
  return {
    fetchItems: items => dispatch(fetchItems(items)),
    emptyCart: () => dispatch(emptyCart())
  }
}

const mapStateToProps = (state) =>{
  return {
    selectedRestaurant: state.restaurantDetails.selectedRestaurant, // restaurant menuID
    items: state.items.items.map(item => ({...item, cartQuantity: get(state.cart.items.find(cartItem => cartItem._id === item._id), 'quantity', 0)})),
    isCartEmpty: state.cart.items.length === 0
  }
}

const Items = (props) => {

  useEffect( () =>  {
    const fetchItems =  async () => {
        console.log(BASE_API_URL)
        const response =  await axios.get(`${BASE_API_URL}/menu/${props.selectedRestaurant._id}/items`)
      props.fetchItems(response.data)
      props.navigation.setParams({title: `${props.selectedRestaurant.name}'s Menu`})
      props.navigation.setParams({isCartEmpty: props.isCartEmpty})
      props.navigation.setParams({emptyCart: props.emptyCart})
    }
    fetchItems()
  },[props.isCartEmpty])

  const handleNavigation = (item) => {
    props.navigation.navigate("ItemDetails", {item});
  };
  return (
    <View style={styles.container}>
      <FlatList // Might have to get rid of this
        data={props.items}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
            return (
                <ListItem
                    name={item.name}
                    image={item.image}
                    cuisine={item.cuisine}
                    price={item.price}
                    label={item.label}
                    isVegetarian={item.isVegetarian}
                    handleNaviagation={() => handleNavigation(item)}
                    cartQuantity={item.cartQuantity}
                />
            )
        }}
      />
    </View>
  );
}

Items.navigationOptions = (props) => {
    const headerTitle = props.navigation.getParam('title')
    const isCartEmpty = props.navigation.getParam('isCartEmpty')
    const emptyCart = props.navigation.getParam('emptyCart')
    return {
        headerLeft:(<HeaderBackButton
            title='Restaurants'
            onPress={()=>{
                if(isCartEmpty) {
                    props.navigation.navigate('Restaurants')
                }
                else{
                    if(isMobile) {
                        Alert.alert(
                            'Empty Cart',
                            'Are you sure you want to empty your cart?',
                            [
                                {
                                    text: 'Empty', onPress: () => {
                                        emptyCart()
                                        props.navigation.navigate('Restaurants')
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                }
                            ]
                        );
                    }
                    else {
                        emptyCart()
                        props.navigation.navigate('Restaurants')
                    }
                }
        }}/>),
        headerTitle,
        headerStyle: {
            elevation: 0,
            shadowOpacity: 0
        },
        headerRight: (
            <CartButton
                onPress={() => { props.navigation.navigate('Cart');}}
            />
        )
    };
};
const ConnectedItems = connect(mapStateToProps, mapDispatchToProps)(Items);

export default ConnectedItems;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
