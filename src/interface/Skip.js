import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import skips from '../img/skip.png'

import './Skip.css'

const Skip = ({ skip, setSkip, questions, setQuestions}) => {
    const auth = useContext(AuthContext)

    const { fetchRequest } = useHttpRequest()

    const onUseSkip = async () => {
        if (skip >= 1) {
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/use/skip/${auth.name}`,
                'PATCH',
                { Authorization: 'Bearer ' + auth.token })
                setSkip(skip - 1)
                setQuestions(questions + 1)
            } catch (err) { }
            try {
                await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/update/records/${auth.name}`,
                'PATCH',
                { 'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token },
                JSON.stringify({
                    tokens: 0,
                    score: 0,
                    corrects: 0,
                    wrongs: 0})
                )
            } catch (err) { }
        }
    }

    return (
        <div className="skip-wrapper" onClick={onUseSkip}>
            <img src={skips} alt='skip' className="skip" />
            <i>{skip}</i>
        </div>
    )
}

export default Skip