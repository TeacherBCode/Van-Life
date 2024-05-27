import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, doc, getDoc, query, where} from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyDF2uvZE0sY5_64a047zyCtMpJ07Ym_L30",
  authDomain: "playground-321f7.firebaseapp.com",
  databaseURL: "https://playground-321f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "playground-321f7",
  storageBucket: "playground-321f7.appspot.com",
  messagingSenderId: "606021330212",
  appId: "1:606021330212:web:695664dc6929b814543fb1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

//Refactoring the Firestore db

const vansCollectionRef = collection(db, "vans")


export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map( doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db,"vans",id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id 
    }
}


export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map( doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}



// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}