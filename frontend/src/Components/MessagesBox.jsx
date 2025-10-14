import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getNormalized from '../utilities/getNormalizet.js'
import { setMessages, addMessage } from '../slices/messagesSlice.js'
import { Button, Nav } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { io } from 'socket.io-client'

const MessagesBox = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            const responseMessages = await axios.get('/api/v1/messages', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (responseMessages.data) { //[{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]
                const normDataMessages = getNormalized(responseMessages.data)
                dispatch(setMessages({ entities: normDataMessages, ids: Object.keys(normDataMessages) }))
            }
           
            const socket = io();
            socket.on('newMessage', (playload) => {
                dispatch(addMessage(playload))
            });
        }
        fetchData()
    }, [])

    const currentChannelId = useSelector(state => state.curentChannel.id)

    const allMessages = Object.values(useSelector(state => state.messages.entities))
        .filter(message => message.channelId === currentChannelId)

    return (
        <div id='messages-box' className='px-5 overflow-auto'>
            {allMessages.map((message) =>
                <div key={message.id} className="text-break mb-2">
                    <b>{message.username}</b>
                    :
                    {message.body}
                </div>)}
        </div>
    )
}

export default MessagesBox