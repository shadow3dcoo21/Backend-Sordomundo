import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import async from 'async';
import { loadScript } from './utils';
import './styles/Examen.css';
const Examen = () => {
  const [detectedClass, setDetectedClass] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const prevTimeRef = useRef(null);
  const pastFrameTimesRef = useRef([]);
  const [fps, setFps] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!isCameraActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    contextRef.current = context;

    let model;
    let cameraMode = 'environment';

    const startVideoStreamPromise = navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: cameraMode
        }
      })
      .then((stream) => {
        setStream(stream);
        return new Promise((resolve) => {
          video.srcObject = stream;
          video.onloadeddata = () => {
            video.play();
            resolve();
          };
        });
      });

    const publishable_key = 'rf_mjqL6OZxPAZQQ6gxqGZjPcJ00353';
    const toLoad = {
      model: 'trabajo-v2',
      version: 1
    };

    const loadModelPromise = new Promise((resolve, reject) => {
      loadScript('https://cdn.roboflow.com/0.2.26/roboflow.js')
        .then(() => {
          window.roboflow
            .auth({
              publishable_key: publishable_key
            })
            .load(toLoad)
            .then((m) => {
              model = m;
              resolve();
            });
        })
        .catch((error) => {
          reject(error);
        });
    });

    setIsLoading(true);
    Promise.all([startVideoStreamPromise, loadModelPromise])
      .then(() => {
        setIsLoading(false);
        $('body').removeClass('loading');
        resizeCanvas();
        detectFrame();
      });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      } else {
        startVideoStreamPromise.then(() => {
          console.log("Stream reiniciado después de que la página se vuelve visible.");
        }).catch((error) => {
          console.error("Error al reiniciar el stream:", error);
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const videoDimensions = (video) => {
      const videoRatio = video.videoWidth / video.videoHeight;
      let width = video.offsetWidth;
      let height = video.offsetHeight;
      const elementRatio = width / height;

      if (elementRatio > videoRatio) {
        width = height * videoRatio;
      } else {
        height = width / videoRatio;
      }

      const scale = Math.min(
        canvas.width / video.videoWidth,
        canvas.height / video.videoHeight
      );

      return {
        width,
        height,
        scale
      };
    };

    $(window).resize(function () {
      resizeCanvas();
    });

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentNode;
      if (!parent) return;

      canvas.remove();

      const newCanvas = $("<canvas/>");
      parent.appendChild(newCanvas[0]);

      const ctx = newCanvas[0].getContext("2d");
      contextRef.current = ctx;

      const dimensions = videoDimensions(video);

      newCanvas[0].width = video.videoWidth;
      newCanvas[0].height = video.videoHeight;

      newCanvas.css({
        width: dimensions.width,
        height: dimensions.height,
        left: ($(window).width() - dimensions.width) / 2,
        top: ($(window).height() - dimensions.height) / 2
      });
    };

    const renderPredictions = (predictions) => {
      const { scale } = videoDimensions(video);

      if (predictions.length > 0) {
        setDetectedClass(predictions[0].class);
      }

      predictions.forEach((prediction) => {
        const { x, y, width, height } = prediction.bbox;
        context.strokeStyle = prediction.color;
        context.lineWidth = 4;
        context.strokeRect(
          (x - width / 2) / scale,
          (y - height / 2) / scale,
          width / scale,
          height / scale
        );

        context.font = '16px sans-serif';
        context.textBaseline = 'top';
        context.fillStyle = '#000000';
        context.fillText(
          prediction.class,
          (x - width / 2) / scale + 4,
          (y - height / 2) / scale + 1
        );
      });
    };

    const detectFrame = () => {
      if (!model) return requestAnimationFrame(detectFrame);

      model
        .detect(video)
        .then((predictions) => {
          const confidenceThreshold = 0.70;
          const filteredPredictions = predictions.filter(prediction => prediction.confidence >= confidenceThreshold);

          requestAnimationFrame(detectFrame);
          renderPredictions(filteredPredictions);

          if (prevTimeRef.current) {
            pastFrameTimesRef.current.push(Date.now() - prevTimeRef.current);
            if (pastFrameTimesRef.current.length > 30) pastFrameTimesRef.current.shift();

            const total = pastFrameTimesRef.current.reduce((sum, t) => sum + t / 1000, 0);
            const fps = pastFrameTimesRef.current.length / total;
            setFps(Math.round(fps));
          }
          prevTimeRef.current = Date.now();
        })
        .catch((e) => {
          console.log("CAUGHT", e);
          requestAnimationFrame(detectFrame);
        });
    };

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraActive]);

  const handleStartCamera = () => {
    setIsCameraActive(true);
  };

  const handleStopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  return (
    <div className='Padre_general'>

      {!isCameraActive && 
      <div className='Padre_general_interno'>
        <div className='Padre_general_interno_ultimo'>
          <div className='otro_p'>
            <div className='Texto_General'>
              <p className='letra__'>¡Hola chicos y chicas!</p>
              <p className='letra__'>¡Vamos a tener un divertido examen! Aparecerá una palabra en la pantalla y tendrán que traer el objeto o mostrar la imagen de la cartilla que coincida.</p>
              <p className='letra__'>¡Prepárense para un día lleno de aprendizaje y diversión! 🚀</p>
            </div>
            <div className='Boton_General'>
              <div className='boton_'>
                <button className='botonsi' onClick={handleStartCamera}>Start Camera</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      }

      
        <>
        <div className='camaraactiva' style={{ display: isCameraActive ? 'block' : 'none' ,backgroundImage: `url('/assets/fondogris.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100vw',  // Anchura de la pantalla
            height: '100vh', // Altura de la pantalla
            overflow: 'hidden' }}>
          <div className='camarainter'>
            <div className='hijocamara'>
              <div className='Parte_camara_general'>
                  <div className='parte_camara'>
                    
                    <div className='camara'>
                        <video className='camaravideo' id="video" autoPlay muted playsInline ref={videoRef}></video>
                          <canvas id="canvas" ref={canvasRef}></canvas>
                          <div>FPS: {fps}</div>
                          {isLoading && <div>Loading...</div>}
                          
                          
                      </div>

                    <div className='botonescamara'>
                        <div></div>
                        <div>{detectedClass && <div className=''>{detectedClass}</div>}</div>
                        <div></div>
                    </div>

                </div>
              </div>
              
              <div className='botones_fuera'>
                <div><button className='botonesfooterex'  onClick={handleStopCamera}>Cancelar Examen</button> {/* Botón de cancelar */}</div>
                <div><button className='botonesfooterex' >Terminar Examen</button> {/* Botón de cancelar */}</div>
              </div>
             
              
            </div>
            
          </div>
          
        </div>
          
        </>
      
    </div>
  );
};

export default Examen;
