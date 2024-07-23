import React from 'react';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';
import { GiArchiveRegister } from "react-icons/gi";
import { FaTable, FaArrowLeft } from "react-icons/fa";
import Link from 'next/link';

const styles = css`
  .container {
    display: flex;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .mitad {
    position: absolute;
    width: 50%;
    height: 100%;
  }

  .izquierda {
    background-color: green;
    color: black;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .derecha {
    background-color: black;
    color: green;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    z-index: 1;
  }

  .nav-boton {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .nav-boton:hover {
    background-color: black;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin: 0;
    text-transform: uppercase;
    color: inherit;
    text-align: center;
  }

  .title-izquierda {
    color: black;
  }

  .title-derecha {
    color: green;
  }

  .back-button-container {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .back-button {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .back-button:hover {
    background-color: black;
  }

  .back-button svg {
    margin-right: 10px;
  }
`;

export const Perfil2 = () => {
  const router = useRouter();

  return (
    <>
      <div>
        <div className='mitad izquierda'>
          <div className='nav'>
            <h1 className='title-izquierda'>Registrar Trabajador</h1>
            <nav>
              <Link href="./componentes/Perfil">Regrese al Inicio</Link>
            </nav>
            <button className='nav-boton'onClick={() => router.push('/Pagina1')}>
              <GiArchiveRegister /> Registrese ya!
            </button>
          </div>
        </div>
        <div className='mitad derecha'>
          <div className='nav'>
            <h1 className='title-derecha'>Ver Tabla de Trabajadores</h1>
            <nav>
              <Link href="./componentes/Perfil">Regrese al Inicio</Link>
            </nav>
            <button
              className='nav-boton'
              onClick={() => router.push('/Pagina2')}
            >
              <FaTable /> Tabla de Trabajadores
            </button>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    </>
  );
};

export default Perfil2;