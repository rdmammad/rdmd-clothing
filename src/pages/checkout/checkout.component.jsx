import React from "react";
import "./checkout.style.scss";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectTotalPrice} from "../../redux/cart/cart.selectors";

const CheckoutPage = ({cartItems, totalPrice}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-block">
                <span>Product</span>
            </div>
            <div className="header-block">
                <span>Description</span>
            </div>
            <div className="header-block">
                <span>Quantity</span>
            </div>
            <div className="header-block">
                <span>Price</span>
            </div>
            <div className="header-block">
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => cartItem.name)
        }
        <div className="total">
            <span>TOTAL: ${totalPrice}</span>
        </div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalPrice: selectTotalPrice,
});

export default connect(mapStateToProps)(CheckoutPage);