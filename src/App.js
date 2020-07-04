import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './logodesc.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Ubuntu', sans-serif;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content:'';
    width: 100px;
    height: 6px;
    background-color: yellow;
    display: block;


  }
`;

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState (false);
    

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
         //Evitamos la ejecucion la primera vez
       if(moneda === '') return;

          //Consultar la API
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      
        const resultado = await axios.get(url);



        //Mostrar el spinner
        guardarCargando(true);

        //ocultar el spinner
        setTimeout(() => {


          //cambiar el estado de cargando
          guardarCargando(false);


          //guardar cotizacion
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        },3000);
       
    }

    cotizarCriptomoneda(); 
  }, [moneda, criptomoneda]);


  //Mostrat spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="Descentralia"
        />
      </div>
      <div>
        <Heading>Anímate!<br></br>cotiza tu criptodivisa al instante, aquí:</Heading>

        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
