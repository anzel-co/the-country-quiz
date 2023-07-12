import React, { useRef } from "react";
import useFlags2 from "../types/useFlags2";
import { timeLeft } from "../interface/Timer";

import './Flags2.css'

export let correctAnswerF2

const Flags2 = ({score, setScore, multiplier, correct, setCorrect, wrong, setWrong, questions, setQuestions, lives, setLives, tokens, setTokens,setFinished, difficulty}) => {
    const { flag, country, flags } = useFlags2(questions)
    correctAnswerF2 = useRef()
    return(
        <div className="fl2_item-container">
            <div className="fl2_question">
                <p>Identify this country's flag.
                </p>
            </div>
            <div className="fl2_country-container">
                <p className="country"><b>{country}</b></p>
            </div>
            <div className="fl2_choices">
                <ul className="fl2_answers">
                {flags.map(f => <li
                className='fl2_answer'
                ref={flag === f ? correctAnswerF2 : null}
                onClick={() => {
                    if (flag === f) {
                        setScore(score + ((timeLeft / 10 * 10) * multiplier))
                        setCorrect(correct + 1)
                        setQuestions(questions + 1)
                        if (difficulty === 'hard') {
                            setTokens(tokens + ((timeLeft / 10 * 10) * multiplier))
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
                            setTokens(tokens - (Math.round((30 / timeLeft) * 10) * multiplier))
                        }
                    }
                }}    
                key={`${f}`}><img className="fl2_img" src={f} alt='country'/></li>)}
            </ul>
            </div>
        </div> 
    )
}

export default Flags2