import React from 'react';
import { Link } from 'react-router-dom';
import NotFound from "../../assets/not-found.jpg";
import "./not-found-page.style.scss";

const NotFoundPage = ()=>{
    return(
        <div className="page-not-found">
            {/*<h1>PAGE NOT FOUND</h1>*/}
            <h1>
                <Link to="/">Go to Home </Link>
            </h1>
            <img className="image" src={NotFound} alt=""/>
        </div>
    )
};

export default NotFoundPage;