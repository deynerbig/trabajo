import React, { useState } from 'react';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';
import { mostrarrut } from '@/styles/Firebase/promesas';

const styles = css`
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .left,
  .right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left {
    background-color: black;
    color: green;
  }

  .right {
    background-color: green;
    color: black;
    position: relative;
  }

  .formulario-login {
    margin-bottom: 15px;
    width: 100%;
    max-width: 400px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid;
    border-radius: 4px;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  h1.welcome {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  h1.title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .right img {
    max-width: 80%;
    max-height: 80%;
    object-fit: contain;
    margin: 0 auto;
    display: block;
  }
`;

export const Perfil = () => {
  const [rut, setRut] = useState('');
  const router = useRouter();

  const handleingreso = async () => {
    try {
      const trabajador = await mostrarrut(rut);
      if (trabajador) {
        alert(`Bienvenido ${trabajador.nombre}`);
        router.push('/Perfil2');
      } else {
        alert('Usuario no encontrado o RUT incorrecto');
      }
    } catch (error) {
      console.error('Error al obtener el trabajador:', error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='left'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleingreso();
            }}
          >
            <div className='formulario-login'>
              <h1 className='welcome'>BIENVENIDO</h1>
              <h1 className='title'>Registro Trabajadores</h1>
              <label htmlFor='rut'>RUT:</label>
              <input
                type='text'
                id='rut'
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                required
              />
            </div>
            <button type='submit'>Iniciar Sesión</button>
          </form>
        </div>
        <div className='right'>
          <img src="https://static.vecteezy.com/system/resources/previews/002/520/958/large_2x/teamwork-illustration-concept-free-vector.jpg" alt="trabajo" />
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Perfil;