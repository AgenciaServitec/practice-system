import { firestore } from "../index";
import { fetchDocumentOnce } from "../utils";
import { setDocument, updateDocument, fetchCollectionOnce } from "../firestore";

export const companiesRef = firestore.collection("companies");

export const getCompanyId = () => companiesRef.doc().id;

export const fetchCompany = () => async (id) =>
  fetchDocumentOnce(companiesRef.doc(id));

export const fetchCompanyByRuc = async (ruc = "") =>
  fetchCollectionOnce(
    companiesRef.where("ruc", "==", ruc).where("isDeleted", "==", false)
  );

export const fetchCompanies = async () =>
  fetchCollectionOnce(companiesRef.where("isDeleted", "==", false));

export const addCompany = async (company) =>
  setDocument(companiesRef.doc(company.id), company);

export const updateCompany = async (companyId, company) =>
  updateDocument(companiesRef.doc(companyId), company);
