import { Modal, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { makeSchema } from '../../utilities/channelNameValidation.jsx'

const RenameChannelModal = ({ value, show, modalHide }) => {
  const inputEl = useRef(null)
  const token = localStorage.getItem('token')
  const allChannels = useSelector(state => state.channels.entities)
  const { t } = useTranslation()

  // уведомления
  const notifyRename = () => toast.success(`${t('toast.channels.renameChannel')}`)

  useEffect(() => {
    if (value) {
      formik.setFieldValue('channelName', value.value.name)
    }
  }, [value])
  // автофокус

  useEffect(() => {
    if (show && inputEl.current) {
      inputEl.current.focus()
    }
  }, [show])

  // валидация формы
  const schema = makeSchema(t, allChannels)

  // форма начальное значение и отправка на сервер
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const editedChannel = { name: filter.clean(values.channelName) }
        const channelId = value.value.id
        await axios.patch(
          `/api/v1/channels/${channelId}`,
          editedChannel,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        formik.resetForm()
        notifyRename()
        modalHide()
      }
      catch (error) {
        console.log(error)
      }
    },
  })

  const hideModal = () => {
    formik.resetForm()
    modalHide()
  }

  return (
    <Modal show={show} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.modalRename.title')}</Modal.Title>
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
            {formik.touched.channelName && formik.errors.channelName && (
              <Form.Control.Feedback type="invalid">
                {formik.errors.channelName}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={hideModal}>{t('modals.modalRename.canselButton')}</Button>
            <Button type="submit" className="btn-primary">{t('modals.modalRename.submitButton')}</Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal
