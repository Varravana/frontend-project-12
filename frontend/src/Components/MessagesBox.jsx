import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getNormalized from '../utilities/getNormalizet.js'
import { setMessages } from '../slices/messagesSlice.js'
import { Button, Nav } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

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

            if (responseMessages.data) {
                const normDataMessages = getNormalized(responseMessages.data)
                dispatch(setMessages({ entities: normDataMessages, ids: Object.keys(normDataMessages) }))
            }
        }
        fetchData()
    })

    return (
<div id='messages-box' className='px-5 overflow-auto'>mmess</div>
    )
}

export default MessagesBox