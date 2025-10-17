import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLogin } from '../slices/loginSlice.js'

const ExitButton = () => {
    const dispatch = useDispatch()
    const handleClick = () => {

        localStorage.removeItem('token')
        localStorage.removeItem('username')
        dispatch(setLogin({ token: response.data.token, username: response.data.username }))
        console.log(localStorage)
    }

    return (
        <Button href='/' onClick={() => handleClick()}>Выйти</Button>
    )
}

export default ExitButton