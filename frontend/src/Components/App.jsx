import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import NotFound from './NotFound.jsx'
import MainPage from './MainPage.jsx'
import { Button, Navbar, Nav, Container } from 'react-bootstrap'

const App = () => {
  return (
    <div className='bg-light h-100'>
      <Navbar bg="white" className='shadow-sm' expand="lg">
        <Container>
          <Navbar.Brand href="/">Varravana Chat</Navbar.Brand>
        </Container>
      </Navbar>


        <BrowserRouter>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
