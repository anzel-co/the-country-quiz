import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import './Timer.css'

export let timeLeft
const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
    }
    timeLeft = remainingTime
    return (
        <div className="timer">
            <div className="value">{remainingTime}</div>
        </div>
    )
}

const Timer = ({score, setScore, 
    multiplier, 
    wrong, setWrong, 
    lives, setLives, 
    tokens, setTokens,
    questions, setQuestions, 
    extraTime, setFinished,
    seconds, difficulty
    }) => {
    const randomSeconds = Math.floor(Math.random() * (30 - 10 + 1)) + 10
    const Countdown = () => {
        return (
        <div className="timer-wrapper">
        <CountdownCircleTimer
            key={questions}
            size={60}
            strokeWidth={7}
            isPlaying={true}
            duration={(seconds || randomSeconds) + extraTime}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 7, 3, 0]}
            onComplete={() => [true,
                500,
                setScore(() => {
                    if (difficulty === 'hard') return score - ((((randomSeconds + extraTime) * 10) + 50) * multiplier)
                    else return Math.max(0, score - (Math.round((30 / timeLeft) * 10) * multiplier))
                }),
                setWrong(wrong + 1),
                setLives(lives - 1),
                setTokens(tokens - ((((difficulty === 'hard' ? (randomSeconds + extraTime) : (seconds + extraTime)) * 10) + 50) * multiplier)),
                lives <= 1 && setFinished(true),
                setQuestions(questions + 1),
            ]}>
            {renderTime}
        </CountdownCircleTimer>
    </div>
    )
    }
    return (<Countdown />)
}
export default Timer