import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const DeleteChannelModal = ({ value, show, modalHide }) => {
  const token = localStorage.getItem('token')
  const { t } = useTranslation()

  // уведомления
  const notifyDelete = () => toast.success(`${t('toast.channels.deleteChannel')}`)

  const handleDeleteChannel = (value) => {
    const id = value.value.id
    axios.delete(`/api/v1/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      modalHide()
      notifyDelete()
    })
  }

  return (
    <Modal show={show} onHide={modalHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.modalDelete.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('modals.modalDelete.body')}</p>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={modalHide}>{t('modals.modalDelete.canselButton')}</Button>
          <Button type="submit" className="btn-danger" onClick={() => handleDeleteChannel(value)}>{t('modals.modalDelete.submitButton')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteChannelModal
