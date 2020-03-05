import React from 'react';
import {Route, Switch} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils.js";
import NotFoundPage from "./components/not-found-page/not-found-page.component"
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";

import './App.css';

class App extends React.Component{
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
                if(userAuth){
                    const userRef = await createUserProfileDocument(userAuth);

                    userRef.onSnapshot(snapshot => {
                        setCurrentUser({
                            id: snapshot.id,
                            ...snapshot.data(),
                        });
                    });
                }
                else
                    setCurrentUser(userAuth);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/shop" component={ShopPage}/>
                    <Route exact path="/signin" component={SignInAndSignUpPage}/>
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
