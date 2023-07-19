import React, { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import useCapitals1 from "../hooks/useCapitals1";
import { timeLeft } from "../interface/Timer";

import './Capitals1.css'

export let correctAnswerC1

const Capitals1 = ({score, setScore, 
    multiplier, 
    correct, setCorrect, 
    wrong, setWrong, 
    questions, setQuestions, 
    lives, setLives, 
    tokens, setTokens, 
    setFinished, difficulty
}) => {
    const auth = useContext(AuthContext)

    const { fetchRequest } = useHttpRequest()

    const { country, capital, countries } = useCapitals1(questions)
    correctAnswerC1 = useRef()

    return (
        <div className="cap1_item">
            <div className="cap1_question">
                <p>Where is this capital located?</p>
            </div>
            <div className="cap1_capital">
                <p><b>{capital}</b></p>
            </div>
            <div className="cap1_choices">
                <ul className="cap1_answers">
                    {countries.map(c => <li
                    className="cap1_answer"
                    ref={country === c ? correctAnswerC1 : null}
                    onClick={async () => {
                        if (country === c) {
                            setScore(score + ((timeLeft / 10 * 10) * multiplier))
                            setCorrect(correct + 1)
                            setQuestions(questions + 1)
                            if (difficulty === 'hard') {
                                setTokens(tokens + ((timeLeft / 10 * 10) * multiplier))
                                try {
                                    await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/update/records/${auth.name}`,
                                    'PATCH',
                                    { 'Content-Type': 'application/json' ,
                                    Authorization: 'Bearer ' + auth.token },
                                    JSON.stringify({
                                        tokens: ((timeLeft / 10 * 10) * multiplier),
                                        score: ((timeLeft / 10 * 10) * multiplier),
                                        corrects: 1,
                                        wrongs: 0})
                                    )
                                } catch (err) { }
                            }
                        }
                        else {
                            if (difficulty === 'hard') setScore(score - (Math.round((30 / timeLeft) * 10) * multiplier))
                            else setScore(Math.max(0, score - (Math.round((30 / timeLeft) * 10) * multiplier)))
                            setWrong(wrong + 1)
                            setQuestions(questions + 1)
                            setLives(lives - 1)
                            if(lives <= 1) setFinished(true)
                            if (difficulty === 'hard') {
                                setTokens(Math.max(0, tokens - (Math.round((30 / timeLeft) * 10) * multiplier)))
                                try {
                                    await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/update/records/${auth.name}`,
                                    'PATCH',
                                    { 'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + auth.token },
                                    JSON.stringify({
                                        tokens: -Math.round((30 / timeLeft) * 10) * multiplier,
                                        score: -Math.round((30 / timeLeft) * 10) * multiplier,
                                        corrects: 0,
                                        wrongs: 1})
                                    )
                                } catch (err) { }                            
                            }
                        }
                    }}
                    key={c}>{c}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Capitals1