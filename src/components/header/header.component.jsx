import React from "react";
import {connect} from 'react-redux';
import "./header.style.scss";
import {ReactComponent as Logo} from "../../assets/crown.svg";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

const Header = ({currentUser}) => (
    <div className='header'>
        <Link to='/' className="logo-container">
            <Logo className="logo"/>
        </Link>
        <div className='options'>
            <Link to='/shop' className='option' >SHOP</Link>
            <Link to='/contact' className='option' >CONTACT</Link>
            <div>
                {
                    currentUser ?
                        <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link to='/signin' className='option' >SIGN IN</Link>
                }
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);