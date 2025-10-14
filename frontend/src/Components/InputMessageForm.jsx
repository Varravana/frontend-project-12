import { Button, Nav, Form, Container, Row, Col, InputGroup, Image, Card, FloatingLabel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import send from '../img/send.png'

const InputMessage = () => {
    const currentUsername = localStorage.getItem('username')
    const currentChannelId = useSelector(state => state.curentChannel.id)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: values => {
            const newMessage = { body: values.body, channelId: currentChannelId, username: currentUsername }
            axios.post('/api/v1/messages', newMessage, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.data) { 

                        console.log('сообщение отправлено инпут',response.data)
                    }
                })
                .catch((error) => {
                    console.log('ошибка отправки сообщений', error)
                })
        },
    });

    return (
        <Form noValidate className='py-1 border rounded-2' onSubmit={formik.handleSubmit}>
            <Form.Group>
                <InputGroup hasValidation>
                    <Form.Control
                        className='border-0 p-0 ps-2'
                        name='body'
                        type="email"
                        placeholder="Введите сообщение..."
                        onChange={formik.handleChange}
                        value={formik.values.body} />
                    <Button variant="outline-secondary" type="submit">
                        <img img src={send}></img>
                    </Button>
                </InputGroup>
            </Form.Group>
        </Form>
    )
}

export default InputMessage