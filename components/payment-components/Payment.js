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
    }
}


const Payment = (props) =>  {
    const [isPaymentPending, updatePaymentStatus] = useState(false);
    const doPayment = async (tokenId) => {
        const body = {
            amount: props.amount * 100,
            tokenId,
            userId: props.user.user._id,
            stripeAccountId: 'acct_1Gga61LK3s7xe9vD',
            email: props.user.auth.name
        };
          return axios
            .post(`${BASE_API_URL}/payment/doPayment`, body)
            .then(({ data }) => {
              return data;
            })
            .catch(error => {
              return Promise.reject('Error in making payment', error);
            });
        };
  
  const requestPayment = () => {
    updatePaymentStatus(true)
    console.log(props.user.auth.name, props.user.user._id)
    return stripe
        .paymentRequestWithCardForm()
        .then(stripeTokenInfo => {
          return doPayment(stripeTokenInfo.tokenId);

        })
        .then(() => {
        console.warn('Payment succeeded!');
        props.submitOrder()
        })
        .catch(error => {
        console.warn('Payment failed', { error });
        })
        .finally(() => {
            updatePaymentStatus(false)
        });
  };
 
return (
    // <View style={styles.container}>
    <Button
        title="Pay Now"
        onPress={requestPayment}
        disabled={isPaymentPending}
    />
    // </View>
);
  
}
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const ConnectedPayment = connect(mapStateToProps, null)(Payment);

export default ConnectedPayment;