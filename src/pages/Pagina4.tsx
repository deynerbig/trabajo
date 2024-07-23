import { trabajadores } from '@/interfaces/Itrabajadores';
import { registrartrabajador } from '@/styles/Firebase/promesas';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { GiArchiveRegister } from "react-icons/gi";
import { useRouter } from 'next/router';
import { admins } from '@/interfaces/Iadmin';
import { registraradmin } from '@/styles/Firebase/promesas2';

const initialState: admins = {
    nombre: "",
    rut: ""
};

const initialErrores = {
    nombre: "",
    rut: ""
};

export const Pagina1 = () => {
    const [admin, setadmin] = useState<admins>(initialState);
    const [errores, setErrores] = useState(initialErrores);
    const router = useRouter();

    const handletrabajador = (name: string, value: string) => {
        setadmin({ ...admin, [name]: value });
        setErrores({ ...errores, [name]: "" });
    };

    const validar = () => {
        let valid = true;
        let newErrors = { ...initialErrores };

        if (!admin.nombre) {
            newErrors.nombre = "El nombre es requerido";
            valid = false;
        }
        if (!admin.rut) {
            newErrors.rut = "El RUT es requerido";
            valid = false;
        }
        setErrores(newErrors);
        return valid;
    };

    const registrar = () => {
        if (validar()) {
            registraradmin(admin).then(() => {
                alert("🎊🎊🎊🎉 Se registró algo 🎉🎊🎊🎊");
                setadmin(initialState);
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
                        value={admin.nombre}
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                        isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>RUT *</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingrese su RUT'
                        name='rut'
                        value={admin.rut}
                        onChange={(e) => handletrabajador(e.currentTarget.name, e.currentTarget.value)}
                        isInvalid={!!errores.rut}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.rut}
                    </Form.Control.Feedback>
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