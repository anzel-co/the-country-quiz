import React from "react";
import './ErrorPage.css'

const ErrorPage = () => {
    return(
        <div className="error-container">
            <div className="error-wrapper">
                <div className="error404">ERROR 404</div>
                <div className="pagenotfound">Page not found.</div>
                <br />
                <div><small><i>For suggestions and bug reports, you can write me an email at ansariusman@anzel.co</i></small></div>
            </div>
        </div>
        
    )
}

export default ErrorPage