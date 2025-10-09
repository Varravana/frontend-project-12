import { Button, Nav, Form, Container, Row, Col, InputGroup, Image, Card, FloatingLabel } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getNormalized from '../utilities/getNormalizet.js'
import { setChannels } from '../slices/channelsSlice.js'
import { setMessages } from '../slices/messagesSlice.js'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


const MainPage = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            const responseChannels = await axios.get('/api/v1/channels', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const responseMessages = await axios.get('/api/v1/messages', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (responseMessages.data) {
                const normDataMessages = getNormalized(responseMessages.data)
                dispatch(setMessages({ entities: normDataMessages, ids: Object.keys(normDataMessages) }))
            }

            if (responseChannels.data) {
                const normDataChannels = getNormalized(responseChannels.data)
                dispatch(setChannels({ entities: normDataChannels, ids: Object.keys(normDataChannels) }))
            }

        }
        fetchData()
    })

    const getchannelsNames = () => {
        const channelsEntities = useSelector(state => state.channels.entities)
        const result = []
        for (let key in channelsEntities) {
            result.push(channelsEntities[key].name)
        }
        return result
    }
    const channelsNames = getchannelsNames()


    console.log(channelsNames)
    const clearLS = () => {
        localStorage.clear()
    }
    return (

 <Container className='rounded shadow my-4 overflow-hidden h-100' style={{ height: '100vh' }}>
            <Row className='bg-white h-100 d-flex flex-md-row'>
                <div className='d-flex flex-column bg-light col-4 col-md-2 border-end px-0 h-100 '>
                    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                        <b>Каналы</b>
                        <Button className='primary p-0 '>+</Button>
                    </div>
                    <Nav id='chanals-box' variant="pills" className="flex-column fill px-2 mb-3 h-100 overflow-auto d-block">
                        {channelsNames.map((channel) =>
                            <Nav.Item className='w-100'>
                                <Button className='w-100 rounded-0 text-start'>
                                    <span className='me-1'>#</span>
                                    {channel}</Button>
                            </Nav.Item>
                        )}

                        <li>
                            <Button onClick={() => clearLS()}>очистить локалсторадж</Button>
                        </li>
                    </Nav>
                </div>
                <div className='col p-0 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <div className='bg-ligth mb-4 p-3 shadow-sm small'>
                            <p className='m-0'>
                                <b># 111</b>
                            </p>
                            <span className='text-muted'>0 сообщений </span>
                        </div>
                        <div id='messages-box' className='px-5 overflow-auto'></div>
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