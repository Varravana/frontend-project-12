import axios from 'axios'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Container, Row, Image, Card, FloatingLabel } from 'react-bootstrap'
import cat from '../img/cat.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch } from 'react-redux'
import { setLogin } from '../slices/loginSlice.js'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const notify = () => toast.error(`${t('toast.errors.netError')}`)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
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
          notify()
          console.log(error)
        })
    },
  })

  return (
    <Container className="h-100 fluid">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={cat} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-md-0" style={{ width: '18rem', margin: 'auto' }} onSubmit={formik.handleSubmit}>
                <h1 className="text-center">{t('loginPage.h1')}</h1>

                <FloatingLabel className="mb-3" controlId="floatingUsername" label={t('loginPage.labelName')}>
                  <Form.Control
                    type="text"
                    placeholder="username!"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={errorLogin}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label={t('loginPage.labelPassword')} className="mb-4">
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
                      {t('loginPage.error')}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>

                <Button variant="outline-primary" type="submit">{t('loginPage.submitButton')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer>
              <div className="text-center">
                <span>{t('loginPage.noAkk')}</span>
                <a href="/signup">{t('loginPage.registration')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  )
}

export default LoginPage
