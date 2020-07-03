import React from "react";
import "./cart-icon.atyle.scss";
import {createStructuredSelector} from "reselect";

import {ReactComponent as ShoppingIcon} from "../../assets/original.svg";
import {connect} from "react-redux";
import {selectCartItemsCount} from "../../redux/cart/cart.selectors";

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className="shopping-icon"/>
        <span className='item-count'>
            {itemCount}
        </span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps)(CartIcon);