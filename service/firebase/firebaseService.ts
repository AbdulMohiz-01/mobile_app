import { User } from '../../model/user';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, setDoc, doc, updateDoc, getDoc, where, query as firestoreQuery } from 'firebase/firestore';


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

export const retrieveAllDocumentsByQuery = async (collectionName: string, query: any) => {
  try {
    const collectionRef = collection(db, collectionName);

    // Construct Firestore query from the provided query object
    const firestoreQueries = Object.keys(query).map(key =>
      where(key, '==', query[key])
    );

    const q = firestoreQuery(collectionRef, ...firestoreQueries);
    const querySnapshot = await getDocs(q);

    // Extract documents from the query snapshot
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return documents;
  } catch (error) {
    console.error("Error retrieving documents:", error);
    return [];
  }
};

export const addDocument = async (collectionName: string, data: object) => {

  try {
    // console.log(data, "this is data inside the addDocument function")
    const docRef = await addDoc(collection(db, collectionName), data);
    if (docRef.id) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
export const getDocumentById = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id,
      };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};
export const updateDocument = async (collectionName: string, docId: string, data: object) => {
  try {
    await updateDoc(doc(db, collectionName, docId), data);
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    return false;
  }
};

export const findByEmail = async (collectionName: string, email: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    var user: any = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        user = doc.data();
        return user;
      }
    });
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
  return user;
}

export const getDocumentIdbyEmail = async (collectionName: string, email: string) => {

  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    var user: any = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().email === email) {
        user = doc.id;
        return user;
      }
    });
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
  return user;
}
