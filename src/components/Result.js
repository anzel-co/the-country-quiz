import React from "react";
import { NavLink } from "react-router-dom";

import tokens from '../img/tokens.png'
import home from '../img/home.png'
import leaderboards from '../img/leaderboards.png'

import './Result.css'

const Result = ({questions, correct, wrong, score, setTokens, difficulty}) => {
    const tokenReward = score + questions + correct

    const Reward = () => {
        return (
            <>
                <p>REWARD</p>
                <div className="reward">
                    <img src={tokens} alt='tokens'/>
                    <i> &nbsp; {tokenReward}</i>
                </div>
            </>
        )
    }

    return (
        <div className="result">
            <h2>RESULT</h2>
            <hr />
            <div className="rundown">
                <p>TOTAL OF <b>{questions}</b> QUESTIONS ANSWERED</p> 
                <p><b>{correct}</b> CORRECT ANSWERS</p>
                <p><b>{wrong}</b> WRONG ANSWERS</p>
                <br />
                <p>SCORE: <b>{score}</b></p>
                <br />
                {difficulty === 'hard' && <Reward />}
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