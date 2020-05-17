import React, { useState } from 'react';
import { View, Button } from 'react-native';
import stripe from 'tipsi-stripe';
import axios from 'axios';
import {connect} from "react-redux";
import {BASE_API_URL} from "react-native-dotenv";
stripe.setOptions({
  publishableKey: 'pk_test_0DYU1GynXrFGaouWABMCkA5c00JGZLaKwO',
});

const mapStateToProps = (state) =>{
    return {
        user: state.user,
        restaurantId: state.restaurantDetails.selectedRestaurant._id
    }
}


const Payment = (props) =>  {
    const [isPaymentPending, updatePaymentStatus] = useState(false);
  
  const requestPayment = () => {
    updatePaymentStatus(true)
    return stripe
        .paymentRequestWithCardForm()
        .then(stripeTokenInfo => {
            return props.submitOrder(stripeTokenInfo.tokenId, props.amount * 100)
        })
        .then(() => {
        console.warn('Order succeeded!');
        })
        .catch(error => {
        console.warn('Payment failed', { error });
        })
        .finally(() => {
            updatePaymentStatus(false)
        });
  };
 
return (
    <Button
        title="Pay Now"
        onPress={requestPayment}
        disabled={isPaymentPending}
    />
);
  
}

const ConnectedPayment = connect(mapStateToProps, null)(Payment);

export default ConnectedPayment;
