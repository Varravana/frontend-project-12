import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ExitButton = () => {
    const handleClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        console.log(localStorage)
    }

    return (
        <Button onClick={()=> handleClick()}>Выйти</Button>
    )
}

export default ExitButton