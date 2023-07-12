import React, {useState} from "react";
import { correctAnswerF1 } from './Flags1'
import { correctAnswerF2 } from "./Flags2";

import life from '../img/life.png'
import tokens from '../img/tokens.png'
import abort from '../img/abort.png'
import search from '../img/search.png'

import './UtilityTab.css'


const UtilityTab = ({ lives, token, 
    difficulty, index,
    multiplier,
    setFinished, 
    }) => {
    const [abortItem, setAbortItem] = useState(3)
    const [searchItem, setSearchItem] = useState(3)

    const onUseAbort = () => {
        if(abortItem){
            setAbortItem(abortItem - 1)
            setFinished(true)
        }
    }

    const onUseSearch = () => {
        if(searchItem) {
            if (difficulty === 'hard') {
            if (index === 0) correctAnswerF1.current.style.backgroundColor = 'green'
            if (index === 1) correctAnswerF2.current.style.borderColor = 'green'
        }
        setSearchItem(searchItem - 1)
        }    
    }
    
    return (
        <div className="utilitytab">
            <div className="livesandtokens">
                <div className="lives">
                    <img src={life} alt='life' />
                    <p>&nbsp; {lives}</p>
                </div>
                <div className="tokens">
                    <img src={tokens} alt='tokens' />
                    <p>&nbsp; {token}</p>
                </div>
                <div className="multiplier">
                    <p>x {multiplier}</p>
                </div>
            </div>
            <div className="items">
                <div className="item">
                    <img src={abort} alt='abort' onClick={onUseAbort}/>
                    <p>{abortItem}</p>
                </div>
                <div className="item">
                    <img src={search} alt='search' onClick={onUseSearch}/>
                    <p>{searchItem}</p>
                </div>
            </div>
        </div>
    )
}

export default UtilityTab