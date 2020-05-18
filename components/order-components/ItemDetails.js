import React from 'react';
import {Alert} from 'react-native';
import CartButton from "../common/CartButton";
import ItemCard from './ItemCard';
import { connect } from 'react-redux';
import { addToCart, removeItemFromCart } from '../../stores/redux';
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

  state = {
    qty: get(this.props.cartItems.find(item => item._id === this.props.route.params.item._id), 'quantity', 1),
    inCart: !!this.props.cartItems.find(item => item._id === this.props.route.params.item._id),
    startQuantity: get(this.props.cartItems.find(item => item._id === this.props.route.params.item._id), 'quantity', 0)
  };

  componentWillMount() {
    this.props.navigation.setOptions({
      headerTitle: this.props.route.params.item.name,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerRight: () => <CartButton
              onPress={() => {
                this.props.navigation.navigate('Cart');}}
            />
    })
  }


  constructor(props) {
    super(props);
    const {route} = this.props;
    this.item = route.params.item;
  };

  qtyChanged = value => {
    const nextValue = Number(value);
    this.setState({qty: nextValue});
  };

  addToCart = (item, qty) => {
    this.props.addToCart({...item, quantity: qty});
    const {navigation} = this.props;
    navigation.goBack();
  };

  removeFromCart = (item) => {
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
