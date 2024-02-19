import { User } from '../../model/user';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';


export const retrieveAllDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return documents;
  } catch (error) {
    console.error('Error retrieving documents:', error);
    return [];
  }
};

export const addDocument = async (collectionName: string, data: object) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

export const updateDocument = async (collectionName: string, docId: string, data: object) => {
  try {
    await setDoc(doc(db, collectionName, docId), data);
    console.log('Document updated with ID: ', docId);
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export const findByEmail = async (collectionName: string, email: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    let user: any = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        user = doc.data();
      }
    });

    return user;
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}