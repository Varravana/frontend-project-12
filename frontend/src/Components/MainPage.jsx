import { Button, Nav, Form, Container, Row, Col, InputGroup, Image, Card, FloatingLabel } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChannelsBox from './ChannelsBox.jsx'
import MessagesBox from './MessagesBox.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'


const MainPage = () => {

    return (

 <Container className='rounded shadow my-4 overflow-hidden h-100' style={{ height: '100vh' }}>
            <Row className='bg-white h-100 d-flex flex-md-row'>
                <div className='d-flex flex-column bg-light col-4 col-md-2 border-end px-0 h-100 '>
                    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                        <b>Каналы</b>
                        <Button className='primary p-0 '>+</Button>
                    </div>
                    <ChannelsBox/>
                </div>
                <div className='col p-0 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <div className='bg-ligth mb-4 p-3 shadow-sm small'>
                            <p className='m-0'>
                                <b># 111</b>
                            </p>
                            <span className='text-muted'>0 сообщений </span>
                        </div>
                        <MessagesBox/>
                        <div id='input-message' className='px-5 py-3 mt-auto'>
                            <Form noValidate className='py-1 border rounded-2'>
                                <Form.Group>
                                    <InputGroup hasValidation>
                                        <Form.Control className='border-0 p-0 ps-2' name='body' type="email" placeholder="Введите сообщение..." />
                                        <Button variant="outline-secondary" type="submit">→</Button>
                                        </InputGroup>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>

    )
}

export default MainPage