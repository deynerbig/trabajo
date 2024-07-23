
import { actualizartrabajador, mostrartrabajador } from '@/styles/Firebase/promesas';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { trabajadores } from './Itrabajadores';

const initialState: trabajadores = {
  nombre: "",
  apellido: "",
  telefono: 0,
  rut: "",
  email: "",
  sexo:"",
  puesto:""
};
const initialErrors = {
  nombre: "",
  apellido: "",
  telefono: "",
  rut: "",
  email: ""
};

export const Pagina3 = () => {
  const router = useRouter();
  const [trabajador, setTrabajador] = useState<trabajadores>(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const handleTrabajador = (name: string, value: string) => {
    setTrabajador({ ...trabajador, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  useEffect(() => {
    const key = router.query.key;
    if (key !== undefined && typeof key === "string") {
      mostrartrabajador(key).then((p) => {
        if (p !== undefined) {
          setTrabajador(p);
        } else {
          router.push('/Pagina2'); 
        }
      }).catch(() => {
        router.push('/Pagina2'); 
      });
    } 
  }, [router.query.key]);
  const validarformulario = () => {
    let valid = true;
    let newErrors = { ...initialErrors };
  
    if (!trabajador.nombre) {
      newErrors.nombre = "El nombre es requerido";
      valid = false;
    }
    if (!trabajador.apellido) {
      newErrors.apellido = "El apellido es requerido";
      valid = false;
    }
    if (!trabajador.telefono) {
      newErrors.telefono = "El teléfono es requerido";
      valid = false;
    }
    if (!trabajador.rut) {
      newErrors.rut = "El RUT es requerido";
      valid = false;
    }
    if (!trabajador.email) {
      newErrors.email = "El email es requerido";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  const modificar = () => {
    if (validarformulario()){
      actualizartrabajador(trabajador).then(() => {
        alert("🎉🎉🎉 Se ha Actualizado 🎉🎉🎉");
      }).catch((e) => {
        console.log(e);
        alert("Ocurrió un error");
      });
    }else{alert("👀Debe llenar todos los datos del formulario👀")}
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Nombre *</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Ingrese su nombre'
            name='nombre' 
            value={trabajador.nombre}
            onChange={(e) => handleTrabajador(e.currentTarget.name, e.currentTarget.value)}
            isInvalid={!!errors.nombre}
          />
           <Form.Control.Feedback type="invalid">
                        {errors.nombre}
           </Form.Control.Feedback>
          <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Apellido *</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Ingrese su apellido'
            name='apellido' 
            value={trabajador.apellido}
            onChange={(e) => handleTrabajador(e.currentTarget.name, e.currentTarget.value)}
            isInvalid={!!errors.apellido}
          />
           <Form.Control.Feedback type="invalid">
                        {errors.apellido}
            </Form.Control.Feedback>
          <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Teléfono *</Form.Label>
          <Form.Control 
            type='number' 
            placeholder='Ingrese su teléfono'
            name='telefono' 
            value={trabajador.telefono}
            onChange={(e) => handleTrabajador(e.currentTarget.name, e.currentTarget.value)}
            isInvalid={!!errors.telefono}/>
             <Form.Control.Feedback type="invalid">
                        {errors.telefono}
            </Form.Control.Feedback>
          <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>RUT *</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Ingrese su RUT'
            name='rut' 
            value={trabajador.rut}
            onChange={(e) => handleTrabajador(e.currentTarget.name, e.currentTarget.value)}
            isInvalid={!!errors.rut}
          />
           <Form.Control.Feedback type="invalid">
                        {errors.rut}
            </Form.Control.Feedback>
          <Form.Text></Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Email *</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Ingrese su email'
            name='email' 
            value={trabajador.email}
            onChange={(e) => handleTrabajador(e.currentTarget.name, e.currentTarget.value)}
            isInvalid={!!errors.email}
          />
           <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
          <Form.Text></Form.Text>
        </Form.Group>

        <Button type='button' variant='success' onClick={modificar}><MdOutlineTipsAndUpdates /> Actualizar</Button>
        <Button type='button' variant='secondary' onClick={() => router.push('/Pagina2')}>Volver</Button>
      </Form>
    </>
  );
};

export default Pagina3;