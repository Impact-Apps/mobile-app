import React from 'react';
import {Alert} from 'react-native';
import CartButton from "./common/CartButton";
import ItemCard from './ItemCard';
import { connect } from 'react-redux';
import { addToCart, removeItemFromCart } from '../redux';
import { get } from 'lodash'

const mapDispatchToProps = (dispatch) =>{
  return {
    addToCart: item => dispatch(addToCart(item)),
    removeItemFromCart: item => dispatch(removeItemFromCart(item))
  }
}

const mapStateToProps = (state) =>{
  return {
    cartItems: state.cart.items,
    selectedRestaurant: state.restaurantDetails.selectedRestaurant
  }
}

class ItemDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: navigation.getParam('item').name,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        },
        headerRight: (
          <CartButton
            onPress={() => {
              navigation.navigate('Cart');}}
          />
        )
      };
    };


  state = {
    qty: get(this.props.cartItems.find(item => item._id === this.props.navigation.getParam('item')._id), 'quantity', 1),
    inCart: !!this.props.cartItems.find(item => item._id === this.props.navigation.getParam('item')._id),
    startQuantity: get(this.props.cartItems.find(item => item._id === this.props.navigation.getParam('item')._id), 'quantity', 0)
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
    Alert.alert(
      'Added to basket',
      `${qty} ${item.name} was added to the basket.`,
    );
    this.props.addToCart({...item, quantity: qty});
    const {navigation} = this.props;
    navigation.goBack();
  };

  removeFromCart = (item) => {
    Alert.alert(
      `Removed ${item.name} from basket`,
    );
    this.props.removeItemFromCart(item);
    const {navigation} = this.props;
    navigation.goBack();
  };

  render() {
    const {qty, inCart, startQuantity} = this.state;
    return (
      <ItemCard

        restaurantName={this.props.selectedRestaurant.name}
        item={this.item}
        qty={qty}
        qtyChanged={this.qtyChanged}
        removeFromCart={this.removeFromCart}
        addToCart={this.addToCart}
        inCart={inCart}
        startQuantity={startQuantity}
      />
    );
  }
}
const ConnectedItemDetails = connect(mapStateToProps, mapDispatchToProps)(ItemDetails);

export default ConnectedItemDetails;
