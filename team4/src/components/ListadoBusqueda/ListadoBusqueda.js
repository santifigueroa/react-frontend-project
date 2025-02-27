import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ListadoBusqueda.css'
import nf from '../../img/no_movie.png'
import VideoDescriptionPage from '../../pages/videoDescriptionPage/VideoDescriptionPage';

const BASE_IMG = process.env.REACT_APP_BASE_URL_IMG;

let titleID;
// Indicando genero
const movies = "movies";
const series = "series"; 

export default function ListadoBusqueda(props){
    const {resultados} = props;
    const [show, setShow] = useState(false);
    const [type, setType] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const showDescription = (id, type) => {        
        handleShow()
        type === "movie" ? setType(movies) : setType(series);
        titleID = id;
    } 
        
    const titulos = resultados.arreglo.map((resultado, index) => {
        console.log(resultado);
        return(
            <Col key={index}>
                <Card className="card-size" onClick={() => showDescription(resultado.id, resultado.media_type)}>
                    <Card.Img 
                        className="card-img-size" 
                        variant="top" 
                        src={resultado.poster_path? BASE_IMG + resultado.poster_path : nf} 
                        alt="Poster pelicula"
                    />
                    <Card.Body className='card-description'>
                        <Card.Title>
                            {resultado.media_type === "movie" ? resultado.title : `${resultado.original_name} (Series)`}
                        </Card.Title>
                        <Card.Text>
                            <span>Fecha de Estreno: </span>
                            <span>{ resultado.media_type === "movie" ? resultado.release_date : resultado.first_air_date }</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

        )
    })
    return(
        <div className="Lista">
            
            {   resultados.busqueda && 
            <Row xs={2} md={4} lg={6}  className="g-4 m-2 my-5">
                {titulos}
                <VideoDescriptionPage 
                    movieId={titleID} 
                    show={show} 
                    handleClose={handleClose}
                    type={type}
                >
                </VideoDescriptionPage>
            </Row>
            }
        </div>
    );
}