import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getNormalized from '../utilities/getNormalizet.js'
import { setChannels, addChannel } from '../slices/channelsSlice.js'
import { Button, Nav } from 'react-bootstrap'
import axios from 'axios'
import ChannelButton from './ChannelsButtons.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { io } from 'socket.io-client'


const ChannelsBox = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')


    useEffect(() => {

        const fetchData = async () => {
            await axios.get('/api/v1/channels', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((responze) => {
                const normDataChannels = getNormalized(responze.data)
                dispatch(setChannels({ entities: normDataChannels, ids: Object.keys(normDataChannels) }))
            }).catch((error) => {
                console.log('ошибка загрузки каналов', error)
            })

            const socket = io()
            socket.on('newChannel', (playload) => {
                dispatch(addChannel(playload))
            })
        }
        fetchData()

    }, [])

    const channelsEntities = useSelector(state => state.channels.entities)
    const currentChannel = useSelector(state => state.curentChannel.id)

    return (
        <Nav id='chanals-box' variant="pills" className="flex-column fill px-2 mb-3 h-100 overflow-auto d-block">

            {Object.values(channelsEntities).map((value) =>
                <ChannelButton value={value} currentChannel={currentChannel}/>
            )}

        </Nav>
    )
}
export default ChannelsBox 