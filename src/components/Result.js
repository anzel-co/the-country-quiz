import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import Loading from "../utility/Loading";
import ErrorMessage from "../utility/ErrorMessage";

import tokens from '../img/tokens.png'
import home from '../img/home.png'
import leaderboards from '../img/leaderboards.png'

import './Result.css'

const Result = ({questions, correct, wrong, score, difficulty}) => {
    const auth = useContext(AuthContext)

    const { loading, error, fetchRequest} = useHttpRequest()

    const tokenReward = score + questions + correct

    const tokenCompensation = (questions + correct) * 2

    const [showError, setShowError] = useState(false)

    const wrongAnswers = wrong < 2 ? 'WRONG ANSWER' : 'WRONG ANSWERS'
    const correctAnswers = correct < 2 ? 'CORRECT ANSWER' : 'CORRECT ANSWERS'

    useEffect(() => {
        const getResult = async () => {
            if (difficulty === 'easy') {
                try {
                    await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/easy/${auth.name}`,
                    'PATCH',
                    { 'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token },
                    JSON.stringify({
                        tokenReward: tokenReward,
                        score: score})
                    )
                } catch (err) {
                    setShowError(true)
                }
            }

            if (difficulty === 'medium') { }

            if (difficulty === 'hard') { 
                try {
                    await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/hard/${auth.name}`,
                    'PATCH',
                    { 'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token },
                    JSON.stringify({
                        tokenCompensation: tokenCompensation,
                        score: score})
                    )
                } catch (err) {
                    setShowError(true)
                }
            }
        }
        getResult()
    }, [auth.name, auth.token, fetchRequest, difficulty, score, tokenReward, tokenCompensation])
    
    // const Reward = () => {
    //     return (
    //         <>
    //             <p>REWARD</p>
    //             <div className="reward">
    //                 <img src={tokens} alt='tokens'/>
    //                 <i> &nbsp; {tokenReward}</i>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <div className="result">
            {loading && <Loading />}
            {showError && <ErrorMessage error={error} />}
            <h2>RESULT</h2>
            <hr />
            <div className="rundown">
                <p>TOTAL OF <b>{questions}</b> QUESTIONS ANSWERED</p> 
                <p><b>{correct}</b> {correctAnswers}</p>
                <p><b>{wrong}</b> {wrongAnswers}</p>
                <br />
                <p>SCORE: <b>{score}</b></p>
                <br />
                <p>{difficulty === 'hard' ? 'COMPENSATION :' : 'REWARD :'}</p>
                <div className="reward">
                    <img src={tokens} alt='tokens'/>
                    <i> &nbsp; {difficulty === 'hard' ? tokenCompensation : tokenReward}</i>
                </div>
            </div>
            <br />
            <div className="result-buttons">
                <NavLink to='/'>
                    <div className="result-button">
                        <img src={home} alt='home' />
                    </div>
                </NavLink>
                <NavLink to='/leaderboards'>
                    <div className="result-button">
                        <img src={leaderboards} alt='leaderboards' />
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Result