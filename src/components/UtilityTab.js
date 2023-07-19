import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import { correctAnswerF1 } from '../questions/Flags1'
import { correctAnswerF2 } from "../questions/Flags2";
import { correctAnswerC1 } from "../questions/Capitals1";
import { correctAnswerC2 } from "../questions/Capitals2";
import { correctAnswerC3 } from "../questions/Capitals3";
import { correctAnswerC4 } from "../questions/Capitals4";

import life from '../img/life.png'
import tokens from '../img/tokens.png'
import abort from '../img/abort.png'
import search from '../img/search.png'

import './UtilityTab.css'

const UtilityTab = ({ lives, token, 
    difficulty, index,
    multiplier,
    setFinished, 
    }) => {
    const auth = useContext(AuthContext)

    const { fetchRequest } = useHttpRequest()

    const [abortItem, setAbortItem] = useState(0)
    const [searchItem, setSearchItem] = useState(0)
    const livesref = useRef()
    const liferef = useRef()
    const pastlives = useRef(lives)
    
    useEffect(() => {
        if (pastlives.current > lives) {
            livesref.current.style.animation = 'animatelives 0.5s'
            liferef.current.style.animation = 'animatelife 0.5s'
        }
    }, [lives])

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/users/inventory/${auth.name}`,
                'GET',
                { Authorization: 'Bearer ' + auth.token })
    
                setAbortItem(data.user.abort)
                setSearchItem(data.user.search)
            } catch (err) { }
        }
        getUserProfile()
    }, [auth.name, auth.token, fetchRequest, abortItem, searchItem])
    
    const onUseAbort = async () => {
        if (abortItem >= 1) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/abort/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })

                setAbortItem(abortItem - 1)
                setFinished(true)
            } catch (err) { }
        }
    }

    const onUseSearch = async () => {
        if (searchItem >= 1) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/search/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })
    
                if (difficulty === 'easy') {
                    if (index === 0) correctAnswerF1.current.style.backgroundColor = '#4da64d'
                    if (index === 1) correctAnswerF2.current.style.borderColor = 'green'
                    if (index === 2) correctAnswerC1.current.style.backgroundColor = '#4da64d'
                    if (index === 3) correctAnswerC2.current.style.backgroundColor = '#4da64d'
                }
                if (difficulty === 'hard') {
                    if (index === 0) correctAnswerF1.current.style.backgroundColor = '#4da64d'
                    if (index === 1) correctAnswerF2.current.style.borderColor = 'green'
                    if (index === 2) correctAnswerC1.current.style.backgroundColor = '#4da64d'
                    if (index === 3) correctAnswerC2.current.style.backgroundColor = '#4da64d'
                    if (index === 4) correctAnswerC3.current.style.backgroundColor = '#4da64d'
                    if (index === 5) correctAnswerC4.current.style.borderColor = 'green'
                }
    
                setSearchItem(searchItem - 1)
            } catch (err) { }
        }
    }
    
    return (
        <>
            <div className="utilitytab">
                <div className="livesandtokens">
                    <div className="lives" ref={livesref} key={lives}>
                        <img ref={liferef} src={life} alt='life' />
                        <p className="livesanimate">&nbsp; {lives}</p>
                    </div>
                    <div className="tokens">
                        <img src={tokens} alt='tokens' />
                        <p>&nbsp; {token}</p>
                    </div>
                    <div className="multiplier">
                        <p>x {multiplier}</p>
                    </div>
                </div>
                <div className="items">
                    <div className="item">
                        <img src={abort} alt='abort' onClick={onUseAbort}/>
                        <p>{abortItem}</p>
                    </div>
                    <div className="item">
                        <img src={search} alt='search' onClick={onUseSearch}/>
                        <p>{searchItem}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UtilityTab