import { Button, Nav, ButtonGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setcurentChannel } from '../slices/curentChannelSlice.js'

const ChannelButton = ({value, currentChannel}) => {
    const dispatch = useDispatch()

    return (
        <Nav.Item className='w-100'>
            {value.removable ?
                <ButtonGroup className='d-flex dropdown'>
                    <Button className={currentChannel === value.id ? 'w-100 rounded-0 text-start btn-secondary text-truncate' : 'w-100 rounded-0 text-start btn-light text-truncate'}
                        onClick={() => dispatch(setcurentChannel({ id: value.id  }))}>
                        <span className='me-1'>#</span>
                        {value.name}
                    </Button>
                    <Button>+</Button>
                </ButtonGroup>
                :
                <Button className={currentChannel === value.id  ? 'w-100 rounded-0 text-start btn-secondary text-truncate' : 'w-100 rounded-0 text-start btn-light text-truncate'}
                    onClick={() => dispatch(setcurentChannel({ id: value.id  }))}>
                    <span className='me-1'>#</span>
                    {value.name}
                </Button>
            }
        </Nav.Item>
    )
}

export default ChannelButton