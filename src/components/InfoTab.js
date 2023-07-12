import React from "react"
import Score from "../interface/Score"
import Timer from "../interface/Timer"
import Skip from "../interface/Skip"

import './InfoTab.css'

const InfoTab = ({score, setScore, 
    multiplier, 
    skip, setSkip, 
    wrong, setWrong, 
    lives, setLives, 
    questions, setQuestions, 
    setFinished, seconds,
    extraTime, revealTime
}) => {
    return(
        <div className="infotab">
            <div className="score-place">
                <Score score={score} multiplier={multiplier}/>
            </div>
            <div className="time-place" style={{visibility: revealTime === true ? 'visible' : 'hidden'}}>
                <Timer
                    score={score}
                    setScore={setScore}
                    multiplier={multiplier}
                    wrong={wrong}
                    setWrong={setWrong}
                    lives={lives}
                    setLives={setLives}
                    questions={questions}
                    setQuestions={setQuestions}
                    setFinished={setFinished}
                    seconds={seconds}
                    extraTime={extraTime}
                />
            </div>
            <div className="skip-place">
                <Skip
                    skip={skip} 
                    setSkip={setSkip} 
                    setScore={setScore}
                    questions={questions}
                    setQuestions={setQuestions}
                />
            </div>
        </div>
    )
}

export default InfoTab