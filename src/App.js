import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import TheCountryQuiz from './pages/TheCountryQuiz';
import Home from './pages/Home'
import Play from './pages/Play';
import Shop from './pages/Shop';
import Items from './pages/Items';
import Leaderboards from './pages/Leaderboards'
import Reviewer from './pages/Reviewer'
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'

import './App.css'

const App = () => {

  return (
    <div className='thecountryquiz' style={{fontFamily: 'Franklin Gothic Medium'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainMenu />}>
            <Route index element={<Home />}/>
            <Route path='play' element={<Play />}/>
            <Route path='leaderboards' element={<Leaderboards />}/>
            <Route path='reviewer' element={<Reviewer />}/>
            <Route path='profile' element={<Profile />}/>
          </Route>
          <Route path='/shop/items' element={<Shop />}>
            <Route path='/shop/items' element={<Items />} />
          </Route>
          <Route path='/flagsandcapitals' />
          <Route path='/generalinfo' />
          <Route path='/thecountryquiz' element={<TheCountryQuiz />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;