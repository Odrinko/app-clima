import { useState } from "react"
import '../styles/Clima.scss'


const Clima = () => {

    const [ciudad, setCiudad] = useState(''); //estado para escoger la ciudad
    const [datosClima, setDatosClima] = useState(null); //estado para los datos del clima
    const [error, setError] = useState(null); //estado para manejar los errores

    const API_KEY = 'a9f38d90bcc3333340ffdfdb6e358761'; // Reemplaza con tu clave de API
    const API_URL = `https://api.openweathermap.org/data/2.5/weather`;


    const cambiarCiudad = (e) => {
        setCiudad(e.target.value);
    };

    //funcion para consultar la API
    const buscarClima = async () => {
        try {
            const response = await fetch(`${API_URL}?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
            const data = await response.json();
            if (data.cod === 200) {
                setDatosClima(data); //almnacena los datos de la consulta si fue correcta
                setError(null); //limpia el error
            } else {
                setDatosClima(null); //limpia los datos si hubo un erro 
                setError(data.message);
            }
        } catch (err) {
            console.error('Error al obtener los datos del clima', err)
            setError('No se puedo obtener el clima, Intentalo de nuevo');

        };
    }

    return (
        <div className="clima">
            <h1 className="clima__titulo">Aplicación de Clima</h1>
            <div className="clima__contenedor">
                <input
                    type="text"
                    value={ciudad}
                    onChange={cambiarCiudad}
                    placeholder="Ingresa una ciudad"
                    className="clima__input"
                />
                <button className="clima__boton" onClick={buscarClima}>Obtener Clima</button>

                {/* Muestra el clima si los datos están disponibles */}
                {datosClima && (
                    <div className="clima__info">
                        <h2>{datosClima.name}, {datosClima.sys.country}</h2>
                        <p>Temperatura: {datosClima.main.temp}°C</p>
                        <p>Clima: {datosClima.weather[0].description}</p>
                        <p>Humedad: {datosClima.main.humidity}%</p>
                        <p>Viento: {datosClima.wind.speed} m/s</p>
                    </div>
                )}

                {/* Muestra el mensaje de error si hay uno */}
                {error && <p className="clima__error">{error}</p>}

            </div>
        </div>
    );
}

export default Clima;