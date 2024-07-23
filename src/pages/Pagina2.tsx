
import { obtenertrabajadores, eliminartrabajador } from '@/styles/Firebase/promesas';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { MdTipsAndUpdates } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from 'next/router';
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { trabajadores } from '../interfaces/Itrabajadores';

export const Pagina2 = () => {
    const [trabajador, setTrabajador] = useState<trabajadores[]>([]);
    const [show, setShow] = useState(false);
    const [trabajadorselec, settrabajadorselec] = useState<trabajadores | null>(null);
    const router = useRouter();

    useEffect(() => {
        obtenertrabajadores().then((trabajadorm) => {
            setTrabajador(trabajadorm);
        }).catch((e) => {
            console.log(e);
            alert("☠️ Algo pasó ☠️");
        });
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = (trabajador: trabajadores) => {
        settrabajadorselec(trabajador);
        setShow(true);
    };

    const handleDelete = () => {
        if (trabajadorselec && trabajadorselec.key) {
            eliminartrabajador(trabajadorselec.key).then(() => {
                setTrabajador(trabajador.filter(t => t.key !== trabajadorselec.key));
                handleClose();
            }).catch((e) => {
                console.log(e);
                alert("☠️ Algo pasó ☠️");
            });
        } else {
            console.log("El trabajador seleccionado no tiene una clave válida");
            alert("☠️ El trabajador seleccionado no tiene una clave válida ☠️");
        }
    };

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>RUT</th>
                        <th>Email</th>
                        <th>sexo</th>
                        <th>puesto de trabajo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trabajador.map((p) => {
                            return (
                                <tr key={p.key}>
                                    <td>{p.nombre}</td>
                                    <td>{p.apellido}</td>
                                    <td>{p.telefono}</td>
                                    <td>{p.rut}</td>
                                    <td>{p.email}</td>
                                    <td>{p.sexo}</td>
                                    <td>{p.puesto}</td>
                                    <td>
                                        <Link href={{ pathname: 'Pagina3', query: { key: p.key } }}>
                                            <Button variant='warning'><MdTipsAndUpdates /></Button>
                                        </Link>
                                        <Button variant='danger' onClick={() => handleShow(p)}><RiDeleteBin5Line /></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Button type='button' variant='secondary' onClick={() => router.push('/Perfil2')}>Volver al Inicio</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de eliminacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Está seguro de que desea eliminar este elemento?🤨</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    <MdCancel />cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                    <GiConfirmed />eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Pagina2;