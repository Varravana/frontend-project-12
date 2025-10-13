import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getNormalized from '../utilities/getNormalizet.js'
import { setChannels } from '../slices/channelsSlice.js'
import { setcurentChannel } from '../slices/curentChannelSlice.js'
import { Button, Nav } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


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
            }). catch ((error) => {
                console.log('ошибка загрузки каналов', error)
            })

        }
        fetchData()

    },[])

    const channelsEntities = useSelector(state => state.channels.entities)
    const currentChannel = useSelector(state => state.curentChannel.id)


    return (
        <Nav id='chanals-box' variant="pills" className="flex-column fill px-2 mb-3 h-100 overflow-auto d-block">

            {Object.entries(channelsEntities).map(([key, value]) =>
                <Nav.Item className='w-100'>
                    <Button className={currentChannel === key ? 'w-100 rounded-0 text-start btn-secondary' : 'w-100 rounded-0 text-start btn-light'}
                        onClick={() => dispatch(setcurentChannel({ id: key }))}
                    >
                        <span className='me-1'>#</span>
                        {value.name}</Button>
                </Nav.Item>
            )}

        </Nav>
    )
}
export default ChannelsBox 