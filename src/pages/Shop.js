import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import back from '../img/back.png'
import items from '../img/items.png'
import flag from '../img/flag.png'
import premium from '../img/premium.png'

import './Shop.css'

const Shop = () => {
    return (
        <>
            <nav className="shop-nav-bar">
                <ul className="shop-nav-pages">
                    <NavLink to='/shop/items' >
                        <li className="shop-nav-links">
                            <img src={items} alt='items' />
                        </li>
                    </NavLink>
                    <NavLink to='/shop/flag' >
                        <li className="shop-nav-links">
                            <img src={flag} alt='flag' />
                        </li>
                    </NavLink>
                    <NavLink to='/shop/premium' >
                        <li className="shop-nav-links">
                            <img src={premium} alt='premium' />
                        </li>
                    </NavLink>
                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Shop