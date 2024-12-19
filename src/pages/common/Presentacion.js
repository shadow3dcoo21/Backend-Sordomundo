import React, { useState, useEffect, useContext } from 'react';
import { BASE_URL_GENERAL , USER_PRESENTACION_URL} from '../../services/apiJWTServices';
import { faFilm, faVideo, faPlayCircle, faTimes,faTextSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { NameContext } from './NameContext';

import './styles/Presentacion.css';



const Presentacion = () => {
  const [presentaciones, setPresentaciones] = useState([]);
  const [selectedPresentacion, setSelectedPresentacion] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(faTextSlash);
  const [error, setError] = useState(null);  // State to manage errors
  const [loading, setLoading] = useState(true);  // State to manage loading state
  //const { name } = useContext(NameContext);

  const [nombres, setNombres] = useState([]);
  
  //const { user } = useContext(NameContext); // Accedemos a los datos del usuario



  useEffect(() => {
    const fetchPresentaciones = async () => {
      const token = localStorage.getItem('authToken');  // Obtener el token desde el almacenamiento local

      if (!token) {
        setError('No se encontró el token');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(USER_PRESENTACION_URL, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Incluir el token en el encabezado
            'Content-Type': 'application/json',  // Ensure proper content type is set
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setPresentaciones(data);

          // Extraer solo los nombres de las presentaciones
          const nombresTemp = data.map(presentacion => presentacion.nombre);
          setNombres(nombresTemp);

          if (data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            setSelectedPresentacion(data[randomIndex]);  // Seleccionar una presentación aleatoria por defecto
          }
        } else {
          setError('La respuesta de la API no es un array');
        }
      } catch (err) {
        setError(err.message);  // Manejar errores
      } finally {
        setLoading(false);  // Cambiar el estado de carga a falso
      }
    };

    fetchPresentaciones();
  }, []); // El efecto se ejecuta solo una vez cuando el componente se monta



  const handleSelectChange = (event) => {
    const selectedNombre = event.target.value;
    const presentacion = presentaciones.find(p => p.nombre === selectedNombre);
    setSelectedPresentacion(presentacion);
    setSelectedVideoIndex(0); // Reset video index when a new presentation is selected
  };

  const handleRandomChange = () => {
    if (presentaciones.length > 0) {
      const randomIndex = Math.floor(Math.random() * presentaciones.length);
      setSelectedPresentacion(presentaciones[randomIndex]);
      setSelectedVideoIndex(0); // Reset video index when a new presentation is selected
    }
  };
  /* 
  const [selectedPresentacionIndex, setSelectedPresentacionIndex] = useState(0);
  const handleRandomChange = () => {
    if (presentaciones.length > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * presentaciones.length);
      } while (randomIndex === selectedPresentacionIndex);
  
      setSelectedPresentacion(presentaciones[randomIndex]);
      setSelectedVideoIndex(0);
      setSelectedPresentacionIndex(randomIndex); // Almacena el índice seleccionado
    }
  };
  */
  const botonver = () => {
    setIsTitleVisible(!isTitleVisible);
    setButtonIcon(isTitleVisible ? faTimes : faTextSlash);
  };

  const handleButtonClick = (index) => {
    setSelectedVideoIndex(index);
  };




 

  return (
    <div className='cuerpo_general' >



      
      {/*
      <div>
        <div>
          <h2>Bienvenido, {name}</h2>
        </div>
      </div>
      */}
      <div className='cuerpo_general_interno'>
        <div className='cuerpomediointernogen'>
          {/* <button onClick={handleRandomChange}>Cambiar Palabra Aleatoriamente</button> 
         <div className='palabra-es'>
            <div className='texto_sele'>
              <p>Cambiar Palabra :</p>
            </div>
            <div className='seleccionador'>
              <select onChange={handleSelectChange}>
                {presentaciones.map((presentacion, index) => (
                  <option key={index} value={presentacion.nombre}>
                    {presentacion.nombre}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleRandomChange}>Cambiar Palabra Aleatoriamente</button>
          </div>*/}

          {selectedPresentacion ? (
            <div className='padre__'>
              <div className='iconoizqui'>
                <div className='imas'>
                  <div className='contenedorteclado'>
                    <button className='botonverm_presentar'>
                      <img className='logotecadoi_presentar' src="/assets/teclado.svg"/>
                    </button>
                  </div>
                  <div className='boton_ver'>
                    <button className='botonverm_presentar' onClick={botonver}>
                      <FontAwesomeIcon className='logotecadoi_presentar' icon={buttonIcon} size="3x" />
                    </button>
                  </div>

                  <div className='boton_ver'>
                    <button className='botonverm_presentar' onClick={handleRandomChange}>
                    
                    <img className='logotecadoi_presentar' src="/assets/cambiarTexto.svg"/>
                    </button>
                  </div>
                  
                </div>
              </div>

              <div className='contenedor_images_presentar'>
                <div className='images_con'>
                 
                  <div className='imagen__'>
                    
                    <img className='imagen_servid' src={`${selectedPresentacion.imagen}`} alt={selectedPresentacion.nombre} />
                  </div>
                  <div className='titulo_images'>
                    <div className='espacioyasabes'>
                      {isTitleVisible && (
                        <h2 className='titulo_imagen_nom'>{selectedPresentacion.nombre}</h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='contendor_generalvideo_presentar'>
                <div className='contendor_hijo_video_presentar'>
                  <div className='button-container_presentar'>
                  {selectedPresentacion.titulos.map((titulo, index) => (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={`video-button_presentar ${selectedVideoIndex === index ? 'active' : ''}`}
                    >
                      {index === 0 && (
                        <svg className={`iconovideo_presentar ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_4_20)">
                          <path d="M6.5 6.75C8.51855 6.75 10.1562 5.23828 10.1562 3.375C10.1562 1.51172 8.51855 0 6.5 0C4.48145 0 2.84375 1.51172 2.84375 3.375C2.84375 5.23828 4.48145 6.75 6.5 6.75ZM9.75 7.5H8.35098C7.7873 7.73906 7.16016 7.875 6.5 7.875C5.83984 7.875 5.21523 7.73906 4.64902 7.5H3.25C1.45488 7.5 0 8.84297 0 10.5V10.875C0 11.4961 0.545898 12 1.21875 12H11.7812C12.4541 12 13 11.4961 13 10.875V10.5C13 8.84297 11.5451 7.5 9.75 7.5Z"/>
                        </g>
                        <defs>
                          <clipPath id="clip0_4_20">
                            <rect width="13" height="12" fill="white"/>
                          </clipPath>
                        </defs>
                      </svg>
                      )}
                      {index === 1 && (
                        <svg className={`iconovideo_presentar ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.862 3.00017C11.2112 2.99011 10.6786 3.43032 10.6786 3.95602V6H10.4465V1.87008C10.4465 1.34438 9.9138 0.904176 9.26307 0.914231C8.63248 0.923981 8.12502 1.3399 8.12502 1.85157V6H7.89288V0.95602C7.89288 0.430317 7.36022 -0.00988577 6.7095 0.000168909C6.07891 0.00991891 5.57144 0.425841 5.57144 0.937505V6H5.3393V1.89352C5.3393 1.36782 4.80664 0.927614 4.15592 0.937669C3.52533 0.947419 3.01786 1.36334 3.01786 1.875V7.40607L2.09951 6.38609C1.72248 5.96735 0.996563 5.87475 0.478071 6.1793C-0.0403339 6.48385 -0.154955 7.07016 0.222075 7.48892L3.86675 11.5367C3.99597 11.6802 4.16538 11.797 4.36116 11.8775C4.55693 11.958 4.77351 12 4.9932 12H10.7269C11.3732 12 11.9346 11.6408 12.0827 11.1327L12.8519 8.49221C12.9503 8.15441 13 7.80856 13 7.46154V3.9375C13 3.42584 12.4926 3.00992 11.862 3.00017Z" />
                      </svg>
                      )}
                      {index === 2 && (
                        <svg className={`iconovideo_presentar ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8333 10.2857V10.7143C10.8333 11.4244 10.3483 12 9.75 12H1.08333C0.485017 12 0 11.4244 0 10.7143V3.85714C0 3.14705 0.485017 2.57143 1.08333 2.57143H1.44444V8.14286C1.44444 9.32443 2.25442 10.2857 3.25 10.2857H10.8333ZM13 8.14286V1.28571C13 0.575625 12.515 0 11.9167 0H3.25C2.65168 0 2.16667 0.575625 2.16667 1.28571V8.14286C2.16667 8.85295 2.65168 9.42857 3.25 9.42857H11.9167C12.515 9.42857 13 8.85295 13 8.14286ZM5.77778 2.57143C5.77778 3.28152 5.29276 3.85714 4.69444 3.85714C4.09613 3.85714 3.61111 3.28152 3.61111 2.57143C3.61111 1.86134 4.09613 1.28571 4.69444 1.28571C5.29276 1.28571 5.77778 1.86134 5.77778 2.57143ZM3.61111 6.42857L4.86405 4.94156C4.96981 4.81604 5.1413 4.81604 5.24708 4.94156L6.13889 6L9.19739 2.37013C9.30315 2.24462 9.47463 2.24462 9.58041 2.37013L11.5556 4.71429V7.71429H3.61111V6.42857Z"/>
                      </svg>
                      )}
                    </button>
                  ))}


                  </div>
                  <div className='video-container'>
                  <div className='video_con'>
                   
                    
                    <img 
                      className='custom-video' 
                      key={`${selectedPresentacion.nombre}-${selectedVideoIndex}`} 
                      src={`${selectedPresentacion.titulos[selectedVideoIndex].video}`} 
                      
                      alt={selectedPresentacion.titulos[selectedVideoIndex].titulo} 
                    />
                  </div>
                  </div>
                </div>
              </div>
              
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Presentacion;
