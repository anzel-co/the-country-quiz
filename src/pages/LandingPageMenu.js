import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import welcome from '../img/welcome.png'
import leaderboards from '../img/leaderboards.png'
import login from '../img/login.png'
import register from '../img/register.png'

import './LandingPageMenu.css'

const LandingPageMenu = () => {
    return (
        <>
            <nav className="nav-bar-landing-page">
                <ul className="nav-pages">
                    <NavLink to='/' >
                        <li className="nav-links">
                            <img src={welcome} alt='welcome' />
                        </li>
                    </NavLink>
                    <NavLink to='/leaderboards' >
                        <li className="nav-links">
                            <img src={leaderboards} alt='leaderboards' />
                        </li>
                    </NavLink>
                    <NavLink to='/login' >
                        <li className="nav-links">
                            <img src={login} alt='login' />
                        </li>
                    </NavLink>
                    <NavLink to='/register' >
                        <li className="nav-links">
                            <img src={register} alt='register' />
                        </li>
                    </NavLink>
                </ul>
            </nav>

            <Outlet />
        </>
        
    )
}

export default LandingPageMenu