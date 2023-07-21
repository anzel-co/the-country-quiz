import React, { useState, useEffect, useRef } from "react";

import './ScoreCount.css'



const ScoreCount = ({ score}) => {
    const [scoreDif, setScoreDif] = useState(0)
    const scoreCount = useRef(0)

    useEffect(() => {
        setScoreDif(score - scoreCount.current + 0)
        scoreCount.current = score 
        
    }, [score])

    return(
        <small key={scoreDif} className="score-count"><i>{scoreDif > 0 && '+'}{scoreDif !== 0 ? scoreDif : ''}</i></small>
    )
}

export default ScoreCount