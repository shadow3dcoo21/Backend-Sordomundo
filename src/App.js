// App.js
import React from 'react';
import AppRouter from './routes/AppRouter';

function App() {
    return (
        <div className="App" style={{
            backgroundImage: `url('/assets/fondogris.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100vw',  // Anchura de la pantalla
            height: '100vh', // Altura de la pantalla
            overflow: 'hidden' // Oculta cualquier contenido que se salga del contenedor
          }}>
            <AppRouter />
        </div>
    );
}

export default App;
