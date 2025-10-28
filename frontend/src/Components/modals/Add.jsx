import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector,  useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import filter from 'leo-profanity'
import { setcurentChannel } from '../../slices/curentChannelSlice.js'


const duplicateCheck = (value, allChannels) => {
    let channelsNames = []
    for (let key in allChannels) {
        channelsNames.push(allChannels[key].name)
    }
    const result = _.includes(channelsNames, value)
    if (result === false) {
        return true
    }
    else {
        return false
    }
}

const AddNewChannelModal = ({ show, modalHide }) => {

    const inputEl = useRef(null)
    const token = localStorage.getItem('token')
    const allChannels = useSelector(state => state.channels.entities)
    const [errorName, setErrorName] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()

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
            .required(`${t('modals.yup.required')}`)
            .min(3, `${t('modals.yup.min3')}`)
            .max(20, `${t('modals.yup.max20')}`)
            .test('unique', `${t('modals.yup.unique')}`, (value) => {
                return duplicateCheck(value, allChannels)
            }),
    })
    //уведомления
    const notifyAdd = () => toast.success(`${t('toast.channels.makeChannel')}`)

    // форма начальное значение и отправка на сервер
    const formik = useFormik({
        initialValues: {
            channelName: ''
        },
        onSubmit: values => {
            schema.validate(values, { abortEarly: false })
                .then((values) => {
                    setErrorName(false)
                    setErrorMessage(null)
                    const newChannel = { name: filter.clean(values.channelName) }
                    axios.post('/api/v1/channels', newChannel, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }).then((response) => {
                        notifyAdd()
                        dispatch(setcurentChannel({ id: response.data.id }))
                        console.log('добавлен новый канал', response.data); // => { id: '3', name: 'new channel', removable: true }
                    });
                    values.channelName = ''
                    modalHide()
                }
                )
                .catch((error) => {
                    setErrorName(true)
                    setErrorMessage(error.errors[0])
                })
        },
    })

    const hideModal = () => {
        formik.values.channelName = ''
        setErrorName(false)
        setErrorMessage('')
        modalHide()
    }


    return (

        <Modal show={show} onHide={hideModal}>
            <Modal.Header closeButton >
                <Modal.Title>{t('modals.modalAdd.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} >
                    <Form.Group className="mb-3" controlId="formAdd" >
                        <Form.Control
                            data-testid="input-body"
                            ref={inputEl}
                            type="text"
                            name="channelName"
                            placeholder=""
                            onChange={formik.handleChange}
                            value={formik.values.channelName}
                            isInvalid={errorName} />
                             <Form.Label className='visually-hidden'>Имя канала</Form.Label>
                        {errorName && (
                            <Form.Control.Feedback type="invalid">
                                {errorMessage}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <div className='d-flex justify-content-end'>
                        <Button variant="secondary" className='me-2' onClick={hideModal}>{t('modals.modalAdd.canselButton')}</Button>
                        <Button type="submit" className='btn-primary'>{t('modals.modalAdd.submitButton')}</Button>
                    </div>

                </Form>
            </Modal.Body>
        </Modal>

    )
}

export default AddNewChannelModal