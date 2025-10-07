import notF from '../img/404.png'
import { Container, Col, Image } from 'react-bootstrap'

const NotFound = () => {
    return (
<Container fluid>
<Col className='justify-content-center align-content-center h-100'>
<Image src={notF} className='center'/>
              <div className='text-center'>
                <h3>Страница не найдена</h3>
              </div>
              <div className='text-center'>
                <span>Но вы можете перейти </span>
                <a href=''>на главную страницу</a>
              </div>
</Col>
</Container>
    )
}

export default NotFound 