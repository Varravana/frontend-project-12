import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import NotFound from './NotFoundPage.jsx'
import MainPage from './MainPage.jsx'
import SignupPage from './SignupPage.jsx'
import ExitButton from './ExitButton.jsx'
import { Navbar, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import filter from 'leo-profanity'


const ChatRoute = ({ children }) => {
  const userLoginToken = localStorage.getItem('token')

  return (
    userLoginToken ? children : <Navigate to="/login" />
  )
}

const App = () => {
const loginToken = useSelector((state) => state.login.token) 
const [exitButtonOn, setexitButtonOn]= useState(false)
filter.add(filter.getDictionary('ru'))

useEffect(()=> {
console.log(loginToken)
localStorage.getItem('token') ? setexitButtonOn(true) : setexitButtonOn(false)
}, [loginToken])

  return (
    <div className='d-flex flex-column h-100 '>
      <Navbar bg="white" className='shadow-sm' expand="lg">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          {exitButtonOn &&<ExitButton />}
        </Container>
      </Navbar>


      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="/" element={(
            <ChatRoute>
              <MainPage />
            </ChatRoute>
          )} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
<ToastContainer />
    </div>
  )
}

export default App
