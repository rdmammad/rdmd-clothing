import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_wYhotDMAxCEH9wTdtz3XK1cR00qZT6CJdP';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(res => {
            alert('Payment was successfull')
        }).catch(err => {
            console.log('Payment error:', JSON.parse(err))
            alert('There was an issue with your payment. Please make sure you use the provided credit cart.')
        })
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="RDMD Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeButton;