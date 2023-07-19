import React, {useEffect, useState, useContext} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import Loading from "../utility/Loading";
import ErrorMessage from "../utility/ErrorMessage";
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
    const auth = useContext(AuthContext)

    const { loading, error, fetchRequest} = useHttpRequest()

    const [addLife, setAddLife] = useState(0)
    const [addTime, setAddTime] = useState(0)
    const [showTime, setShowTime] = useState(0)
    const [ottDice, setOttDice] = useState(0)
    const [ffsDice, setFfsDice] = useState(0)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const getUserInventory = async () => {
            try {
                const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/users/inventory/${auth.name}`, 
                'GET',
                { Authorization: 'Bearer ' + auth.token })
    
                setAddLife(data.user.addlife)
                setAddTime(data.user.addtime)
                setShowTime(data.user.showtime)
                setOttDice(data.user.ottdice)
                setFfsDice(data.user.ffsdice)
            } catch (err) {
                setShowError(true)
            }
        }
        getUserInventory()
    }, [auth.name, auth.token, fetchRequest, addLife, addTime, showTime, ottDice, ffsDice])

    const onUseAddLife = async () => {
        if (addLife >= 1) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/addlife/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })

                setLives(lives + 1)
                setAddLife(addLife - 1)
            } catch (err) {
                setShowError(true)
            }
        }
    }

    const onUseAddTime = async () => {
        if (extraTime === 5) return
        if (addTime >= 1) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/addtime/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })

                setExtraTime(extraTime + 5)
                setAddTime(addTime - 1)
            } catch (err) {
                setShowError(true)
            }
        }
    }

    const onUseShowTime = async () => {
        if (revealTime === true) return
        if (showTime >= 1) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/showtime/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })

                setRevealTime(true)
                setShowTime(showTime - 1)
            } catch (err) {
                setShowError(true)
            }
        }
    }

    const onUseOttDice = async () => {
        if (ottDice >= 1) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/ottdice/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })

                setMultiplier(ott())
                setOttDice(ottDice - 1)
            } catch (err) {
                setShowError(true)
            }
        }
    }
    

    const onUseFfsDice = async () => {
        if (ffsDice) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/ffsdice/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })
                
                setMultiplier(ffs())
                setFfsDice(ffsDice - 1)
            } catch (err) {
                setShowError(true)
            }
        }
    }

    const onClickHandler = () => setActive(true)

    return(
        <div className="start">
            {loading && <Loading />}
            {showError && <ErrorMessage error={error} setShowError={setShowError} />}
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
                <div className="start-item" onClick={onUseShowTime} >
                    <img src={showtime} alt='showtime' />
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
            <img src={confirm} alt='confirm' onClick={onClickHandler}/>
            <NavLink to='/play'>
                <img src={cancel} alt='cancel' />
            </NavLink>
            </div>
        </div>
    )
}

export default Start