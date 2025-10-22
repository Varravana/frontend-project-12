import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setLogin } from '../slices/loginSlice.js'
import { useTranslation } from 'react-i18next'

const ExitButton = () => {
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation()

    const handleClick = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        dispatch(setLogin({ token: response.data.token, username: response.data.username }))
        console.log(localStorage)
    }

    return (
        <Button href='/' onClick={() => handleClick()}>{t('exitButton.exit')}</Button>
    )
}

export default ExitButton