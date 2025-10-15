import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import _ from 'lodash'

const DeleteChannelModal = ({ value, show, modalHide }) => {
const token = localStorage.getItem('token')

    const handleDeleteChannel = (value) => {
        const id = value.value.id
        axios.delete(`/api/v1/channels/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.data);
        })
        modalHide()
    }


    return (
        <Modal show={show} onHide={modalHide}>
            <Modal.Header closeButton >
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Уверены?</p>

                <div className='d-flex justify-content-end'>
                    <Button variant="secondary" className='me-2' onClick={modalHide}>Отменить</Button>
                    <Button type="submit" className='btn-danger' onClick={() => handleDeleteChannel(value)}>Удалить</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteChannelModal