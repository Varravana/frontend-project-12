import { Button, Form, Container, Row, Col, Image, Card, FloatingLabel } from 'react-bootstrap'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getNormalizedChanals from '../utilities/getNormalizet.js'
import { actions as channelsActions } from '../slices/channelsSlice.js'


const MainPage = () => {

    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/v1/channels', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const normData = getNormalizedChanals(data)
            dispatch(channelsActions.setChanals({ entities: normData, ids: Object.keys(normData) }))

        }
        fetchData()
    })
    const channelsList = () => {
        const channelsEntities = useSelector(state => state.channels.entities)
        const result = []
    for (key in channelsEntities) {
result.push(channelsEntities[key].name)
    }
    return result
    }

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
                            {channelsList.map((channel) =>
                                <li>
                                    <Button >{channel}</Button>
                                </li>
                            )}

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