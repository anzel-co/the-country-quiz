import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import home from '../img/home.png'
import leaderboards from '../img/leaderboards.png'
import reviewer from '../img/reviewer.png'
import profile from '../img/profile.png'

import './MainMenu.css'

const MainMenu = () => {
    return (
        <>
            <nav className="nav-bar-main">
                <ul className="nav-pages">
                    <NavLink to='/' >
                        <li className="nav-links">
                            <img src={home} alt='home' />
                        </li>
                    </NavLink>
                    <NavLink to='/leaderboards' >
                        <li className="nav-links">
                            <img src={leaderboards} alt='leaderboards' />
                        </li>
                    </NavLink>
                    <NavLink to='/reviewer' >
                        <li className="nav-links">
                            <img src={reviewer} alt='reviewer' />
                        </li>
                    </NavLink>
                    <NavLink to='/profile' >
                        <li className="nav-links">
                            <img src={profile} alt='profile' />
                        </li>
                    </NavLink>
                </ul>
            </nav>

            <Outlet />
        </>
        
    )
}

export default MainMenu