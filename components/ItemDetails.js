import React from 'react';
import {Alert} from 'react-native';

import CartButton from "./common/CartButton";

import ItemCard from './ItemCard';

export default class ItemDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: "Item Details",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        },
        headerRight: (
          <CartButton
            onPress={() => { navigation.navigate('Cart');}}
          />
        )
      };
    };


  state = {
    qty: 1,
  };


  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.item = navigation.getParam('item');
  };

  qtyChanged = value => {
    const nextValue = Number(value);
    this.setState({qty: nextValue});
  };

  addToCart = (item, qty) => {
    // const item_id = this.context.cart_items.findIndex(
    //   el => el.restaurant.id !== item.restaurant.id,
    // );
    // if (item_id === -1) {
    console.log('added to cart', 
      'Added to basket',
      `${qty} ${item.name} was added to the basket.`)
    Alert.alert(
      'Added to basket',
      `${qty} ${item.name} was added to the basket.`,
    );
      // this.context.addToCart(item, qty);
    // } else {
    //   Alert.alert(
    //     'Cannot add to basket',
    //     'You can only order from one restaurant for each order.',
    //   );
    // }
  };

  render() {
    const {qty} = this.state;
    return (
      <ItemCard
        item={this.item}
        qty={qty}
        qtyChanged={this.qtyChanged}
        addToCart={this.addToCart}
      />
    );
  }
}
