import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ChannelsBox from './ChannelsBox.jsx'
import MessagesBox from './MessagesBox.jsx'
import InputMessage from './InputMessageForm.jsx'
import { AddNewChannelButton } from './addNewChannelButton.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'

const MainPage = () => {
    const { t, i18n } = useTranslation()
    const currentChannelId = useSelector(state => state.curentChannel.id)
    const currentChannel = useSelector(state => state.channels.entities[currentChannelId])
    const allMessages = Object.values(useSelector(state => state.messages.entities))
        .filter(message => message.channelId === currentChannelId)
    const messCount = allMessages.length
    return (

        <Container className='rounded shadow my-4 overflow-hidden h-100' style={{ height: '100vh' }}>
            <Row className='bg-white h-100 d-flex flex-md-row'>
                <div className='d-flex flex-column bg-light col-4 col-md-2 border-end px-0 h-100 '>
                    <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                        <b>{t('mainPage.channelsHead')}</b>
                        <AddNewChannelButton />
                    </div>
                    <ChannelsBox />
                </div>
                <div className='col p-0 h-100'>
                    <div className='d-flex flex-column h-100'>
                        <div className='bg-ligth mb-4 p-3 shadow-sm small'>
                            <p className='m-0'>
                                <b># {currentChannel.name}</b>
                            </p>
                            <span className='text-muted'>{t('mainPage.messageCount.key', { count:messCount })}</span>
                        </div>
                        <MessagesBox />
                        <div id='input-message' className='px-5 py-3 mt-auto'>
                            <InputMessage />
                        </div>
                    </div>
                </div>
            </Row>
        </Container>

    )
}

export default MainPage