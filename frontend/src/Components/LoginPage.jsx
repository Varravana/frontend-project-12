import React from 'react'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Image, Card, FloatingLabel } from 'react-bootstrap'
import cat from '../img/cat.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { setLogin } from '../slices/loginSlice.js'

const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      axios.post('/api/v1/login', values)
        .then((response) => {
          if (response.data) {
            setErrorLogin(false)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            dispatch(setLogin({ token: response.data.token, username: response.data.username }))
            navigate('/', { replace: false })
          }
        })
        .catch((error) => {
          setErrorLogin(true)
          console.log(error)
        })
    },
  });

  return (
    <Container className='h-100 fluid '>
      <Row className='justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <Card className='shadow-sm'>
            <Card.Body className='row p-5'>
                <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                  <Image src={cat} />
                </div>
                  <Form className="col-12 col-md-6 mt-3 mt-md-0" style={{ width: '18rem', margin: 'auto' }} onSubmit={formik.handleSubmit} >
                    <h1 className='text-center'>Войти</h1>

                    <FloatingLabel className="mb-3" controlId="floatingUsername" label="Ваш ник">
                      <Form.Control
                        type="text"
                        placeholder="username!"
                        name='username'
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        isInvalid={errorLogin}
                      />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Пароль" className='mb-4'>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isInvalid={errorLogin}

                      />

                      {errorLogin && (
                        <Form.Control.Feedback type="invalid">
                          Неверные пароль или логин
                        </Form.Control.Feedback>
                      )}
                    </FloatingLabel>


                    <Button variant="outline-primary" type="submit">Submit</Button>
                  </Form>
            </Card.Body>
            <Card.Footer>
              <div className='text-center'>
                <span>Нет аккаунта? </span>
                <a href=''>Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  )
}

export default LoginPage