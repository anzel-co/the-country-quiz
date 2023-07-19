import React from "react";
import update from '../img/update.png'

import './UnderConstruction.css'

const UnderConstruction = () => {
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
        </div>
    )
}

export default UnderConstruction