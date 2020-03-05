import React from "react";
import "./cart-icon.atyle.scss";
import {ReactComponent as ShoppingIcon} from "../../assets/original.svg";

const CartIcon = () => (
    <div className="cart-icon">
        <ShoppingIcon className="shopping-icon"/>
        <span className='item-count'>10</span>
    </div>
);

export default CartIcon;