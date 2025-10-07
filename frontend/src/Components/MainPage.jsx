import { Button, Form, Container, Row, Col, Image, Card, FloatingLabel } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'

const MainPage = () => {

    const [curentChanal, setCurentChanal] = useState('111')
    const clearLS = () => {
        localStorage.clear()
    }
    return (
        <>
            <Container className='rounded shadow'>
                <Row className='bg-white'>
                    <Col className='bg-light'>
                        <div>
                            <b>Каналы</b>
                            <Button className='primary'>+</Button>
                        </div>
                        <ul id='chanals-box'>
                            <li>
                                <Button>первый канал</Button>
                            </li>
                            <li>
                                <Button onClick={() => clearLS()}>очистить локалсторадж</Button>
                            </li>
                        </ul>
                    </Col>
                    <Col>
                        <div className='bg-ligth'>
                            <span className='text-bold'>{curentChanal} </span>
                            <span>0 сообщений </span>
                        </div>
                        <div id='messages-box' className='px-5'></div>
                        <div id='input-message' className='px-5 py-3 mt-auto'></div>

                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MainPage