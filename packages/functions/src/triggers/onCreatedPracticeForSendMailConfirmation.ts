import { OnDocumentCreated } from "./interface";
import assert from "assert";
import { fetchDocument, firestore } from "../_firebase";
import { sendMailNewPracticeEmail } from "../mailer/practice-system";

export const onCreatedPracticeForSendMailConfirmation: OnDocumentCreated =
  async (event) => {
    const practice = event.data?.data() as Practice | undefined;
    assert(practice, "Missing practice!");

    const user = await fetchUser(practice.practitionerId);
    assert(user, "Missing user!");

    await sendMailNewPracticeEmail(practice, user);
  };

const fetchUser = async (userId: string): Promise<User | undefined> => {
  return await fetchDocument(firestore.collection("users").doc(userId));
};
