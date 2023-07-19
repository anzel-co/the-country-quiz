import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import Start from "../components/Start";
import InfoTab from "../components/InfoTab";
import Flags1 from "../questions/Flags1";
import Flags2 from "../questions/Flags2";
import Capitals1 from "../questions/Capitals1";
import Capitals2 from "../questions/Capitals2";
import UtilityTab from "../components/UtilityTab";
import Result from "../components/Result";

import './Flagsandcapitals.css'

const Flagsandcapitals = () => {
    const auth = useContext(AuthContext)

    const { fetchRequest} = useHttpRequest()

    const [active, setActive] = useState(false)
    const [score, setScore] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [correct, setCorrect] = useState(0)
    const [wrong, setWrong] = useState(0)
    const [lives, setLives] = useState(3)
    const [tokens, setTokens] = useState(0)
    const [skip, setSkip] = useState(0)
    const [extraTime, setExtraTime] = useState(0)
    const [revealTime, setRevealTime] = useState(true)
    const [questions, setQuestions] = useState(0)
    const [finished, setFinished] = useState(false)

    let randomIndex = Math.floor(Math.random() * 4)

    useEffect(() => {
        if (questions >= 50) setFinished(true)
    }, [questions])

    useEffect(() => {
        const getUserInventory = async () => {
            try {
                const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/users/inventory/${auth.name}`,
                'GET',
                { Authorization: 'Bearer ' + auth.token })
                
                setTokens(data.user.tokens)
                setSkip(data.user.skip)
            } catch (err) {
            }
        }
        getUserInventory()
    }, [auth.name, auth.token, fetchRequest])

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
        difficulty={'easy'}

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
        difficulty={'easy'}
    />
    , <Capitals1 score={score}
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
        difficulty={'easy'}
    />
    , <Capitals2 score={score}
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
        difficulty={'easy'}
    />
    , ]
    
    return (
        <div className="flagsandcapitals">
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
                tokens={tokens}
                setTokens={setTokens}
                extraTime={extraTime}
                revealTime={revealTime}
                questions={questions}
                setQuestions={setQuestions}
                setFinished={setFinished}
                seconds={20}
                difficulty={'easy'}
            />}
            {active && !finished && types[randomIndex]}
            {active && !finished && <UtilityTab 
                lives={lives}
                token={tokens}
                difficulty={'easy'}
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
                difficulty={'easy'}
            />}
        </div>
    )
}

export default Flagsandcapitals