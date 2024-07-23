import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./fire"
import { admins } from "@/interfaces/Iadmin";



export const registraradmin=async(admins:admins)=>{
    const docRef=await addDoc(collection(db,"admin"),admins)
}
export const mostrar = async (rut: string) => {
    const q = query(collection(db, "admin"), where("rut", "==", rut));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0]; // tomamos el primer documento que coincida
        let admins:admins = {
            nombre: docSnap.data().nombre,
            rut: docSnap.data().rut,
            keyy: docSnap.id
        };
        return admins;
    } else {
        return undefined;
    }
};
