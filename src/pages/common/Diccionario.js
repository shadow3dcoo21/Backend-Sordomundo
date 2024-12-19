import React, { useState, useEffect} from 'react';
import { BASE_URL_GENERAL , USER_COMPLETAR_URL} from '../../services/apiJWTServices';
import './styles/Diccionario.css';


const Diccionario = () => {

  const [presentaciones, setPresentaciones] = useState([]);//Principal , aqui se guarda todos los datos de la base de datos que pedimos la primera vez
  const [selectedPresentacion, setSelectedPresentacion] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [nombres, setNombres] = useState([]);
  const [error, setError] = useState(null);  // State to manage errors
  const [loading, setLoading] = useState(true);  // State to manage loading state

   //Aqui carga los datos la primer vez desde la api


  useEffect(() => {
    const fetchPresentaciones = async () => {
      const token = localStorage.getItem('authToken');  // Obtener el token desde el almacenamiento local

      if (!token) {
        setError('No se encontró el token');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(USER_COMPLETAR_URL, {
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



  useEffect(() => {
    if (presentaciones.length > 0) {
      //console.log(presentaciones);
      mostrardiccioletra(0, 'A');
    }
  }, [presentaciones]);


  const handleButtonClick = (index) => {
    setSelectedVideoIndex(index);
  };


  
  //izquierda abecedario
  const [abecedarios, setAbecedarios] = useState([]);

  useEffect(() => {
    // Crear un array vacío
    let abecedariosTemp = [];

    // Llenar el array con las letras del alfabeto
    for (let i = 0; i < 26; i++) {
      abecedariosTemp.push(String.fromCharCode(65 + i)); // Letras mayúsculas A-Z
    }
    setAbecedarios(abecedariosTemp);
    //console.log(abecedarios)
  }, []);
  


  const [inici, setinici] = useState();
  const [seleccionadonommbrearray,setseleccionadonommbrearray]= useState([]);

  const mostrardiccioletra = async (index,letra) => {
    //console.log(index);
    let prueba=abecedarios[index];
    //console.log(prueba);
    setinici(prueba);
    //console.log(letra);

    //console.log(inici);
    //console.log(abecedarios[index]);
    
    //console.log(abecedarios);
   
    //console.log(nombres);
    const arraynombres = [];
    
    for (let a=0;a<nombres.length;a++){
      const espacio = nombres[a].split('');
      if (a===0){
        while (arraynombres.length > 0) {
          arraynombres.pop();
      }
      }
      if (espacio[0]===prueba){
        arraynombres.push(nombres[a]);
        //console.log(espacio[0])
        //console.log(nombres[a])
      }
      else{
        
        //console.log("mal")
      }
      //console.log(arraynombres);
      //console.log(espacio);

      //console.log(inici);

    }
    setseleccionadonommbrearray(arraynombres);
  
    //console.log(seleccionadonommbrearray);
    if (arraynombres.length<0){
      pruebanadamas()
      //console.log("paso")
    }

    selectionnew(arraynombres[0] , 0);
  };

  useEffect(() => {
    
  }, [selectedPresentacion]);




  const selectionnew = (letra , index) =>{

    //console.log(index);
    //console.log(letra);    

    //console.log(seleccionadonommbrearray[index])

    for(let i =0;i<presentaciones.length;i++){
      if(presentaciones[i].nombre===letra){
        //console.log("correcto funciono");
        //console.log(presentaciones[i].titulos);
        //console.log(presentaciones[i]);
        setSelectedPresentacion(presentaciones[i]);
        break
      }
    }

    //console.log(presentaciones[index])
    //console.log(selectedPresentacion.nombre);

  }

  



      const pruebanadamas = () =>{
        setSelectedPresentacion({})
        

      }

      const [selectedButtonBlock1, setSelectedButtonBlock1] = useState(0);
      const [selectedButtonBlock2, setSelectedButtonBlock2] = useState(0);
      const handleButtonClickBlock1 = (index, letra) => {
        setSelectedButtonBlock1(index);
        setSelectedButtonBlock2(0);
        mostrardiccioletra(index, letra);
      };
    
      const handleButtonClickBlock2 = (letra, index) => {
        setSelectedButtonBlock2(index);
        selectionnew(letra, index);
        
      };



  return (
    <div className='cuerpo_generaldiccionario'>
      <div className='cuerpo_general_internodiccionario'>
      
                   
      <div className='cuerpomediointernogendiccio'>
      
            <div className='padre__dicci'>

            <div className='contenedor_generl_diccio'>

            <div className='contendor_generaldiccionario2'>

                  <div className='contendor_hijo_diccionarioletras'>
                    <div className='letrascontainer1'>
                      <div className='video_con2'>

                      
                      
                      
                      {abecedarios.map((letra, index) => (
                        <button 
                          key={index} 
                          className={`botonvermdicci ${selectedButtonBlock1  === index ? 'active' : ''}`} 
                          onClick={() => handleButtonClickBlock1(index, letra)}
                        >
                          {letra}
                        </button>
                      ))}
                      
                        

                      </div>
                      

                      
                    </div>
                  </div>

                  </div>

                  <div className='contendor_generaldiccionario'>
                    <div className='contendor_hijo_diccionario'>
                      <div className='letrascontainer2'>
                        <div className='video_con1'>
                            
                          <ul className='ul'>
                            
                          {seleccionadonommbrearray.length > 0 ? (
                              seleccionadonommbrearray.map((letra, index) => (
                                <button 
                                  key={index} 
                                  className={`botonverm2 ${selectedButtonBlock2 === index ? 'active' : ''}`} 
                                  onClick={() => handleButtonClickBlock2(letra, index)}
                                >
                                  
                                  {letra}
                                </button>
                              ))
                            ) : (
                              <p>No hay datos de eso</p>
                            )}
                          </ul>


                      
                            

                        </div>
                        

                        
                      </div>
                    </div>
                  </div>



            </div>
           

            



        {selectedPresentacion ? (
          


            

            <div className='contendor_generalvideo'>
                <div className='contendor_hijo_video'>
                  <div className='button-container'>
                  {selectedPresentacion.titulos.map((titulo, index) => (
                    
                    <button
                      key={index}
                      onClick={() => handleButtonClick(index)}
                      className={`video-button ${selectedVideoIndex === index ? 'active' : ''}`}
                    >
                      
                      {index === 0 && (
                        <svg className={`iconovideo ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
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
                        <svg className={`iconovideo ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.862 3.00017C11.2112 2.99011 10.6786 3.43032 10.6786 3.95602V6H10.4465V1.87008C10.4465 1.34438 9.9138 0.904176 9.26307 0.914231C8.63248 0.923981 8.12502 1.3399 8.12502 1.85157V6H7.89288V0.95602C7.89288 0.430317 7.36022 -0.00988577 6.7095 0.000168909C6.07891 0.00991891 5.57144 0.425841 5.57144 0.937505V6H5.3393V1.89352C5.3393 1.36782 4.80664 0.927614 4.15592 0.937669C3.52533 0.947419 3.01786 1.36334 3.01786 1.875V7.40607L2.09951 6.38609C1.72248 5.96735 0.996563 5.87475 0.478071 6.1793C-0.0403339 6.48385 -0.154955 7.07016 0.222075 7.48892L3.86675 11.5367C3.99597 11.6802 4.16538 11.797 4.36116 11.8775C4.55693 11.958 4.77351 12 4.9932 12H10.7269C11.3732 12 11.9346 11.6408 12.0827 11.1327L12.8519 8.49221C12.9503 8.15441 13 7.80856 13 7.46154V3.9375C13 3.42584 12.4926 3.00992 11.862 3.00017Z" />
                      </svg>
                      )}
                      {index === 2 && (
                        <svg className={`iconovideo ${selectedVideoIndex === index ? 'active-icon' : ''}`} width="13" height="12" viewBox="0 0 13 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8333 10.2857V10.7143C10.8333 11.4244 10.3483 12 9.75 12H1.08333C0.485017 12 0 11.4244 0 10.7143V3.85714C0 3.14705 0.485017 2.57143 1.08333 2.57143H1.44444V8.14286C1.44444 9.32443 2.25442 10.2857 3.25 10.2857H10.8333ZM13 8.14286V1.28571C13 0.575625 12.515 0 11.9167 0H3.25C2.65168 0 2.16667 0.575625 2.16667 1.28571V8.14286C2.16667 8.85295 2.65168 9.42857 3.25 9.42857H11.9167C12.515 9.42857 13 8.85295 13 8.14286ZM5.77778 2.57143C5.77778 3.28152 5.29276 3.85714 4.69444 3.85714C4.09613 3.85714 3.61111 3.28152 3.61111 2.57143C3.61111 1.86134 4.09613 1.28571 4.69444 1.28571C5.29276 1.28571 5.77778 1.86134 5.77778 2.57143ZM3.61111 6.42857L4.86405 4.94156C4.96981 4.81604 5.1413 4.81604 5.24708 4.94156L6.13889 6L9.19739 2.37013C9.30315 2.24462 9.47463 2.24462 9.58041 2.37013L11.5556 4.71429V7.71429H3.61111V6.42857Z"/>
                      </svg>
                      )}
                    </button>
                  ))}


                  </div>
                  <div className='video-container'>
                  <div className='video_con'>
                    {/*<h3>{selectedPresentacion.titulos[selectedVideoIndex].titulo}</h3>*/}
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


          
        ) : (
          <div className='contenedore__'>
            <div className='loader__p'></div>
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default Diccionario;
