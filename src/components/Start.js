import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import confirm from '../img/confirm.png'
import cancel from '../img/cancel.png'
import skips from '../img/skip.png'
import life from '../img/life.png'
import addlife from '../img/addlife.png'
import addtime from '../img/addtime.png'
import showtime from '../img/showtime.png'
import ottdice from '../img/ottdice.png'
import ffsdice from '../img/ffsdice.png'

import './Start.css'

const ott = () => Math.floor(Math.random() * (3 - 1 + 1) + 1)


const ffs = () => Math.floor(Math.random() * (6 - 4 + 1) + 4)

const Start = ({ setActive, skip,
    lives, setLives,
    extraTime, setExtraTime,
    multiplier, setMultiplier,
    revealTime, setRevealTime
}) => {
    const [addLife, setAddLife] = useState(3)
    const [addTime, setAddTime] = useState(3)
    const [showTime, setShowTime] = useState(3)
    const [ottDice, setOttDice] = useState(3)
    const [ffsDice, setFfsDice] = useState(3)

    const onUseAddLife = () => {
        if (addLife >= 1) {
            setAddLife(addLife - 1)
            setLives(lives + 1)
        }
    }

    const onUseAddTime = () => {
        if (extraTime === 5) return
        if (addTime >= 1) {
            setAddTime(addTime - 1)
            setExtraTime(5)
        }
    }

    const onUseShowTime = () => {
        if (revealTime === true) return
        if (revealTime === false) {
            setShowTime(showTime - 1)
            setRevealTime(true)
        }
    }

    const onUseOttDice = () => {
        if (ottDice >= 1) {
            setOttDice(ottDice - 1)
            setMultiplier(ott())
        }
    }

    const onUseFfsDice = () => {
        if (ffsDice >= 1) {
            setFfsDice(ffsDice - 1)
            setMultiplier(ffs())
        }
    }

    const onClickHandler = () => setActive(true)
    return(
        <div className="start">
            <h2>Do you want to start the quiz?</h2>
            <hr />
            <div className="start-info">
                <div className="skip-start">
                    <img src={skips} alt="skips" />
                    <p>{skip}</p>
                </div>
                <div className="lives-start">
                    <img src={life} alt="life" />
                    <p>{lives}</p>
                </div>
                <div className="time-start">
                    <h3>EXTRA<br/>TIME:</h3>
                    <p>{extraTime}</p>
                </div>
                <div className="multiplier-start">
                    <h3>SCORE<br/>MULTIPLIER:</h3>
                    <p>{multiplier}</p>
                </div>
            </div>
            <br/>
            <div className="start-items">
                <div className="start-item" onClick={onUseAddLife}>
                    <img src={addlife} alt='addlife' />
                    <p>{addLife}</p>
                </div>
                <div className="start-item" onClick={onUseAddTime}>
                    <img src={addtime} alt='addtime' />
                    <p>{addTime}</p>
                </div>
                <div className="start-item">
                    <img src={showtime} alt='showtime' onClick={onUseShowTime}/>
                    <p>{showTime}</p>
                </div>
                <div className="start-item" onClick={onUseOttDice}>
                    <img src={ottdice} alt='ottdice' />
                    <p>{ottDice}</p>
                </div>
                <div className="start-item" onClick={onUseFfsDice}>
                    <img src={ffsdice} alt='ffsdice' />
                    <p>{ffsDice}</p>
                </div>
            </div>
            <br/>
            <hr />
            <div className="start-buttons">
            <NavLink > 
                <img src={confirm} alt='confirm' onClick={onClickHandler}/>
            </NavLink>
            <NavLink to='/play'>
                <img src={cancel} alt='cancel' />
            </NavLink>
            </div>
        </div>
    )
}

export default Start