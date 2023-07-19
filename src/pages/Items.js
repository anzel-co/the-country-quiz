import React, {useContext, useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import Loading from "../utility/Loading";
import ErrorMessage from "../utility/ErrorMessage";
import back from '../img/back.png'
import token from '../img/tokens.png'
import play from '../img/play-small.png'
import stoken from '../img/tokens-small.png'
import skips from '../img/skip.png'
import addlife from '../img/addlife.png'
import addtime from '../img/addtime.png'
import showtime from '../img/showtime.png'
import ottdice from '../img/ottdice.png'
import ffsdice from '../img/ffsdice.png'
import abort from '../img/abort.png'
import search from '../img/search.png'

import './Items.css'

const Items = () => {
    const auth = useContext(AuthContext)

    const { loading, error, fetchRequest} = useHttpRequest()

    const [tokens, setTokens] = useState(0)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const getUserInventory = async () => {
            try {
                const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/users/inventory/${auth.name}`, 
                'GET', 
                {Authorization: 'Bearer ' + auth.token}
                )
                setTokens(data.user.tokens)
            } catch (err) {
                setShowError(true)
            }
        }
        getUserInventory()
    }, [auth.name, auth.token, fetchRequest, tokens])

    const buySkip = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/skip/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 500})
            )
            setTokens(tokens - 500)
        } catch (err) {
            setShowError(true)
        }
    }

    const buyAddlife = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/addlife/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 700})
            )
            setTokens(tokens - 700)
        } catch (err) {
            setShowError(true)
        }
    }

    const buyAddtime = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/addtime/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 1000})
            )
            setTokens(tokens - 1000)
        } catch (err) {
            setShowError(true)
        }
    }

    const buyShowtime = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/showtime/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 1000})
            )
            setTokens(tokens - 1000)
        } catch (err) {
            setShowError(true)
        }
    }

    const buyOttdice = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/ottdice/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 1000})
            )
            setTokens(tokens - 1000)
        } catch (err) {
            setShowError(true)
        }
    }
    
    const buyFfsdice = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/ffsdice/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 2500})
            )
            setTokens(tokens - 2500)
        } catch (err) {
            setShowError(true)
        }
    }

    const buyAbort = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/abort/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 200})
            )
            setTokens(tokens - 200)
        } catch (err) {
            setShowError(true)
        }
    }

    const buySearch = async () => {
        try {
            await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/buy/search/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                cost: 2500})
            )
            setTokens(tokens - 2500)
        } catch (err) {
            setShowError(true)
        }
    }

    return  (
        <div className="items-shop">
            {loading && <Loading />}
            {showError && <ErrorMessage error={error} setShowError={setShowError} />}
            <div className="tokens-left">
                <div className="goback">
                    <NavLink className="goBackImage" to='/' >
                        <img src={back} alt='back' />
                    </NavLink>
                </div>
                <div className="tokens-top">
                    <img src={token} alt='stoken'/>
                    <p>&nbsp;<b>{tokens}</b></p>
                </div>
                <div className="goplay">
                    <NavLink className="goPlayImage" to='/play' >
                        <img src={play} alt='play' />
                    </NavLink>
                </div>
            </div>
            <div className="items-forsale">
                <div className="item-forsale">
                    <h3>SKIP</h3>
                    <img src={skips} alt='skips' />
                    <br/>
                    <small>Skip a question.</small>
                    <div className="cost" onClick={buySkip} >
                        <img src={stoken} alt='stoken' />
                        <small><b>500</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>LIFE POINT</h3>
                    <img src={addlife} alt='addlife' />
                    <br/>
                    <small>Adds 1 life.</small>
                    <div className="cost" onClick={buyAddlife} >
                    <img src={stoken} alt='stoken' />
                        <small><b>700</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>TIME EXTEND</h3>
                    <img src={addtime} alt='addtime'/>
                    <br/>
                    <small>Extends timer by 5 seconds.</small>
                    <div className="cost" onClick={buyAddtime} >
                        <img src={stoken} alt='stoken' />
                        <small><b>1000</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>REVEAL TIMER</h3>
                    <img src={showtime} alt='showtime' />
                    <br/>
                    <small>Unhides the timer.</small>
                    <div className="cost" onClick={buyShowtime} >
                        <img src={stoken} alt='stoke'/>
                        <small><b>1000</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>MULTIPLIER I</h3>
                    <img src={ottdice} alt='ottdice' />
                    <br/>
                    <small>Sets multiplier from 1 to 3.</small>
                    <div className="cost" onClick={buyOttdice} >
                        <img src={stoken} alt='stoken' />
                        <small><b>1000</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>MULTIPLIER II</h3>
                    <img src={ffsdice} alt='ffsdice' />
                    <br/>
                    <small>Sets multiplier from 4 to 6.</small>
                    <div className="cost" onClick={buyFfsdice} >
                        <img src={stoken} alt='stoken' />
                        <small><b>2500</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>EXIT</h3>
                    <img src={abort} alt='abort' />
                    <br/>
                    <small>Ends game prematurely.</small>
                    <div className="cost" onClick={buyAbort} >
                        <img src={stoken} alt='stoken' />
                        <small><b>200</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>SEARCH</h3>
                    <img src={search} alt='search' />
                    <br/>
                    <small>Reveals correct answer.</small>
                    <div className="cost" onClick={buySearch} >
                        <img src={stoken} alt='stoken' />
                        <small><b>2500</b></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Items