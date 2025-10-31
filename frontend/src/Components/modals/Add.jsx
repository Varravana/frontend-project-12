import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { setcurentChannel } from '../../slices/curentChannelSlice.js'
import { makeSchema } from '../../utilities/channelNameValidation.jsx'

const AddNewChannelModal = ({ show, modalHide }) => {
  const inputEl = useRef(null)
  const token = localStorage.getItem('token')
  const allChannels = useSelector(state => state.channels.entities)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  // автофокус
  useEffect(() => {
    if (show && inputEl.current) {
      inputEl.current.focus()
    }
  }, [show])

  // валидация формы
  const schema = makeSchema(t, allChannels)
  // уведомления
  const notifyAdd = () => toast.success(`${t('toast.channels.makeChannel')}`)

  // форма начальное значение и отправка на сервер
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const newChannel = { name: filter.clean(values.channelName) }
        const response = await axios.post('/api/v1/channels', newChannel, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        notifyAdd()
        dispatch(setcurentChannel({ id: response.data.id }))
        values.channelName = ''
        modalHide()
      }
      catch (error) {
        console.log(error)
      }
    },
  })

  const hideModal = () => {
    formik.values.channelName = ''
    modalHide()
  }

  return (

    <Modal show={show} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.modalAdd.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="formAdd">
            <Form.Control
              data-testid="input-body"
              ref={inputEl}
              type="text"
              name="channelName"
              placeholder=""
              onChange={formik.handleChange}
              value={formik.values.channelName}
              isInvalid={formik.touched.channelName && !!formik.errors.channelName}
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            {formik.touched.channelName && !!formik.errors.channelName && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.channelName}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={hideModal}>{t('modals.modalAdd.canselButton')}</Button>
            <Button type="submit" className="btn-primary">{t('modals.modalAdd.submitButton')}</Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>

  )
}

export default AddNewChannelModal
