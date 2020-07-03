import React from "react";
import "./cart-dropdown.style.scss";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import {withRouter} from "react-router-dom";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const CartDropdown = ({cartItems, history, toggleCartHidden}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                    cartItems.map(item => (
                        <CartItem key={item.id} item={item}/>
                    ))
                    : <span className='empty-message'>Your cart is empty</span>
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            toggleCartHidden();
        }}>CHECKOUT</CustomButton>
    </div>
);

export default withRouter(CartDropdown);