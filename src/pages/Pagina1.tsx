import { registrartrabajador } from '@/styles/Firebase/promesas';
import React, { useState } from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel, FormSelect } from 'react-bootstrap';
import { GiArchiveRegister } from "react-icons/gi";
import { useRouter } from 'next/router';
import { trabajadores } from './Itrabajadores';

const initialState: trabajadores = {
    nombre: "",
    apellido: "",
    telefono: 0,
    rut: "",
    email: "",
    sexo: "Hombre",
    puesto:"trabajador normal"
};

const initialErrores = {
    nombre: "",
    apellido: "",
    telefono: "",
    rut: "",
    email: ""
};

export const Pagina1 = () => {
    const [trabajador, settrabajador] = useState<trabajadores>(initialState);
    const [errores, setErrores] = useState(initialErrores);
    const router = useRouter();

    const handletrabajador = (name: string, value: string) => {
        settrabajador({ ...trabajador, [name]: value });
        setErrores({ ...errores, [name]: "" });
    };

    const validar = () => {
        let valid = true;
        let newErrors = { ...initialErrores };

        if (!trabajador.nombre) {
            newErrors.nombre = "El nombre es requerido";
            valid = false;
        }
        if (!trabajador.apellido) {
            newErrors.apellido = "El apellido es requerido";
            valid = false;
        }
        if (!trabajador.telefono) {
            newErrors.telefono = "El telefono es requerido";
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

        setErrores(newErrors);
        return valid;
    };

    const registrar = () => {
        if (validar()) {
            registrartrabajador(trabajador).then(() => {
                alert("🎊🎊🎊🎉 Se registró algo 🎉🎊🎊🎊");
                settrabajador(initialState);
            }).catch((e) => {
                console.log(e);
                alert("Pasó algo 😞😞😞😞😞");
            });
        } else {
            alert("Por favor, completa todos los campos requeridos.");
        }
    };

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
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                        isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido *</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese su apellido'
                        name='apellido'
                        value={trabajador.apellido}
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                        isInvalid={!!errores.apellido}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.apellido}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono *</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingrese su teléfono'
                        name='telefono'
                        value={trabajador.telefono}
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                        isInvalid={!!errores.telefono}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.telefono}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>RUT *</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese su RUT'
                        name='rut'
                        value={trabajador.rut}
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                        isInvalid={!!errores.rut}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.rut}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Ingrese su email'
                        name='email'
                        value={trabajador.email}
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                        isInvalid={!!errores.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Elija su sexo</Form.Label>
                    <Form.Select
                        name='sexo'
                        value={trabajador.sexo}
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                    >
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Elija su puesto de trabajo</Form.Label>
                    <Form.Select 
                    name='puesto' 
                    value={trabajador.puesto}
                    onChange={(e)=>handletrabajador(e.currentTarget.name,e.currentTarget.value)}
                    >
                        
                        <option value="gerente">gerente</option>
                        <option value="jefe">jefe interior</option>
                        <option value="trabajador normal">trabajador normal</option>

                    </Form.Select>
                </Form.Group>

                <Button type='button' variant='success' onClick={registrar}>
                    <GiArchiveRegister /> Registrar
                </Button>
                <Button type='button' variant='secondary' onClick={() => router.push('/Perfil2')}>
                    Volver al Inicio
                </Button>
            </Form>
        </>
    );
};

export default Pagina1;