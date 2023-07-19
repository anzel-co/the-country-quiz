import React, { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import useCapitals4 from "../hooks/useCapitals4";
import { timeLeft } from "../interface/Timer";

import './Capitals4.css'

export let correctAnswerC4

const Capitals4 = ({score, setScore, 
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

    const { flag, capital, flags } = useCapitals4(questions)
    correctAnswerC4 = useRef()

    return (
        <div className="cap4_item">
            <div className="cap4_question">
                <p>Where is this capital located?</p>
            </div>
            <div className="cap4_capital">
                <p className="capital"><b>{capital}</b></p>
            </div>
            <div className="cap4_choices">
                <ul className="cap4_answers">
                    {flags.map(f => <li
                    className='cap4_answer'
                    ref={flag === f ? correctAnswerC4 : null}
                    onClick={async () => {
                        if (flag === f) {
                            setScore(score + ((timeLeft / 10 * 10) * multiplier))
                            setCorrect(correct + 1)
                            setQuestions(questions + 1)
                            if (difficulty === 'hard') {
                                setTokens(tokens + ((timeLeft / 10 * 10) * multiplier))
                                try {
                                    await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/update/records/${auth.name}`,
                                    'PATCH',
                                    { 'Content-Type': 'application/json',
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
                    key={f}><img className="fl2_img" src={f} alt='country'/></li>)}
                </ul>
            </div>
        </div> 
    )
}

export default Capitals4