import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';

import useMoneda from '../Hooks/useMoneda';
import useCriptomoneda from '../Hooks/useCriptomoneda';
import axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius:10px;
    color: white;
    transition: background-color .3s ease;

    &::hover {
        background-color: #326ac0;
        cursor: pointer;
    }

`;


const Formulario = () => {

    //state del listado de criptomonedas
    const [listacripto, guardarCriptomonedas] = useState([]);


    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Americano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'CAD', nombre: 'Dolar Canadiense'},
        {codigo: 'COP', nombre: 'Peso Colombiano'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'PEN', nombre: 'Sol'},
        {codigo: 'GTQ', nombre: 'Quetzal'},
        {codigo: 'VES', nombre: 'Bolivar'},
        {codigo: 'BRL', nombre: 'Real Brasileño'}
    ]

    //Utilizar useMoneda
    const [ moneda, SelectMonedas,  ] = useMoneda('Elige tu moneda', '', MONEDAS);

    //Utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptodivisa', '',listacripto);


    //Utilizar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, [])


        return (
        <form>
            <SelectMonedas />

            <SelectCripto />

            <Boton
                type="submit"
                value="Calcular"
            />

        </form>
    );
}


export default Formulario;