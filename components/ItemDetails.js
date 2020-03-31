import React from 'react';
import {Alert} from 'react-native';
import CartButton from "./common/CartButton";
import ItemCard from './ItemCard';
import { connect } from 'react-redux';
import { addToCart} from '../redux';

const mapDtoP = (dispatch) =>{
  return {
    addToCart: item => dispatch(addToCart(item))
  }
}
class ItemDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: "Item Details",
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
    console.log('added to cart', 
      'Added to basket',
      `${qty} ${item.name} was added to the basket.`)
    Alert.alert(
      'Added to basket',
      `${qty} ${item.name} was added to the basket.`,
    );
    this.props.addToCart({...item, quantity: qty});
    const {navigation} = this.props;
    navigation.goBack();
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
const ConnectedItemDetails = connect(null, mapDtoP)(ItemDetails);

export default ConnectedItemDetails;
