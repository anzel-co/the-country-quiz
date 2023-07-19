import React, { useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import useFlags2 from "../hooks/useFlags2";
import { timeLeft } from "../interface/Timer";

import './Flags2.css'

export let correctAnswerF2

const Flags2 = ({score, setScore, 
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

    const { flag, country, flags } = useFlags2(questions)
    correctAnswerF2 = useRef()

    return (
        <div className="fl2_item">
            <div className="fl2_question">
                <p>Identify the country's flag.</p>
            </div>
            <div className="fl2_country">
                <p className="country"><b>{country}</b></p>
            </div>
            <div className="fl2_choices">
                <ul className="fl2_answers">
                    {flags.map(f => <li
                    className='fl2_answer'
                    ref={flag === f ? correctAnswerF2 : null}
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

export default Flags2