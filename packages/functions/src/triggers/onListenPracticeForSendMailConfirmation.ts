import { OnDocumentUpdated } from "./interface";
import { fetchDocument, firestore } from "../_firebase";
import assert from "assert";
import { senMailContactReceptor } from "../mailer/practice-system";

export const onListenPracticeForSendMailConfirmation: OnDocumentUpdated =
  async (event) => {
    const practiceAfter = event.data?.after.data() as Practice | undefined;

    if (!practiceAfter) return;

    const user = await fetchUser(practiceAfter.practitionerId);

    assert(user, "Missing user!");

    await senMailContactReceptor(practiceAfter, user.email);
  };

const fetchUser = async (userId: string): Promise<User | undefined> => {
  return await fetchDocument(firestore.collection("users").doc(userId));
};
