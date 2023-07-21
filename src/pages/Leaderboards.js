import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import './Leaderboards.css'

const Leaderboards = () => {


    return (
        <>
            <nav className="leaderboards">
                
                    <div className="leaderboards-rankings">
                    
                    <NavLink className="leaderboards-navlink" to='/leaderboards/rankings'>
                        RANKINGS
                        </NavLink>
                        
                    </div>
                    
                    
                <ul className="leaderboards-highscores">
                    <li className="leaderboards-highscore">
                        <NavLink className="leaderboards-navlink" to='/leaderboards/easyhighscore'>
                            FLAGS AND CAPITALS
                        </NavLink>
                    </li>
                    <li className="leaderboards-highscore">
                        <NavLink className="leaderboards-navlink" to='/leaderboards/mediumhighscore'>
                            GENERAL INFORMATION
                        </NavLink>
                    </li>
                        
                    <li className="leaderboards-highscore">
                        <NavLink className="leaderboards-navlink" to='/leaderboards/hardhighscore'>
                            THE COUNTRY QUIZ
                        </NavLink>
                    </li>
                    
                </ul>
            </nav>

            <Outlet/>
        </>
        
    )
}

export default Leaderboards