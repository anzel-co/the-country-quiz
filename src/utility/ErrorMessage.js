import React, {useRef} from "react";

import './ErrorMessage.css'

const ErrorMessage = ({ error, setShowError }) => {
    const errorMessage = useRef()

    const onConfirmHandler = () => {
        setShowError(false)
        errorMessage.current.close()
    }

    return (
    <dialog className="errorMessage" ref={errorMessage}>
        {error}
    <p className="errorMessageButton" onClick={onConfirmHandler}>CONFIRM</p>
    </dialog>
)

}

export default ErrorMessage