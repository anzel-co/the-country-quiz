import React from "react";
import { NavLink } from "react-router-dom";
import back from '../img/back.png'
import shop from '../img/shop.png'

import './Play.css'

const Play = () => {
    return (
        <div className="play">
            <NavLink to='/' >
                <img className="play_back" src={back} alt='back'/>
            </NavLink>
            <NavLink to='/shop/items'>
                <img className="play_shop" src={shop} alt='shop'/>
            </NavLink>
            <div className="mode">
                <NavLink className="mode-flagsandcapitals" to='/flagsandcapitals'>
                    <div>
                        <h3>Flags and Capitals</h3>
                        <ul>
                            <li>Easy</li>
                            <li>50 questions</li>
                            <li>20 seconds timer</li>
                            <li>3 lives</li>
                        </ul>
                    </div>
                </NavLink>
                <NavLink className="mode-generalfacts" to='/generalinfo'>
                    <div>
                        <h3>General Information</h3>
                        <ul>
                            <li>Medium</li>
                            <li>100 questions</li>
                            <li>30 seconds timer</li>
                            <li>4 lives</li>
                        </ul>
                    </div>
                </NavLink>
                <NavLink className="mode-thecountryquiz" to='/thecountryquiz'>
                    <div>
                        <h3>The Country Quiz</h3>
                        <ul>
                            <li>Hard</li>
                            <li>Unlimited questions</li>
                            <li>Random questions</li>
                            <li>Random timer</li>
                            <li>5 lives</li>
                            <li>High risk, low rewards</li>
                        </ul>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Play