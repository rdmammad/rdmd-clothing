import React from "react";
import {graphql} from "react-apollo";
import {gql} from "apollo-boost";
import {flowRight} from 'lodash';

import CartIcon from "./cart-icon.component";
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden{
        toggleCartHidden @client
    }
`;

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

const CartIconContainer = ({data: {itemCount}, toggleCartHidden}) => (
    <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount}/>
);

export default flowRight(
    graphql(GET_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, {name: "toggleCartHidden"})   //otherwise it was called 'mutate'
)(CartIconContainer);