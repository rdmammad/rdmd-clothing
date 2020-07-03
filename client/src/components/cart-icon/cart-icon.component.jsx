import React from "react";
import "./cart-icon.atyle.scss";

import {ReactComponent as ShoppingIcon} from "../../assets/original.svg";

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className='item-count'>
            {itemCount}
        </span>
    </div>
);

export default CartIcon;