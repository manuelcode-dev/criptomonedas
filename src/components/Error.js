import React from 'react'
import styled from '@emotion/styled';

const MensajeError = styled.p`
    background-color: yellow;
    padding: .5rem;
    color: red;
    font-size:18px;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;
    font-family: 'Ubuntu', sans-serif;
`;

const Error = ({mensaje}) => {
    return(
        <MensajeError>{mensaje}</MensajeError>
    )
}

export default Error;