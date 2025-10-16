import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState} from 'react'
import axios from 'axios'
import _ from 'lodash'
import * as yup from 'yup'
import { useFormik } from 'formik'

const duplicateCheck = (value, allChannels) => {
    let channelsNames = []
    for (let key in allChannels) {

        channelsNames.push(allChannels[key].name)
    }
    console.log(channelsNames)
    const result = _.includes(channelsNames, value)
    if (result === false) {
        return true
    }
    else {
        return false
    }
}

const RenameChannelModal = ({ value, show, modalHide }) => {
    console.log(value || 'yps')
    const inputEl = useRef(null)
    const token = localStorage.getItem('token')
    const allChannels = useSelector(state => state.channels.entities)



    useEffect(() => {
        if (value) {
            formik.setFieldValue('channelName', value.value.name);
        }
    }, [value])
    // автофокус

    useEffect(() => {
        if (show && inputEl.current) {
            inputEl.current.focus()
        }
    }, [show])

    // валидация формы
    const schema = yup.object().shape({
        channelName: yup
            .string()
            .required('Обязательное поле')
            .min(3, 'Минимум 3 символа')
            .max(20, 'Максимум 20 символов')
            .test('unique', 'Должно быть уникальным', (value) => {
                return duplicateCheck(value, allChannels)
            }),
    })

    // форма начальное значение и отправка на сервер
    const formik = useFormik({
        initialValues: {
            channelName: ''
        },
        validationSchema: schema,
        onSubmit: async values => {
            try {
                const editedChannel = { name: values.channelName }
                const channelId = value.value.id
                const response = await axios.patch(
                    `/api/v1/channels/${channelId}`,
                    editedChannel,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                console.log('изменено название канала', response.data)
                formik.resetForm()
                modalHide()
            } catch (error) {
                console.log(error)
            }
        },
    });


    const hideModal = () => {
        formik.resetForm()
        modalHide()
    }


    return (
        <Modal show={show} onHide={hideModal}>
            <Modal.Header closeButton >
                <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Group className="mb-3" controlId="formAdd" >
                        <Form.Control
                            data-testid="input-body"
                            ref={inputEl}
                            type="text"
                            name="channelName"
                            placeholder=''
                            onChange={formik.handleChange}
                            value={formik.values.channelName}
                            isInvalid={formik.touched.channelName && !!formik.errors.channelName} />
                        {formik.touched.channelName && formik.errors.channelName && (
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.channelName}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button variant="secondary" className='me-2' onClick={hideModal}>Отменить</Button>
                        <Button type="submit" className='btn-primary'>Отправить</Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default RenameChannelModal