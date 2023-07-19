import React, {useState, useContext, useRef, useEffect} from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttpRequest } from "../utility/http-request";
import Loading from "../utility/Loading";
import ErrorMessage from "../utility/ErrorMessage";
import stoken from '../img/tokens-small.png'
import skips from '../img/skip.png'
import addlife from '../img/addlife.png'
import addtime from '../img/addtime.png'
import showtime from '../img/showtime.png'
import ottdice from '../img/ottdice.png'
import ffsdice from '../img/ffsdice.png'
import abort from '../img/abort.png'
import search from '../img/search.png'

import './Profile.css'

const Profile = () => {
    const auth = useContext(AuthContext)

    const modal = useRef()

    const { loading, error, fetchRequest} = useHttpRequest()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [images, setImages] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [tokens, setTokens] = useState(0)
    const [skipItem, setSkipItem] = useState(0)
    const [addlifeItem, setAddlifeItem] = useState(0)
    const [addtimeItem, setaddTimeItem] = useState(0)
    const [showtimeItem, setShowtimeItem] = useState(0)
    const [ottdiceItem, setOttdiceItem] = useState(0)
    const [ffsdiceItem, setFfsdiceItem] = useState(0)
    const [abortItem, setAbortItem] = useState(0)
    const [searchItem, setSearchItem] = useState(0)
    const [easyhs, setEasyhs] = useState(0)
    const [mediumhs, setMediumhs] = useState(0)
    const [hardhs, setHardhs] = useState(0)
    const [qp, setQp] = useState(0)
    const [questions, setQuestions] = useState(0)
    const [corrects, setCorrects] = useState(0)
    const [wrongs, setWrongs] = useState(0)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/users/profile/${auth.name}`, 'GET', 
                {Authorization: 'Bearer ' + auth.token})

                setName(data.user.name)
                    auth.getName(data.user.name)
                setImage(data.user.image)
                setImages(data.user.images)
                setTokens(data.user.tokens)
                setSkipItem(data.user.skip)
                setAddlifeItem(data.user.addlife)
                setaddTimeItem(data.user.addtime)
                setShowtimeItem(data.user.showtime)
                setOttdiceItem(data.user.ottdice)
                setFfsdiceItem(data.user.ffsdice)
                setAbortItem(data.user.abort)
                setSearchItem(data.user.search)
                setEasyhs(data.user.easyhs)
                setMediumhs(data.user.mediumhs)
                setHardhs(data.user.hardhs)
                setQp(data.user.qp)
                setQuestions(data.user.questions)
                setCorrects(data.user.corrects)
                setWrongs(data.user.wrongs)
            } catch (err) {
                setShowError(true)
            }
        }
        getUserProfile()
    }, [auth, fetchRequest])

    const onSave = async () => {
        try {
            const data = await fetchRequest(`${process.env.REACT_APP_BACKEND_URL}/users/save/${auth.name}`,
            'PATCH',
            { 'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token },
            JSON.stringify({
                newName: name, 
                newImage: image })
            )
            setEditMode(false)
            auth.login(data.name, data.token)
            auth.getName(data.name)
        } catch (err) { 
            setShowError(true)
        }
    }

    const inv = {
        skips: [skips, skipItem],
        addlife: [addlife, addlifeItem],
        addtime: [addtime, addtimeItem],
        showtime: [showtime, showtimeItem],
        ottdice: [ottdice, ottdiceItem],
        ffsdice: [ffsdice, ffsdiceItem],
        abort: [abort, abortItem],
        search: [search , searchItem],
    }

    const imageCollection = images.map(i => 
        <div className="image-holder" key={i}><img className="image-available" src={i.includes(".svg") ? i : `${process.env.PUBLIC_URL}/img/${i}.png`} alt='img' onClick={e => setImage(i)} /></div>
    )

    const itemCollection = Object.values(inv).map(i => <div className="inventory-item" key={i}>
        <img src={i[0]} alt={i[0]} />
        <p>{i[1]}</p>
        </div>)
    
    return (
        <div className="profile">
            {loading && <Loading />}
            {showError && <ErrorMessage error={error} setShowError={setShowError} />}
            <div className='top'>
                <div className="user">
                    <div className="user-profile">
                        <div className="user-image">
                            <img className="profile-image" src={image.includes(".svg") ? image : `${process.env.PUBLIC_URL}/img/${image}.png`} alt='icon'/>
                        </div>
                        {editMode === false && <div className="user-name">
                            <p className='profile-name'><b>{name}</b></p></div>}
                        {editMode === true && <div className="input-name">
                            <input value={name} onChange={e => setName(e.target.value)}/></div>}
                        {editMode === false && <div className="edit" onClick={e => setEditMode(true)}>
                            <p className="edit-button">EDIT</p>
                        </div>}
                        {editMode === true && <div className="save" onClick={onSave}>
                            <p className="save-button">SAVE</p>
                        </div>}
                    </div>
                </div>
                <div className="logout" onClick={e => modal.current.showModal()}>
                    <p><i>LOGOUT</i></p>
                </div>
                <dialog className="modal" ref={modal}>
                    <div className="modal-message">
                    <p>Are you sure you want log out?</p>
                    </div>
                    <div className="modal-buttons">
                        <p onClick={e => modal.current.close()}>CANCEL</p>
                        <p onClick={e => {
                            auth.logout()
                            auth.getName(null)
                        }}>CONFIRM</p>
                    </div>
                </dialog>        
            </div>
            {editMode === true && <div className="image-picker">
                {imageCollection}
            </div>}
            <div className="inventory-record">
                <div className="inventory">
                    <div className="inventory-title">
                        <p>INVENTORY</p>
                    </div>
                    <div className="inventory-tokens">
                        <img src={stoken} alt='tokens' />
                        <p>&nbsp;{tokens}</p>
                    </div>
                    <div className="inventory-items">
                        {itemCollection}
                    </div>
                </div>
                <div className="record">
                    <div className="record-title">
                        <p>RECORD</p>
                    </div>
                    <div className="records">
                        <p>Flags and Capitals: <i>{easyhs}</i></p>
                        <p>General Information: <i>{mediumhs}</i></p>
                        <p>The Country Quiz: <i>{hardhs}</i></p>
                        <br />
                        <p>Quiz Points: <i>{qp}</i></p>
                        <p>Questions Answered: <i>{questions}</i></p>
                        <p>Correct Answers: <i>{corrects}</i></p>
                        <p>Wrong Answers: <i>{wrongs}</i></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile