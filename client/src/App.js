import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils.js";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import {default as Header} from "./components/header/header.container";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import NotFoundPage from "./components/not-found-page/not-found-page.component"
import CheckoutPage from "./pages/checkout/checkout.component";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";

import './App.css';

const App = ({setCurrentUser}) => {
    let unsubscribeFromAuth = null;

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    });
                });
            } else
                setCurrentUser(userAuth);
        });

        return () => {
            unsubscribeFromAuth();
        }
    }, []);

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path="/shop" component={ShopPage}/>
                <Route exact path="/signin"
                       render={() => this.props.currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUpPage/>)}/>
                <Route exact path="/checkout" component={CheckoutPage}/>
                <Route path="*" component={NotFoundPage}/>
            </Switch>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
