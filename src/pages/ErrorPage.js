import React from "react"
import { useNavigate } from "react-router-dom"
import './ErrorPage.css'

const ErrorPage = () => {
    const navigate = useNavigate()

    return(
        <div className="error-container">
            <div className="error-wrapper">
                <div className="error404">ERROR 404</div>
                <div className="pagenotfound">Page not found.</div>
                <br />
                <div><small><i>For suggestions and bug reports, you can write me an email at ansariusman@anzel.co</i></small></div>
                <br />
                <div className="redirectme" onClick={() => navigate('/')}>
                    REDIRECT ME
                </div>
            </div>
        </div>
        
    )
}

export default ErrorPage