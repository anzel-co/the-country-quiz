import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import Loading from "../utility/Loading";

import './Register.css'

const Register = () => {
    const { loading, error, fetchRequest} = useHttpRequest()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const auth = useContext(AuthContext)

    const nameChangeHandeler = e => {
        setName(e.target.value)
    }

    const emailChangeHandeler = e => {
        setEmail(e.target.value)
    }

    const passwordChangeHandeler = e => {
        setPassword(e.target.value)
    }

    const submitFormHandler = async (e) => {
        e.preventDefault()

        try {
            const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/register`, 
                'POST',
                { 'Content-Type': 'application/json' },
                JSON.stringify({
                    name: name, 
                    email: email, 
                    password: password })
            )

            auth.login(data.name, data.token)
            navigate('/')
        } catch (err) { }
    }

    return(
        <div className="register" onSubmit={submitFormHandler}>
            {loading && <Loading />}
            <form className="register-form" >
                <div className="name-input-field">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-input" value={name} id='name' type="name" minLength='2' onChange={nameChangeHandeler} />
                </div>
                <div className="email-input-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input" value={email} id='email' type="email" onChange={emailChangeHandeler} />
                </div>
                <div className="password-input-field">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-input" value={password} id='password' type="password" minLength='8' onChange={passwordChangeHandeler} />
                </div>
                <button className="form-button" >REGISTER</button>
                {error && <div className="invalid-message"><small><i>{error}</i></small></div>}
            </form>
        </div>
    )
}

export default Register