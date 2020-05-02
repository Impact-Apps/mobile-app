import React, { useEffect } from "react";
import axios from 'axios'
import {
    StyleSheet,
    View,
    FlatList,
    Alert
} from "react-native";
import ListItem from "./ListItem";
import CartButton from "../common/CartButton";
import {connect} from "react-redux";
import {emptyCart, fetchItems} from '../../redux';
import { get } from 'lodash';
import {HeaderBackButton} from "react-navigation";
import { BASE_API_URL } from 'react-native-dotenv'
import { OrderStack } from '../../order-router'

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
      const response =  await axios.get(`${BASE_API_URL}/menu/${props.selectedRestaurant._id}/items`)
      props.fetchItems(response.data)
      setNavOptions({...props, headerTitle: `${props.selectedRestaurant.name}'s Menu`})
    }
    fetchItems()
  },[props.isCartEmpty])

  const handleNavigation = (item) => {
    props.navigation.navigate("ItemDetails", { item });
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

const setNavOptions = ({navigation, isCartEmpty, emptyCart, headerTitle}) => {
  navigation.setOptions({
      headerLeft: () => <HeaderBackButton
          title='Restaurants'
          onPress={()=>{
              if(isCartEmpty) {
                navigation.navigate('Restaurants')
              }
              else{
                  Alert.alert(
                      'Empty Cart',
                      'Are you sure you want to empty your cart?',
                      [
                          {
                              text: 'Empty', onPress: () => {
                                  emptyCart()
                                  navigation.navigate('Restaurants')
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
          }}/>,
      headerTitle,
      headerStyle: {
          elevation: 0,
          shadowOpacity: 0
      },
      headerRight: () => <CartButton
              onPress={() => { navigation.navigate('OrderStack', {screen: 'Cart'})}}
          />
  })
}

const ConnectedItems = connect(mapStateToProps, mapDispatchToProps)(Items);

export default ConnectedItems;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});
