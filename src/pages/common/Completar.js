import React, { useState, useEffect, useRef,useContext } from 'react';
import { BASE_URL_GENERAL , USER_COMPLETAR_URL,USER_COMPLETAR_REGISTRAR_URL,USER_COMPLETAR_SECTION_URL} from '../../services/apiJWTServices';
import './styles/Completar.css';
import axios from 'axios';
import { faFilm, faVideo, faPlayCircle, faTimes, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faReact,
} from '@fortawesome/free-brands-svg-icons';


import { faRotateRight } from '@fortawesome/free-solid-svg-icons'; // Cambiar aquí
const Completar = () => {
  const [presentaciones, setPresentaciones] = useState([]);
  const [selectedPresentacion, setSelectedPresentacion] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(2);
  const [selectcompletar, setselectcompletar] = useState(0);
  const [completarinfo, setcompletarinfo] = useState('');
  const [completarinfo2, setcompletarinfo2] = useState('');
  const [completarinfo3, setcompletarinfo3] = useState('');

  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [buttonIcon, setButtonIcon] = useState(faWindowMinimize);

  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [showCompletado, setShowCompletado] = useState(false);
  const [inputStage, setInputStage] = useState(0); 
  const [attempts, setAttempts] = useState(50); 
  const [successfulAttempts, setSuccessfulAttempts] = useState(0); 
  const [failedAttempts, setFailedAttempts] = useState(0); 
  const [finalResults, setFinalResults] = useState(null); 
  const inputRef = useRef(null);
  const [original,setorginal]=useState('');
///
const [image, setImage] = useState(null);
const [letrateclado,setletrateclado]= useState([]);
const [fechaHora, setFechaHora] = useState('');

const [idusuario, setIdusuario] = useState('');
const [stipocompletar, setstipocompletar] = useState(0);
const [identificadorcomplet, setidentificadorcomplet] = useState('');
//imagen
const [resulimage, setresulimage] = useState(null); 

const [error, setError] = useState(null);  // State to manage errors
const [loading, setLoading] = useState(true);  // State to manage loading state



  const completarinfo3Array = Array.isArray(completarinfo3)
    ? [...completarinfo3].reverse()
    : completarinfo3.split('').reverse();


    useEffect(() => {
      // Función para obtener datos y manejar el token
      const fetchPresentaciones = async () => {
          const token = localStorage.getItem('authToken');  // Obtener el token desde el almacenamiento local
  
          if (!token) {
              setError('No se encontró el token');
              setLoading(false);
              return;
          }
  
          try {
              // Decodifica el token y extrae el `_id`
              const decodedToken = JSON.parse(atob(token.split('.')[1]));
              setIdusuario(decodedToken._id); // Guarda el _id en el estado
          } catch (error) {
              console.error('Error al decodificar el token:', error);
              setError('Token no válido');
              setLoading(false);
              return;
          }
  
          try {
              const response = await fetch(USER_COMPLETAR_URL, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,  // Incluir el token en el encabezado
                      'Content-Type': 'application/json',  // Tipo de contenido
                  },
              });
  
              if (!response.ok) {
                  throw new Error(`Error al obtener los datos: ${response.status}`);
              }
  
              const data = await response.json();
  
              if (Array.isArray(data)) {
                  setPresentaciones(data);
                  if (data.length > 0) {
                      setSelectedPresentacion(data[0]);
                  }
              } else {
                  console.error('La respuesta de la API no es un array:', data);
              }
          } catch (err) {
              setError(err.message);  // Manejar errores
          } finally {
              setLoading(false);  // Cambiar el estado de carga a falso
          }
      };
  
      // Llamar a la función fetchPresentaciones
      fetchPresentaciones();
  
      // Función que maneja el evento de tecla presionada
      const handleKeyPress = (event) => {
          const newLetter = event.key;
          setletrateclado((prevLetras) => [...prevLetras, newLetter]);
          actualizarFechaHora();
      };
  
      // Agregar el listener del evento de teclas
      window.addEventListener('keydown', handleKeyPress);
  
      // Limpiar el listener cuando el componente se desmonte
      return () => {
          window.removeEventListener('keydown', handleKeyPress);
      };
  }, []); // El efecto se ejecuta solo una vez cuando el componente se monta
  


    // Función que obtiene la fecha y hora actuales
    const actualizarFechaHora = () => {
      const now = new Date();
      const dia = now.toLocaleDateString(); // Fecha en formato local
      const hora = now.toLocaleTimeString(); // Hora en formato local
      setFechaHora(`${dia} ${hora}`);
    };


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [completarinfo3]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    
    setInput(value); 
    if (attempts <= 1) {
      let asu = 0;
      setAttempts(asu);
      setMessage('Has alcanzado el límite de intentos.');
      return;
    }

    if (completarinfo3Array.length > 0) {

      const completinfomayus = completarinfo.toUpperCase();
      const mostrarresultado = completinfomayus.split('');
      const mostrarletraeliminada = completarinfo3Array.map(item => item.toUpperCase());;
      console.log(mostrarresultado);
      console.log(mostrarletraeliminada);
      for (let i = 0; i < mostrarletraeliminada.length; i++) {
        let vari = mostrarletraeliminada[i];
        console.log(vari)
        if (value.toUpperCase() === vari) {
          for (let a = 0; a < mostrarresultado.length; a++) {
            if (mostrarresultado[a] === '_') {
              mostrarresultado[a] = vari;;
              console.log("una peq",mostrarresultado);
              break;
            }
          }
          setcompletarinfo(mostrarresultado.join(''));
          break; 
        }else{
          console.log("no")
        }
      }

      setInput(''); 
    }
    
    if (completarinfo3Array.length > 0) {
      setAttempts(attempts -1); 
      console.log(completarinfo3Array[inputStage].toUpperCase());
      if (value.toUpperCase() === completarinfo3Array[inputStage].toUpperCase()) {
        setImage('/images/correct.png');
        setMessage('¡Correcto!');
        setSuccessfulAttempts(successfulAttempts + 1);
        setresulimage({
          Image
        });
        console.log(inputStage);
        if (inputStage + 1 === completarinfo3Array.length) {
          setImage('/images/correct.png');
          setMessage('¡Muy Bien!');
          setShowCompletado(true);
          setFinalResults({
            attempts,
            successfulAttempts: successfulAttempts + 1,
            failedAttempts,
            finalMessage: '¡Completaste todos los intentos correctamente!',
          });
          
          setresulimage({
            Image
          });
        
          // Crear el objeto de juego
          const juegoData = {
            alumno: idusuario, // Asegúrate de obtener el ID del alumno correcto
            
            palabra: completarinfo2, // La palabra que deseas guardar
            opciones: [
              {
                opcion: identificadorcomplet, // Ajusta según sea necesario
                hora: fechaHora, // Si tienes la hora en otra variable, úsala
                intentos: successfulAttempts,
                fallidos: failedAttempts,
                letras: letrateclado, // Asegúrate de que contenga las letras necesarias
              },
            ],
          };
        
          // Enviar los datos al backend con el token JWT
          try {
            const token = localStorage.getItem('authToken');  // Obtener el token JWT de localStorage
            if (!token) {
              console.error('No se encontró el token JWT');
              return;
            }

            const response = await fetch(USER_COMPLETAR_REGISTRAR_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Incluir el token JWT en el encabezado
              },
              body: JSON.stringify(juegoData),
            });
        
            if (!response.ok) {
              throw new Error('Error al guardar el juego');
            }
        
            const result = await response.json();
            console.log('Juego guardado con éxito:', result);
          } catch (error) {
            console.error('Error al enviar datos:', error);
          }

        }
        else {
          setInputStage(inputStage + 1);
        }
      } else {
        setImage('/images/answer.png');
        setMessage('Otra Vez.');
        setFailedAttempts(failedAttempts + 1);
        console.log(attempts)
        setresulimage({
          Image
        });
        if (attempts-2  <= 0) {
          setMessage('Has fallado todos los intentos.');
          setImage('/images/error.png');
          setFinalResults({
            attempts: attempts + 1,
            successfulAttempts,
            failedAttempts: failedAttempts + 1,
            finalMessage: 'Fallaste todos los intentos.'
          });
          setresulimage({
            Image
          });
        }
      }
    }
  };
  console.log("vamos a probar1",completarinfo2);
  console.log("vamos a probar2",original);
  console.log("vamos a probar3",presentaciones);
  console.log("vamos a probar4",selectcompletar);
  console.log("vamos a proba5",completarinfo);
  console.log("vamos a probar6",completarinfo3);
  console.log("vamos a proba7",completarinfo2);
  console.log("vamos a probar8",showCompletado);
  console.log("vamos a probar9",input);
  console.log("vamos a probar10",message);


  const resetGame = () => {
    setInput('');
    setMessage('');
    setShowCompletado(false);
    
    setcompletarinfo(original);
    console.log(original);
    setInputStage(0);
    setAttempts(50);
    setSuccessfulAttempts(0);
    setFailedAttempts(0);
    setFinalResults(null);
    setImage(null);
    setresulimage(null);

  };

  

  const handleInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleButtonClick = (index) => {
    setSelectedVideoIndex(index);
  };


  const handleButtonClickcompletar = async (index) => {
    resetGame();

    setselectcompletar(index);
  
    const tipo = index === 0 ? 'incompleto1' 
                : index === 1 ? 'incompleto2' 
                : index === 2 ? 'incompletoTotal' 
                : null;
  
    setstipocompletar(index);
    
    if (tipo === 'incompleto1') {
      setidentificadorcomplet("opcion1");
    } else if (tipo === 'incompleto2') {
      setidentificadorcomplet("opcion2");
    } else if (tipo === 'incompletoTotal') {
      setidentificadorcomplet("opcion3");
    }
    
    if (!tipo) {
      console.error('Tipo no válido para el índice:', index);
      return;
    }
  
    const nombre = selectedPresentacion?.nombre;
  
    if (!nombre) {
      console.error('El nombre de la presentación es undefined o no está definido');
      return;
    }
  
    console.log(`Solicitando datos para nombre: ${nombre}, tipo: ${tipo}`);
  
    try {
      const token = localStorage.getItem('authToken');  // Obtener el token JWT de localStorage
      if (!token) {
        console.error('No se encontró el token JWT');
        return;
      }

      const response = await axios.get(`${USER_COMPLETAR_SECTION_URL}/${nombre}/${tipo}`, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Incluir el token JWT en el encabezado
        },
      });
  
      const { nombreManipulado, nombreOriginal, letrasEliminadas } = response.data;
      setorginal(nombreManipulado);
      const nombreEnMayusculas = nombreManipulado.toUpperCase();
      const mostrarresultado = nombreEnMayusculas.split('');
      console.log(mostrarresultado);
      const mostrarletraeliminada = letrasEliminadas;
      console.log(mostrarletraeliminada);
      console.log(input);
      console.log("prueba3", completarinfo);
      
      setcompletarinfo(nombreManipulado || '');
      setcompletarinfo2(nombreOriginal || '');
      setcompletarinfo3(letrasEliminadas || []);
    } catch (error) {
      console.error('Error al obtener la presentación:', error);
    }
};




  useEffect(() => {
    if (selectedPresentacion) {
      handleButtonClickcompletar(0);
    }
  }, [selectedPresentacion]);

  const botonver = () => {
    setIsTitleVisible(!isTitleVisible);
    setButtonIcon(isTitleVisible ? faTimes : faFilm);
  };
