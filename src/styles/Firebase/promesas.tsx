import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./fire";
import { trabajadores } from "@/interfaces/Itrabajadores";

export const registrartrabajador = async (trabajador: trabajadores) => {
    const docRef = await addDoc(collection(db, "trabajadores"), trabajador);
};

export const obtenertrabajadores = async () => {
    let trabajadort: trabajadores[] = [];
    const querySnapshot = await getDocs(collection(db, "trabajadores"));
    querySnapshot.forEach((doc) => {
        let trabajadorr: trabajadores = {
            nombre: doc.data().nombre,
            apellido: doc.data().apellido,
            telefono: doc.data().telefono,
            rut: doc.data().rut,
            email: doc.data().email,
            key: doc.id
        };
        trabajadort.push(trabajadorr);
    });
    return trabajadort;
};

export const mostrartrabajador = async (key: string) => {
    const docRef = doc(db, "trabajadores", key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let trabajadorr: trabajadores = {
            nombre: docSnap.data().nombre,
            apellido: docSnap.data().apellido,
            telefono: docSnap.data().telefono,
            rut: docSnap.data().rut,
            email: docSnap.data().email,
            key: docSnap.id
        };
        return trabajadorr;
    } else {
        return undefined;
    }
};
//crear una nueva promesa que recibe el rut y valide que este dentro de la base de datos 
export const mostrarrut = async (rut: string) => {
    const q = query(collection(db, "trabajadores"), where("rut", "==", rut));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // tomamos el primer documento que coincida
        let trabajadorr: trabajadores = {
            nombre: docSnap.data().nombre,
            apellido: docSnap.data().apellido,
            telefono: docSnap.data().telefono,
            rut: docSnap.data().rut,
            email: docSnap.data().email,
            key: docSnap.id
        };
        return trabajadorr;
    } else {
        return undefined;
    }
};

export const actualizartrabajador = async (p: trabajadores) => {
    const ref = doc(db, "trabajadores", p.key!);
    await updateDoc(ref, { ...p });
};

export const eliminartrabajador = async (key: string) => {
    const ref = doc(db, "trabajadores", key!);
    await deleteDoc(ref);
};