import React from "react"
import ScoreCount from "../utility/ScoreCount"
import Score from "../interface/Score"
import Timer from "../interface/Timer"
import Skip from "../interface/Skip"

import './InfoTab.css'

const InfoTab = ({score, setScore, 
    multiplier, 
    skip, setSkip, 
    wrong, setWrong, 
    lives, setLives, 
    tokens, setTokens,
    questions, setQuestions, 
    setFinished, seconds,
    extraTime, revealTime,
    difficulty
}) => {
    return(
        <div className="infotab">
            <div className="score-place">
                <ScoreCount score={score} difficulty={difficulty} questions={questions}/>
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
                    tokens={tokens}
                    setTokens={setTokens}
                    questions={questions}
                    setQuestions={setQuestions}
                    setFinished={setFinished}
                    seconds={seconds}
                    extraTime={extraTime}
                    difficulty={difficulty}
                />
            </div>
            <div className="skip-place">
                <Skip
                    skip={skip} 
                    setSkip={setSkip} 
                    questions={questions}
                    setQuestions={setQuestions}
                />
            </div>
        </div>
    )
}

export default InfoTab