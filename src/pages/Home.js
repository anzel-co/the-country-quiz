import React, {useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import UpdateLogs from "../utility/UpdateLogs";

import thecountryquiz from '../img/thecountryquiz.png'
import play from '../img/play.png'
import shop from '../img/shop.png'
import info from '../img/info.png'
import updatelogs from '../img/updatelogs.png'

import './Home.css'

const Home = () => {
    const modal = useRef()

    const [showUpdateLogs, setShowUpdateLogs] = useState(false)

    return (
        <div className="home">
            {showUpdateLogs && <UpdateLogs setShowUpdateLogs={setShowUpdateLogs} />}
            <img className="home-updatelogs" src={updatelogs} alt='updatelogs' onClick={() => setShowUpdateLogs(true)
            } />
            <img className="thecountryquiz-logo" src={thecountryquiz} alt='thecountryquiz'/>
            <div className="home-buttons">
                <NavLink to='/play' >
                    <img src={play} alt='play'/>
                </NavLink>
                <NavLink to='/shop/items' >
                    <img src={shop} alt='shop'/>
                </NavLink>
                <img src={info} alt='info' style={{width: '2.5rem'}} onClick={e => modal.current.show()}/>
            </div>
            <dialog className="info-message" ref={modal}>
                THE COUNTRY QUIZ
                <p>A gamified quiz about countries that is made to be competetive and challenging. Earn tokens from answering the quiz and use it to help you achieve a highscore that is worthy of posting in the leaderboards.</p>
                <br />

                <p><small><i>The api used in this project is available at <a href="https://restcountries.com/" target="_blank"  rel="noreferrer" >https://restcountries.com/</a>. Consider donating to them <a href="https://restcountries.com/#donations" target="_blank"  rel="noreferrer" >here</a>.</i></small></p>
                <p><small><i>To get in touch, you can write me an email at ansariusman@anzel.co for suggestions and bug reports.</i></small></p>
                <br/>

                <p><small><b><i>&copy; 2023 THECOUNTRYQUIZ.COM <br/> ALL RIGHTS RESERVED</i></b></small></p>
                <br/>

                <p className="info-button" onClick={e => modal.current.close()}>CLOSE</p>
            </dialog>
        </div>
    )
}

export default Home