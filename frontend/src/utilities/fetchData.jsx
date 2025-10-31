import axios from 'axios'
import getNormalized from './getNormalizet.js'
import { io } from 'socket.io-client'

const fetchData = async (dispatch, token, notify, setMessages, addMessage) => {
  await axios.get('/api/v1/messages', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    const normDataMessages = getNormalized(response.data)
    dispatch(setMessages({ entities: normDataMessages, ids: Object.keys(normDataMessages) }))
  }).catch((error) => {
    console.log(error)
    notify()
  })

  const socket = io()
  socket.on('newMessage', (playload) => {
    dispatch(addMessage(playload))
  })
}

export { fetchData }