// Suponiendo que tienes un estado para almacenar el índice seleccionado
const [selectedPresentacionIndex, setSelectedPresentacionIndex] = useState(-1);
  const handleRandomChange = () => {
    if (presentaciones.length > 0) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * presentaciones.length);
      } while (randomIndex === selectedPresentacionIndex);
  
      setSelectedPresentacion(presentaciones[randomIndex]);
      setSelectedVideoIndex(2);
      setSelectedPresentacionIndex(randomIndex); // Almacena el índice seleccionado
    }
  };



// Estado para la URL del GIF
const [linkgift, setlinkgift] = useState('');
const [gifSrc, setGifSrc] = useState('');

// Actualiza la URL del GIF en función de `selectedPresentacion` y `selectedVideoIndex`
useEffect(() => {
  if (selectedPresentacion && selectedPresentacion.titulos[selectedVideoIndex]) {
    setlinkgift(`${BASE_URL_GENERAL}/${selectedPresentacion.titulos[selectedVideoIndex].video}`);
    setGifSrc(`${BASE_URL_GENERAL}/${selectedPresentacion.titulos[selectedVideoIndex].video}`);
  }
}, [selectedPresentacion, selectedVideoIndex]);
  //resetgif

 

  // Función para reiniciar el GIF
const resetGif = () => {
  // Cambia la URL temporalmente para forzar el reinicio
  setGifSrc(''); // Primero se limpia
  setTimeout(() => setGifSrc(linkgift), 0); // Se reinicia con un pequeño retraso
};
  
  




  return (
    <div className='cuerpo_general' style={{
      backgroundImage: 'url(./ruta/a/tu-imagen.jpg)', // Usa comillas simples o dobles para la URL
      backgroundSize: 'cover', // Asegúrate de agregar otras propiedades si es necesario
      backgroundPosition: 'center', // Para centrar la imagen
      
  }}>

          

             




          
        
      <div className='cuerpo_general_interno'>

                  {finalResults && (
                    <div className="final-results">
                      <p>{finalResults.finalMessage}</p>
                      <p>Intentos exitosos: {finalResults.successfulAttempts}</p>
                      <p>Intentos fallidos: {finalResults.failedAttempts}</p>
                      <p>Intentos restantes: {finalResults.attempts-1}</p>
                      
                      <button className='botonreini' onClick={resetGame }>Reiniciar juego</button>
                      <button className='botonreini2' onClick={() => handleButtonClickcompletar(stipocompletar+1)}>Siguiente</button>
                      <button className='botonreini3' onClick={handleRandomChange}>Cambiar Palabra</button>
                    </div>
                    
                  )}
                  
      <div className='cuerpomediointernogen'>

        {selectedPresentacion ? (
          <div className='padre__'>

            <div className='iconoizqui_completar'>
              <div className='imas'>
                <div className='contenedorteclado_completar'>
                  <button className='botonverm_completar' onClick={() => handleButtonClickcompletar(0)}>
                    <img className='logotecadoi_completar' src="/assets/primeraPalabra.svg"/>
                  </button>
                </div>
                <div className='contenedorteclado_completar'>
                  <button className='botonverm_completar' onClick={() => handleButtonClickcompletar(1)}>
                    <img className='logotecadoi_completar' src="/assets/multiPalabras.svg"/>
                  </button>
                </div>
                <div className='contenedorteclado_completar'>
                  <button className='botonverm_completar' onClick={() => handleButtonClickcompletar(2)}>
                    <FontAwesomeIcon className='iconowey' icon={buttonIcon} size="3x" />
                  </button>
                </div>
                <div className='contenedorteclado_completar'>
                  <button className='botonverm_completar' onClick={handleRandomChange}>
                    <img className='logotecadoi_completar' src="/assets/cambiarTexto.svg"/>
                  </button>
                </div>
              </div>
            </div>


            <div className='contendor_generalcompletar'>
              <div className='contendor_hijo_video'>
                <div className='letrascontainer'>
                  <div className='video_con'>

                   
                    {/*<p>intentos Restantes: {attempts}</p>*/}
                    <p className='letracompletar2'>{showCompletado ? completarinfo2.toUpperCase() : completarinfo.toUpperCase()}</p>
                    {/*<p>{stipocompletar}</p>*/}
                    <input
                      type="text"
                      ref={inputRef}
                      value={input}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      className='teclado-virtual-input invisible-input' 
                    />

                  </div>
                  

                  {resulimage && (
                    <div className="Resultado">
                      
                      <img className='imagen_tre' src={`${image}`} />
                    </div>
                    
                  )}

                  
                </div>
              </div>
            </div>






            <div className='contendor_generalvideo_completar'>
                <div className='contendor_hijo_video'>
                  
                  <div className='button-container2'>

                  {selectedPresentacion.titulos.map((titulo, index) => (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={`video-button ${selectedVideoIndex === index ? 'active' : ''}`}
                    >
                      {index === 0 && (
                        <svg className={`iconovideo_completar ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                        <svg className={`iconovideo_completar ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.862 3.00017C11.2112 2.99011 10.6786 3.43032 10.6786 3.95602V6H10.4465V1.87008C10.4465 1.34438 9.9138 0.904176 9.26307 0.914231C8.63248 0.923981 8.12502 1.3399 8.12502 1.85157V6H7.89288V0.95602C7.89288 0.430317 7.36022 -0.00988577 6.7095 0.000168909C6.07891 0.00991891 5.57144 0.425841 5.57144 0.937505V6H5.3393V1.89352C5.3393 1.36782 4.80664 0.927614 4.15592 0.937669C3.52533 0.947419 3.01786 1.36334 3.01786 1.875V7.40607L2.09951 6.38609C1.72248 5.96735 0.996563 5.87475 0.478071 6.1793C-0.0403339 6.48385 -0.154955 7.07016 0.222075 7.48892L3.86675 11.5367C3.99597 11.6802 4.16538 11.797 4.36116 11.8775C4.55693 11.958 4.77351 12 4.9932 12H10.7269C11.3732 12 11.9346 11.6408 12.0827 11.1327L12.8519 8.49221C12.9503 8.15441 13 7.80856 13 7.46154V3.9375C13 3.42584 12.4926 3.00992 11.862 3.00017Z" />
                      </svg>
                      )}
                      {index === 2 && (
                        <svg className={`iconovideo_completar ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8333 10.2857V10.7143C10.8333 11.4244 10.3483 12 9.75 12H1.08333C0.485017 12 0 11.4244 0 10.7143V3.85714C0 3.14705 0.485017 2.57143 1.08333 2.57143H1.44444V8.14286C1.44444 9.32443 2.25442 10.2857 3.25 10.2857H10.8333ZM13 8.14286V1.28571C13 0.575625 12.515 0 11.9167 0H3.25C2.65168 0 2.16667 0.575625 2.16667 1.28571V8.14286C2.16667 8.85295 2.65168 9.42857 3.25 9.42857H11.9167C12.515 9.42857 13 8.85295 13 8.14286ZM5.77778 2.57143C5.77778 3.28152 5.29276 3.85714 4.69444 3.85714C4.09613 3.85714 3.61111 3.28152 3.61111 2.57143C3.61111 1.86134 4.09613 1.28571 4.69444 1.28571C5.29276 1.28571 5.77778 1.86134 5.77778 2.57143ZM3.61111 6.42857L4.86405 4.94156C4.96981 4.81604 5.1413 4.81604 5.24708 4.94156L6.13889 6L9.19739 2.37013C9.30315 2.24462 9.47463 2.24462 9.58041 2.37013L11.5556 4.71429V7.71429H3.61111V6.42857Z"/>
                      </svg>
                      )}
                    </button>
                  ))}

                  </div>


                  <div className='video-container_completar'>
                    
                  <div className='contendor_vid-res'>
                      <div className='video_con'>
                      
                        {/*<h3>{selectedPresentacion.titulos[selectedVideoIndex].titulo}</h3>*/}
                        <img 
                          className='custom-video'
                          key={`${selectedPresentacion.nombre}-${selectedVideoIndex}`} 
                          
                          src={gifSrc} 
                          alt={selectedPresentacion.titulos[selectedVideoIndex].titulo} 
                        />
                        
                      </div>

                      
                  </div>
                    <div className='resetbut'>
                        <div>
                          <button
                          className='botonmodelo' onClick={resetGif} >
                          <FontAwesomeIcon icon={faRotateRight} className='iconoreset' style={{color:'white'}} />
                            
                           </button>
                          
                          
                        </div>
                    </div>

                  </div>


                </div>
              </div>      


          </div>
        ) : (
          <div className='contenedore__'>
            <div className='loader__p'></div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Completar;
