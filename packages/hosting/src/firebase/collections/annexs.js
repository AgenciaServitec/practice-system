import { firestore } from "../index";
import { fetchCollectionOnce, fetchDocumentOnce } from "../utils";
import { setDocument, updateDocument } from "../firestore";

export const annexsRef = (practiceId) =>
  firestore.collection("practices").doc(practiceId).collection("annexs");

export const getAnnexsId = () => annexsRef.doc().id;

export const fetchAnnex = async (practiceId, annexId) =>
  fetchDocumentOnce(annexsRef(practiceId).doc(annexId));

export const fetchAnnexs = async (practiceId) =>
  fetchCollectionOnce(annexsRef(practiceId).where("isDeleted", "==", false));

export const addAnnex = async (practiceId, annex) =>
  setDocument(annexsRef(practiceId).doc(annex.id), annex);

export const updateAnnex = async (practiceId, annexId, annex) =>
  updateDocument(annexsRef(practiceId).doc(annexId), annex);
