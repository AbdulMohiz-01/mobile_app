import { db } from './firebaseConfig'; 
import { collection, addDoc, getDocs } from 'firebase/firestore';


export const retrieveAllDocuments = async (collectionName) => {
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