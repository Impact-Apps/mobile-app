import React from 'react';
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

    const doPayment = async (amount, tokenId) => {
        const body = {
            amount,
            tokenId,
            userId: props.user.user._id,
            stripeAccountId: 'acct_1Gga61LK3s7xe9vD',
            email: props.user.auth.name
        };
        console.log(body);
          return axios
            .post(`${BASE_API_URL}/payment/doPayment`, body)
            .then(({ data }) => {
              return data;
            })
            .catch(error => {
              return Promise.reject('Error in making payment', error);
            });
        };
  const state = {
    isPaymentPending: false,
  }
  const requestPayment = () => {
    // setState({ isPaymentPending: true });
    state.isPaymentPending = true;

    console.log(props.user.auth.name, props.user.user._id)
    return stripe
        .paymentRequestWithCardForm()
        .then(stripeTokenInfo => {
        return doPayment(100, stripeTokenInfo.tokenId);
        })
        .then(() => {
        console.warn('Payment succeeded!');
        })
        .catch(error => {
        console.warn('Payment failed', { error });
        })
        .finally(() => {
            state.isPaymentPending = false
        });
  };
 
return (
    <View style={styles.container}>
    <Button
        title="Make a payment"
        onPress={requestPayment}
        disabled={state.isPaymentPending}
    />
    </View>
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