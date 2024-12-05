// /pages/common/Presentacion.js
import React from 'react';

function Presentacion() {
    return (
        <div>
            Bienvenido a la página de juegos
            <iframe
                style={{ maxWidth: '50%' }}
                src="https://wordwall.net/es/embed/68244e8d16f145af999d4da83c86fe87?themeId=60&templateId=11&fontStackId=21"
                width="500"
                height="380"
                
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default Presentacion;