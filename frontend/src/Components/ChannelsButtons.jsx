import { Button, Nav, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setcurentChannel } from '../slices/curentChannelSlice.js'
import DeleteChannelModal from './modals/Delete.jsx'
import RenameChannelModal from './modals/Rename.jsx'
import { useImmer } from 'use-immer'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ChannelButton = ({ value, currentChannel }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [curentModal, setCurModal] = useImmer({
    remove: false,
    rename: false,
  })

  const [channelToChange, setChannelToChange] = useState()

  const handleRemoveShow = (value) => {
    setChannelToChange(value)
    setCurModal((draft) => {
      draft.remove = true
    })
  }
  const handleRemoveClose = () => {
    setCurModal((draft) => {
      draft.remove = false
    })
  }
  const handleRenameShow = (value) => {
    setChannelToChange(value)
    setCurModal((draft) => {
      draft.rename = true
    })
  }
  const handleRenameClose = () => {
    setCurModal((draft) => {
      draft.rename = false
    })
  }

  return (
    <>
      <Nav.Item className="w-100">
        {value.removable
          ? (
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  className={currentChannel === value.id ? 'w-100 rounded-0 text-start btn-secondary text-truncate' : 'w-100 rounded-0 text-start btn-light text-truncate'}
                  onClick={() => dispatch(setcurentChannel({ id: value.id }))}
                >
                  <span className="me-1">#</span>
                  {value.name}
                </Button>
                <Dropdown.Toggle
                  split
                  className={currentChannel === value.id ? 'btn-secondary' : 'btn-light'}
                  id="dropdown-split-basic"
                >
                  <span
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{
                      color: 'rgba(0, 0, 0, 0)',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      pointerEvents: 'none',
                    }}
              >
                  Управление каналом
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleRemoveShow({ value })}>{t('channelsButtons.delete')}</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRenameShow({ value })}>{t('channelsButtons.rename')}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ):(
              <Button
                className={currentChannel === value.id ? 'w-100 rounded-0 text-start btn-secondary text-truncate' : 'w-100 rounded-0 text-start btn-light text-truncate'}
                onClick={() => dispatch(setcurentChannel({ id: value.id }))}
              >
                <span className="me-1">#</span>
                {value.name}
              </Button>)}
      </Nav.Item>
      <DeleteChannelModal value={channelToChange} show={curentModal.remove} modalHide={() => handleRemoveClose()} />
      <RenameChannelModal value={channelToChange} show={curentModal.rename} modalHide={() => handleRenameClose()} />
    </>
  )
}

export default ChannelButton
