import notF from '../img/404.png'
import { Container, Col, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useTranslation } from 'react-i18next'

const NotFound = () => {
  const { t, i18n } = useTranslation()
    return (
<Container fluid>
<Col className='justify-content-center align-content-center h-100'>
<Image src={notF} className='center'/>
              <div className='text-center'>
                <h3>{t('notFoundPage.h3')}</h3>
              </div>
              <div className='text-center'>
                <span>{t('notFoundPage.span')}</span>
                <a href='/'>{t('notFoundPage.href')}</a>
              </div>
</Col>
</Container>
    )
}

export default NotFound 