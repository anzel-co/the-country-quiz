import React from "react";
import { NavLink } from "react-router-dom";

import thecountryquiz from '../img/thecountryquiz.png'
import play from '../img/play.png'
import shop from '../img/shop.png'
import info from '../img/info.png'

import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <img className="thecountryquiz-logo" src={thecountryquiz} alt='thecountryquiz'/>
            <div className="home-buttons">
                <NavLink to='/play' >
                    <img src={play} alt='play'/>
                </NavLink>
                <NavLink to='/shop/items' >
                    <img src={shop} alt='shop'/>
                </NavLink>
                <img src={info} alt='info'/>
            </div>
        </div>
    )
}

export default Home