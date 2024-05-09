import {firestore} from "../index";
import {fetchCollectionOnce, fetchDocumentOnce} from "../utils";
import {setDocument, updateDocument} from "../firestore";

export const practicesRef = firestore.collection("practices");

export const getPracticesId = () => practicesRef.doc().id;

export const fetchPractice = async (id) => fetchDocumentOnce(practicesRef.doc(id))

export const fetchPractices = async () => fetchCollectionOnce(practicesRef.where("isDeleted","==",false));

export const addPractice = async (practice) => setDocument(practicesRef.doc(practice.id),practice)

export const updatePractice = async (practiceId, practice) => updateDocument(practicesRef.doc(practiceId),practice)