import { OnDocumentUpdated } from "./interface";
import { fetchDocument, firestore } from "../_firebase";
import assert from "assert";
import { sendMailConfirmationPractice } from "../mailer/practice-system";
import { logger } from "../utils";

export const onListenPracticeForSendMailConfirmation: OnDocumentUpdated =
  async (event) => {
    const practiceAfter = event.data?.after.data() as Practice | undefined;

    if (!practiceAfter) return;

    if (practiceAfter.status === "approved") {
      const user = await fetchUser(practiceAfter.practitionerId);

      logger.log("practiceAfter: ", practiceAfter);
      logger.log("user: ", user);

      assert(user, "Missing user!");

      await sendMailConfirmationPractice(practiceAfter, user);
    }
  };

const fetchUser = async (userId: string): Promise<User | undefined> => {
  return await fetchDocument(firestore.collection("users").doc(userId));
};
