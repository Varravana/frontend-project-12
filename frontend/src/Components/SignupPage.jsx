import axios from 'axios'
import { useFormik } from 'formik'
import { Button, Form, Container, Row, Image, Card, FloatingLabel, Alert } from 'react-bootstrap'
import cat from '../img/cat.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLogin } from '../slices/loginSlice.js'

const SignupPage = () => {
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const notify = () => toast.error(`${t('toast.errors.netError')}`)

  const schema = yup.object().shape({
    username: yup
      .string()
      .required(`${t('signupPage.yup.required')}`)
      .min(3, `${t('signupPage.yup.min3')}`)
      .max(20, `${t('signupPage.yup.max20')}`),
    password: yup
      .string()
      .required(`${t('signupPage.yup.required')}`)
      .min(6, `${t('signupPage.yup.min6')}`),
    confirmpassword: yup
      .string()
      .required(`${t('signupPage.yup.required')}`)
      .test('password-match', `${t('signupPage.yup.passwordMatch')}`, function (value) {
        const password = this.parent.password
        return value === password
      }),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/signup', { username: values.username, password: values.password })
        console.log('Регистрация успешна', response.data)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', response.data.username)
        dispatch(setLogin({ token: response.data.token, username: response.data.username }))
        formik.resetForm()
        setServerError(null)
        navigate('/', { replace: false })

      }
      catch (error) {
        if (error.response && error.response.status === 409) {
          setServerError(`${t('signupPage.serverError.userExists')}`)
        }
        else {
          notify()
          setServerError(`${t('signupPage.serverError.errorRegistration')}`)
        }
      }
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
                <h1 className="text-center">{t('signupPage.form.h1')}</h1>

                <FloatingLabel className="mb-3" controlId="floatingUsername" label={t('signupPage.form.labelName')}>
                  <Form.Control
                    type="text"
                    placeholder="username!"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={formik.touched.username && !!formik.errors.username}
                  />
                  {formik.touched.username && !!formik.errors.username && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label={t('signupPage.form.labelPassword')} className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={formik.touched.password && !!formik.errors.password}

                  />
                  {formik.touched.password && !!formik.errors.password && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="floatingConfirmPassword" label={t('signupPage.form.labelPasswordConfirm')}>
                  <Form.Control
                    type="password"
                    placeholder="ConfirmPassword"
                    name="confirmpassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmpassword}
                    isInvalid={formik.touched.confirmpassword && !!formik.errors.confirmpassword}
                  />
                  {formik.touched.confirmpassword && !!formik.errors.confirmpassword && (
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.confirmpassword}
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>

                {serverError && (
                  <Alert variant="danger" className="mb-4">
                    {serverError}
                  </Alert>
                )}

                <Button variant="outline-primary" type="submit">{t('signupPage.form.submitButton')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  )
}

export default SignupPage
