import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import Loading from "../utility/Loading";

import './Login.css'

const Login = () => {
    const { loading, error, fetchRequest } = useHttpRequest()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const auth = useContext(AuthContext)

    const emailChangeHandeler = e => {
        setEmail(e.target.value)
    }

    const passwordChangeHandeler = e => {
        setPassword(e.target.value)
    }

    const submitFormHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/login`, 
            'POST', 
            { 'Content-Type': 'application/json',},
            JSON.stringify({
                email: email, 
                password: password })
            )
            auth.login(data.name, data.token)
            navigate('/')
        } catch (err) { }
    }

    return(
        <div className="login" onSubmit={submitFormHandler}>
            {loading && <Loading />}
            <form className="login-form" >
                <div className="email-input-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input" value={email} id='email' type="email" onChange={emailChangeHandeler} />
                </div>
                <div className="password-input-field">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-input" value={password} id='password' type="password" minLength='8' onChange={passwordChangeHandeler} />
                </div>
                <button className="form-button" >LOG IN</button>
                {error && <div className="invalid-message"><small><i>{error}</i></small></div>}
            </form>
        </div>
    )
}

export default Login