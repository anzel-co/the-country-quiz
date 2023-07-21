import React from "react";
import { useNavigate } from "react-router-dom"
import update from '../img/update.png'

import './UnderConstruction.css'

const UnderConstruction = () => {
    const navigate = useNavigate()

    return (
        <div className="underconstruction">
            <img src={update} alt='update' />
            <p>
                Content not yet available.
            </p>
            <p>
                Update is on the way.
            </p>
            <small><i>- Ansari</i></small>
            <br />

            <div className="redirectme" onClick={() => navigate('/')}>
                REDIRECT ME
            </div>
        </div>
    )
}

export default UnderConstruction