import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from "../../assets/not-found.jpg";
import "./not-found-page.style.scss";

const NotFoundPage = ()=>{
    return(
        <div className="page-not-found">
            <h2 className='title'>PAGE NOT FOUND | <Link to="/">Go to Home </Link></h2>
            <img className="image" src={NotFound} alt=""/>
        </div>
    )
};

export default NotFoundPage;