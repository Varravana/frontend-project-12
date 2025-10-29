import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import add from '../img/add.png'
import AddNewChannelModal from './modals/Add.jsx'

const AddNewChannelButton = () => {
  const [modalShow, setModalShow] = useState(false)

  const handleAddClose = () => {
    setModalShow(false)
  }
  const handleAddShow = () => {
    setModalShow(true)
  }

  return (
    <>
      <Button
        className="text-primary btn-light position-relative p-0 m-0"
        style={{
          width: '20px', height: '20px', display: 'block',
          overflow: 'hidden',
        }}
        onClick={() => handleAddShow()}
      >
        <img
          src={add}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            margin: 0,
            padding: 0,
          }}
        >
        </img>

        <span
          className="position-absolute top-50 start-50 translate-middle"
          style={{
            color: 'rgba(0, 0, 0, 0)',
            fontSize: '18px',
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}
        >
          +
        </span>
      </Button>
      <AddNewChannelModal show={modalShow} modalHide={() => handleAddClose()} />
    </>
  )
}

export { AddNewChannelButton }
