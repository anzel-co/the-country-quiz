import React, { useState } from "react";
import Start from "../components/Start";
import InfoTab from "../components/InfoTab";
import Flags1 from "../components/Flags1";
import Flags2 from "../components/Flags2";
import UtilityTab from "../components/UtilityTab";
import Result from "../components/Result";

import './TheCountryQuiz.css'

const TheCountryQuiz = () => {
    const [active, setActive] = useState(false)
    const [score, setScore] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [correct, setCorrect] = useState(0)
    const [wrong, setWrong] = useState(0)
    const [lives, setLives] = useState(5)
    const [tokens, setTokens] = useState(10000)
    const [skip, setSkip] = useState(3)
    const [extraTime, setExtraTime] = useState(0)
    const [revealTime, setRevealTime] = useState(false)
    const [questions, setQuestions] = useState(0)
    const [finished, setFinished] = useState(false)
    const difficulty = 'hard'

    let randomIndex = Math.floor(Math.random() * 2)

    const types = [
    <Flags1 score={score}
        setScore={setScore}
        multiplier={multiplier}
        correct={correct}
        setCorrect={setCorrect}
        wrong={wrong}
        setWrong={setWrong}
        questions={questions}
        setQuestions={setQuestions}
        lives={lives}
        setLives={setLives}
        tokens={tokens}
        setTokens={setTokens}
        setFinished={setFinished}
        difficulty={difficulty}

    />
    , <Flags2 score={score}
        setScore={setScore}
        multiplier={multiplier}
        correct={correct}
        setCorrect={setCorrect}
        wrong={wrong}
        setWrong={setWrong}
        questions={questions}
        setQuestions={setQuestions}
        lives={lives}
        setLives={setLives}
        tokens={tokens}
        setTokens={setTokens}
        setFinished={setFinished}
        difficulty={difficulty}
    />
    , ]

    return (
        <div className="maingame">
            {!active && !finished && <Start setActive={setActive}
                skip={skip}
                lives={lives}
                setLives={setLives}
                extraTime={extraTime}
                setExtraTime={setExtraTime}
                revealTime={revealTime}
                setRevealTime={setRevealTime}
                multiplier={multiplier}
                setMultiplier={setMultiplier}
            />}
            {active && !finished && <InfoTab 
                score={score}
                setScore={setScore} 
                multiplier={multiplier} 
                skip={skip} 
                setSkip={setSkip} 
                wrong={wrong} 
                setWrong={setWrong}
                lives={lives}
                setLives={setLives}
                extraTime={extraTime}
                revealTime={revealTime}
                questions={questions}
                setQuestions={setQuestions}
                setFinished={setFinished}
            />}
            {active && !finished && types[randomIndex]}
            {active && !finished && <UtilityTab 
                lives={lives}
                token={tokens}
                difficulty={difficulty}
                index={randomIndex}
                multiplier={multiplier}
                setFinished={setFinished}
            />}
            {finished && <Result 
                questions={questions} 
                correct={correct} 
                wrong={wrong} 
                score={score}
                setTokens={setTokens} 
                difficulty={difficulty}
            />}
        </div>
    )
}

export default TheCountryQuiz