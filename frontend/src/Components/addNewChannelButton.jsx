import { Button, Modal, FormGroup, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { useState } from 'react'
import add from '../img/add.png'
import AddNewChannelModal  from './modals/Add.jsx'


const AddNewChannelButton = () => {
  const [modalShow, setModalShow] = useState (false)


  const handleAddClose = () => {
    setModalShow(false)
  }
    const handleAddShow = () => {
    setModalShow(true)
  }

    return (
        <>
        <Button className='text-primary p-0 btn-light' onClick={() => handleAddShow()}>
            <img src={add}></img>
        </Button>
        <AddNewChannelModal show={modalShow} modalHide={() => handleAddClose()} />
        </>
    )
}

export { AddNewChannelButton}