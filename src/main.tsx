import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element ={<Login/>}></Route>
      <Route path='/' element ={<App/>}></Route>
      <Route path='/register' element = {<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
