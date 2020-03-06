import React from "react";
import "./cart-icon.atyle.scss";
import {ReactComponent as ShoppingIcon} from "../../assets/original.svg";
import {connect} from "react-redux";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className='item-count'>
            {itemCount}
        </span>
    </div>
);

const mapStateToProps = ({cart: {cartItems}}) => ({
    itemCount: cartItems.reduce((acc, cartItem) => (acc + cartItem.quantity), 0),
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);