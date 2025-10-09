import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getNormalized from '../utilities/getNormalizet.js'
import { setChannels } from '../slices/channelsSlice.js'
import { Button, Nav } from 'react-bootstrap'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'


const ChannelsBox = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.login.token)

    useEffect(() => {
        const fetchData = async () => {
            const responseChannels = await axios.get('/api/v1/channels', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

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

    console.log(1)

    return (
        <Nav id='chanals-box' variant="pills" className="flex-column fill px-2 mb-3 h-100 overflow-auto d-block">
            {channelsNames.map((channel) =>
                <Nav.Item className='w-100'>
                    <Button className='w-100 rounded-0 text-start'>
                        <span className='me-1'>#</span>
                        {channel}</Button>
                </Nav.Item>
            )}
        </Nav>
    )
}
export default ChannelsBox 