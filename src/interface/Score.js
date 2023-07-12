import React from "react";

import './Score.css'

const Score = ({score, multiplier}) => {
    return (
        <div className="score-wrapper">
            <i className="score">{score}</i>
            <p className="multiplier-score">x {multiplier}</p>
        </div>
    )
}

export default Score