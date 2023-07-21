import React, { useEffect, useState } from "react";
import { useHttpRequest } from "../utility/http-request";
import Loading from "../utility/Loading";
import ErrorMessage from "../utility/ErrorMessage";

import './Highscores.css'

const EasyHighscores = () => {
    const { loading, error, fetchRequest} = useHttpRequest()

    const [users, setUsers] = useState([])
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/users/easyhighscores`)

                setUsers(data.users)
            } catch (err) {
                setShowError(true)
            }
        }
        getUsers()
    }, [fetchRequest])

    const firstplace_style = {
        color: 'gold',
        borderColor: 'gold'
    }

    const secondplace_style = {
        color: '#c0c0c0',
        borderColor: '#c0c0c0'
    }

    const thirdplace_style = {
        color: '#d2691e',
        borderColor: '#d2691e'
    }

    return (
        <div className="highscores">
            {loading && <Loading />}
            {showError && <ErrorMessage error={error} setShowError={setShowError} />}
            <div className="highscores-users">
                <div className="highscores-title">
                    ALL-TIME HIGH SCORES
                </div>
                <div className="highscores-list" >
                    {users.map((user, index) => <div className="highscores-user" style={index === 0 ? firstplace_style 
                        : index === 1 ? secondplace_style
                        : index === 2 ? thirdplace_style
                        : null} key={user.name}>
                        <div className="highscores-user-rank">
                            <p>{index + 1}.</p>
                        </div>
                        <div className="highscores-user-info">
                            <img className="highscores-user-info-image" src={user.image.includes(".svg") ? user.image : `${process.env.PUBLIC_URL}/img/${user.image}.png`} alt='alt' />
                            <p>{user.name}</p>
                        </div>
                        <div className="highscores-users-score">
                            <i className="highscores-score">{user.easyhs}</i>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default EasyHighscores