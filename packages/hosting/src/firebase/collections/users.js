import { firestore } from "../index";
import { fetchCollectionOnce, fetchDocumentOnce } from "../utils";
import { setDocument, updateDocument } from "../firestore";

export const usersRef = firestore.collection("users");

export const getUserId = () => usersRef.doc().id;

export const fetchUser = async (id) => fetchDocumentOnce(usersRef.doc(id));
export const fetchUserByEmail = async (email) =>
  fetchCollectionOnce(
    usersRef.where("isDeleted", "==", false).where("email", "==", email)
  );

export const fetchUsers = async () =>
  fetchCollectionOnce(usersRef.where("isDeleted", "==", false));

export const addUser = async (user) => setDocument(usersRef.doc(user.id), user);

export const updateUser = async (userId, user) =>
  updateDocument(usersRef.doc(userId), user);
