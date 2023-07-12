import React, { useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import './Timer.css'

export let timeStop
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
    questions, setQuestions, 
    setFinished, seconds,
    extraTime
    }) => {
    timeStop = useRef(true)
    const randomSeconds = Math.floor(Math.random() * (30 - 10 + 1)) + 10
    const Countdown = () => {
        return (
        <div className="timer-wrapper">
        <CountdownCircleTimer
            key={questions}
            size={60}
            strokeWidth={7}
            isPlaying={timeStop.current}
            duration={(seconds || randomSeconds) + extraTime}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 7, 3, 0]}
            onComplete={() => [true,
                500,
                setScore(score - (((randomSeconds * 10) + 50) * multiplier)),
                setWrong(wrong + 1),
                setLives(lives - 1),
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