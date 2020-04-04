import React from "react";
import { Image, Text, View, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";


const mapStateToProps = (state) =>{
    return {
        numOfItems: state.cart.numOfItems
    }
}
const CartButton = props => (
      <TouchableOpacity onPress={props.onPress}>
        <Image
          style={{ width: 32, height: 32, marginRight: 16 }}
          source={require('../../assets/shopping-bag.png')}
        />
          {props.numOfItems === 0 ? null :
              <View
                  style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      backgroundColor: '#ef6136',
                      position: 'absolute',
                      right: 8,
                      top: 2
                  }}
              >
                  <Text
                      style={{
                          color: '#fff',
                          fontSize: 13,
                          textAlign: 'center',
                          lineHeight: 20
                      }}
                  >
                      {props.numOfItems}
                  </Text>
              </View>
          }
      </TouchableOpacity>
    )

const ConnectedCartButton = connect(mapStateToProps, null)(CartButton)
export default ConnectedCartButton;
