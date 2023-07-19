import React, { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import useCapitals3 from "../hooks/useCapitals3";
import { timeLeft } from "../interface/Timer";

import './Capitals3.css'

export let correctAnswerC3

const Capitals3 = ({score, setScore, 
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

    const { capital, flag, capitals } = useCapitals3(questions)
    correctAnswerC3 = useRef()

    return (
        <div className="cap3_item">
            <div className="cap3_question">
                <p>What is the capital of...</p>
            </div>
            <div className="cap3_image">
                <img className="cap3_img" src={flag} alt='country'/>
            </div>
            <div className="cap3_choices">
                <ul className="cap3_answers">
                    {capitals.map(c => <li
                    className='cap3_answer'
                    ref={capital === c ? correctAnswerC3 : null}
                    onClick={async () => {
                        if (capital === c) {
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
                    key={c}>{c}</li>)}
                </ul>
            </div>
        </div> 
    )
}

export default Capitals3