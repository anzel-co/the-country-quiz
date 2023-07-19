import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LandingPageMenu from './pages/LandingPageMenu';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import MainMenu from './pages/MainMenu';
import Flagsandcapitals from './pages/Flagsandcapitals';
import Home from './pages/Home'
import Play from './pages/Play';
import Shop from './pages/Shop';
import Items from './pages/Items';
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'
import UnderConstruction from './pages/UnderConstruction';

import './App.css'

let logoutTimer

const App = () => {
  const navigate = useNavigate()

  const [name, setName] = useState()
  const [token, setToken] = useState()
  const [expiration, setExpiration] = useState()

  const getName = (name) => {
    setName(name)
  }

  const login = (name, token, tokenExpiration) => {
    setName(name)
    setToken(token)
    
    const expiration = tokenExpiration || new Date(new Date().getTime() + 1000 * 60 * 720)
    setExpiration(expiration)
    localStorage.setItem('token', JSON.stringify({name: name, token: token, expiration: expiration.toISOString()}))
  }

  const logout = useCallback(() => {
    setName(null)
    setToken(null)
    setExpiration(null)
    localStorage.removeItem('token')
    navigate('/')
  }, [navigate])

  useEffect(() => {
    if (token && expiration) {
      const timeLeft = expiration.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, timeLeft)
    } else {
      clearTimeout(logoutTimer)
    }
  }, [token, expiration, logout])

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('token'))
    if (userToken && 
      userToken.token && 
      new Date(userToken.expiration) > new Date()) 
      login(userToken.name, userToken.token, new Date(userToken.expiration))
  }, [])

  let routes
  if (token) {
    routes = (
      <Routes>
        <Route path='/' element={<MainMenu />}>
          <Route index element={<Home />}/>
          <Route exact path='/play' element={<Play />}/>
          <Route path='leaderboards' element={<UnderConstruction />}/>
          <Route path='reviewer' element={<UnderConstruction />}/>
          <Route path='profile' element={<Profile />}/>
        </Route>
        <Route path='/shop' element={<Shop />}>
          <Route path='/shop/items' element={<Items />} />
          <Route path='/shop/flags' element={<UnderConstruction />} />
          <Route path='/shop/premium' element={<UnderConstruction />} />
        </Route>
        <Route path='/flagsandcapitals' element={<Flagsandcapitals />} />
        <Route path='/generalinfo' element={<UnderConstruction />}/>
        <Route path='/thecountryquiz' element={<UnderConstruction />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<LandingPageMenu />}>
          <Route index element={<Welcome />}/>
          <Route path='leaderboards' element={<UnderConstruction />}/>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
        </Route>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    )
  }

  return (
    <div className='app' style={{fontFamily: 'Franklin Gothic Medium'}}>
    <AuthContext.Provider value={{name: name, getName: getName, token: token, login:login, logout:logout}}>

      {routes}

        
    </AuthContext.Provider>
    </div>
  )
}

export default App;