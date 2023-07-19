import React from "react";
import { NavLink } from "react-router-dom";

import './Welcome.css'

import thecountryquiz from '../img/thecountryquiz.png'

const Welcome = () => {
    return(
        <div className="welcome">
            <img className="thecountryquiz-logo" src={thecountryquiz} alt='thecountryquiz'/>
            <div className="welcome-message">
                <p>Welcome to The Country Quiz!</p> 
                <p>A gamified quiz about countries.</p>
                <br/>
                <p>Start playing by signing in <NavLink to='/login'>here</NavLink>. If you dont have an account, sign up <NavLink to='/register'>here</NavLink>.</p>
            </div>
        </div>
    )
}

export default Welcome