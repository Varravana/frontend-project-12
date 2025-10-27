import { Button, Form, InputGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import send from '../img/send.png'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'

const InputMessage = () => {
    const currentUsername = localStorage.getItem('username')
    const currentChannelId = useSelector(state => state.curentChannel.id)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: values => {
            const newMessage = { body: filter.clean(values.body), channelId: currentChannelId, username: currentUsername }
            axios.post('/api/v1/messages', newMessage, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    if (response.data) {
formik.resetForm()
                        console.log('сообщение отправлено инпут', response.data)
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
                        aria-label='Новое сообщение'
                        type="email"
                        placeholder={t('inputMessageForm.placeholder')}
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