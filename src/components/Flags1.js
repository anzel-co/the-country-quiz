import React, { useRef } from "react";
import useFlags1 from "../types/useFlags1";
import { timeLeft } from "../interface/Timer";

import './Flags1.css'

export let correctAnswerF1

const Flags1 = ({score, setScore, multiplier, correct, setCorrect, wrong, setWrong, questions, setQuestions, lives, setLives, tokens, setTokens,setFinished, difficulty}) => {
    const { country, flag, countries } = useFlags1(questions)
    correctAnswerF1 = useRef()
    return (
        <div className="fl1_item-container">
            <div className="fl1_question">
                <p className="fl1_q">What flag is this?</p>
            </div>
            <div className="fl1_image-container">
                <img className="fl1_img" src={flag} alt='country'/>
            </div>
            <div className="fl1_choices">
                <ul className="fl1_answers">
                {countries.map(c => <li
                className='fl1_answer'
                ref={country === c ? correctAnswerF1 : null}
                onClick={() => {
                    if (country === c) {
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
                key={`${c}`}>{c}</li>)}
            </ul>
            </div>
        </div> 
    )
}
export default Flags1