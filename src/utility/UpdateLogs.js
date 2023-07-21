import React, { useRef } from "react";
import './UpdateLogs.css'

export let updateLogs

const UpdateLogs = ({ setShowUpdateLogs }) => {
    updateLogs = useRef()

    return (
        <div className="updatelogs" >
            <div className="updatelogs-wrapper">
                <div className="update">
                    <div className="update-version">
                        QUICK UPDATE
                        <br />
                        July 21, 2023
                        <br />
                        v1.1.4
                    </div>
                    <div className="update-changes">
                        <ul>
                            <li>
                                Added Flags and Capitals highscores in the leaderboards.
                            </li>
                            <br />
                            <li>
                                Fixed styling of back button. 
                            </li>
                            <li>
                                Fixed edit and save button.
                            </li>
                            <li>
                                Changed info button.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="update">
                    <div className="update-version">
                        FIRST RELEASE
                        <br />
                        July 20, 2023
                        <br />
                        v1.0.0
                    </div>
                    <div className="update-changes">
                        <ul>
                            <li>
                                The Country Quiz release at thecountryquiz.com.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className="updatelogs-close" onClick={() => setShowUpdateLogs(false)}>CLOSE</p>
        </div>
    )
}

export default UpdateLogs