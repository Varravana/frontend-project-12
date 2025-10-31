import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setMessages, addMessage } from '../slices/messagesSlice.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { fetchData } from '../utilities/fetchData.jsx'

const MessagesBox = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { t } = useTranslation()
  const notify = () => toast(`${t('toast.errors.loadMessagesError')}`)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchData(dispatch, token, notify, setMessages, addMessage )
  }, [])

  const currentChannelId = useSelector(state => state.curentChannel.id)

  const allMessages = Object.values(useSelector(state => state.messages.entities))
    .filter(message => message.channelId === currentChannelId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages])

  return (
    <div id="messages-box" className="px-5 overflow-auto">
      {allMessages.map(message => (
        <div key={message.id} className="text-break mb-2">
          <b>
            {message.username}
          </b>
          {': '}
          {message.body}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessagesBox
