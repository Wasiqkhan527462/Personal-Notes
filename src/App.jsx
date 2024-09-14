import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import User from './components/User'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/signup" element={<Signup />}></Route>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/" element={<User />}></Route>
    </Routes>
    </BrowserRouter>
  )
}
