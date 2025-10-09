import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import NotFound from './NotFound.jsx'
import MainPage from './MainPage.jsx'
import { Button, Navbar, Nav, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'


const ChatRoute = ({ children }) => {

  const userLoginToken = useSelector(state => state.login.token)

  return (
    userLoginToken ? children : <Navigate to="/login" />
  )
}

const App = () => {


  return (
    <div className='d-flex flex-column h-100 '>
      <Navbar bg="white" className='shadow-sm' expand="lg">
        <Container>
          <Navbar.Brand href="/">Varravana Chat</Navbar.Brand>
        </Container>
      </Navbar>


      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={(
            <ChatRoute>
              <MainPage />
            </ChatRoute>
          )} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
