import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap'
import fox from '../img/fox.png';

const LoginPage = () => {
  const [errorLogin, setErrorLogin] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values)
    },
  });

  return (
    <Container>
      <Row>
        <Col>
        <Image src={fox} roundedCircle />
        </Col>
        <Col>
        <h1>Войти</h1>
        <Form className="my-4" style={{ width: '18rem', margin: 'auto' }} onSubmit={formik.handleSubmit} >
          <Form.Group className="mb-3" controlId="formUsernamel">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"
              placeholder="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={errorLogin} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={errorLogin} />
            {errorLogin && (
              <Form.Control.Feedback type="invalid">
                The username or password is incorrect
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button variant="outline-primary" type="submit">Submit</Button>
        </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage