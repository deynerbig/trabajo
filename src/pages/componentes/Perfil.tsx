import React, { useState } from 'react';
import { useRouter } from 'next/router';
import css from 'styled-jsx/css';
import { mostrarrut } from '@/styles/Firebase/promesas';
import { mostrar } from '@/styles/Firebase/promesas2';
import Link from 'next/link';

const styles = css`
  .container {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .izquierda,
  .derecha {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .izquierda {
    background-color: black;
    color: green;
  }

  .derecha {
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
    background-color: #90EE90;
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

`;

export const Perfil = () => {
  const [trabajadorRut, settrabajadorRut] = useState('');
  const [adminRut, setAdminRut] = useState('');
  const router = useRouter();

  const handletrabajadorIngreso = async () => {
    try {
      const trabajador = await mostrarrut(trabajadorRut);
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

  const handleAdminIngreso = async () => {
    try {
      const admin = await mostrar(adminRut);
      if (admin) {
        alert(`Bienvenido ${admin.nombre}`);
        router.push('/Pagina4');
      } else {
        alert('Admin no encontrado o RUT incorrecto');
      }
    } catch (error) {
      console.error('Error al obtener el admin:', error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className='izquierda'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handletrabajadorIngreso();
            }}
          >
            <div className='formulario-login'>
              <h1 className='welcome'>BIENVENIDO</h1>
              <h1 className='title'>Registro Trabajadores</h1>
              <label htmlFor='trabajador-rut'>RUT:</label>
              <input
                type='text'
                id='trabajador-rut'
                value={trabajadorRut}
                onChange={(e) => settrabajadorRut(e.target.value)}
                required
              />
            </div>
            <button type='submit'>Iniciar Sesión</button>
          </form>
        </div>
        <div className='derecha'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAdminIngreso();
            }}
          >
            <div className='formulario-login'>
              <h1 className='welcome'>ADMIN</h1>
              <h1 className='tittle'>Registro de Admin</h1>
              <label htmlFor='admin-rut'>Admin RUT:</label>
              <input
                type='text'
                id='admin-rut'
                value={adminRut}
                onChange={(e) => setAdminRut(e.target.value)}
                required
              />
            </div>
            <button type='submit'>Iniciar como Admin</button>
          </form>
        </div>
      </div>
      <style jsx>{styles}</style>
    </>
  );
};

export default Perfil;