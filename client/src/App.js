import React, {lazy, Suspense, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils.js";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import Header from "./components/header/header.component";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import Spinner from "./components/spinner/spinner.component";

import {GlobalStyle} from "./global.styles";

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const NotFoundPage = lazy(() => import('./components/not-found-page/not-found-page.component'));

const App = ({setCurrentUser, currentUser}) => {
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
        <>
            <GlobalStyle/>
            <Header/>
            <Switch>
                <Suspense fallback={Spinner}>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/shop" component={ShopPage}/>
                    <Route exact path="/signin"
                           render={() => currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUpPage/>)}/>
                    <Route exact path="/checkout" component={CheckoutPage}/>
                    <Route path="*" component={NotFoundPage}/>
                </Suspense>
            </Switch>
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
