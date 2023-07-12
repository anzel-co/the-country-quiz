import React from "react";
import skips from '../img/skip.png'

import './Skip.css'

const Skip = ({ skip, setSkip, setScore, questions, setQuestions}) => {
    return (
        <div className="skip-wrapper" onClick={() => { 
            if (skip > 0) {
                setSkip((skip) => skip - 1)
                setScore((score) => score + 10)
                setQuestions(questions + 1)
            }}}>
            <img src={skips} alt='skip' className="skip" />
            <i>{skip}</i>
        </div>
    )
}

export default Skip