import React, {useRef} from "react";

import './ErrorMessage.css'

export let errorMessage

const ErrorMessage = ({ error, setShowError }) => {
    errorMessage = useRef()

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