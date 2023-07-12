import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import back from '../img/back.png'
import token from '../img/tokens.png'
import play from '../img/play-small.png'
import stoken from '../img/tokens-small.png'
import skips from '../img/skip.png'
import addlife from '../img/addlife.png'
import addtime from '../img/addtime.png'
import showtime from '../img/showtime.png'
import ottdice from '../img/ottdice.png'
import ffsdice from '../img/ffsdice.png'
import abort from '../img/abort.png'
import search from '../img/search.png'

import './Items.css'

const Items = () => {
    const [tokens, setTokens] = useState(10000)
    
    return  (
        <div className="items-shop">
            <div className="tokens-left">
                <div className="goback">
                    <NavLink to='/' >
                        <img src={back} alt='back' />
                    </NavLink>
                </div>
                <div className="tokens-top">
                    <p><b>{tokens}</b></p>
                    <img src={token} alt='stoken'/>
                </div>
                <div className="goplay">
                    <NavLink to='/play' >
                        <img src={play} alt='play' />
                    </NavLink>
                </div>
            </div>
            <div className="items-forsale">
                <div className="item-forsale">
                    <h3>SKIP</h3>
                    <img src={skips} alt='skips' />
                    <br/>
                    <small>Skip a question.</small>
                    <div className="cost">
                        <img src={stoken} alt='stoken' />
                        <small><b>500</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>LIFE POINT</h3>
                    <img src={addlife} alt='addlife' />
                    <br/>
                    <small>Adds 1 life.</small>
                    <div className="cost">
                    <img src={stoken} alt='stoken' />
                        <small><b>1000</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>TIME EXTEND</h3>
                    <img src={addtime} alt='addtime'/>
                    <br/>
                    <small>Extends timer by 5 seconds.</small>
                    <div className="cost">
                        <img src={stoken} alt='stoken' />
                        <small><b>2000</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>REVEAL TIMER</h3>
                    <img src={showtime} alt='showtime' />
                    <br/>
                    <small>Unhides the timer.</small>
                    <div className="cost">
                        <img src={stoken} alt='stoke'/>
                        <small><b>2500</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>MULTIPLIER I</h3>
                    <img src={ottdice} alt='ottdice' />
                    <br/>
                    <small>Sets multiplier from 1 to 3.</small>
                    <div className="cost">
                        <img src={stoken} alt='stoken' />
                        <small><b>2000</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>MULTIPLIER II</h3>
                    <img src={ffsdice} alt='ffsdice' />
                    <br/>
                    <small>Sets multiplier from 4 to 6.</small>
                    <div className="cost">
                        <img src={stoken} alt='stoken' />
                        <small><b>5000</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>EXIT</h3>
                    <img src={abort} alt='abort' />
                    <br/>
                    <small>Ends game prematurely.</small>
                    <div className="cost">
                        <img src={stoken} alt='stoken' />
                        <small><b>200</b></small>
                    </div>
                </div>
                <div className="item-forsale">
                    <h3>SEARCH</h3>
                    <img src={search} alt='search' />
                    <br/>
                    <small>Reveals correct answer.</small>
                    <div className="cost">
                        <img src={stoken} alt='stoken' />
                        <small><b>7500</b></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Items