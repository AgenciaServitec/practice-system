import { OnDocumentCreated } from "./interface";
import assert from "assert";
import { fetchDocument, firestore } from "../_firebase";
import { sendMailNewPracticeEmail } from "../mailer/practice-system";

export const onCreatedPracticeForSendMailConfirmation: OnDocumentCreated =
  async (event) => {
    const practice = event.data?.data() as Practice | undefined;
    assert(practice, "Missing practice!");

    const p0 = fetchUser(practice.practitionerId);
    const p1 = fetchUser(practice.academicSupervisorId);
    const p2 = practice?.companyRepresentativeId
      ? fetchUser(practice.companyRepresentativeId)
      : undefined;

    const [practitioner, academicSupervisor, companyRepresentative] =
      await Promise.all([p0, p1, p2].filter((promise) => promise));

    assert(practitioner, "Missing practitioner!");
    assert(academicSupervisor, "Missing academicSupervisor!");

    const _p0 = sendMailNewPracticeEmail(practice, practitioner, practitioner);
    const _p1 = sendMailNewPracticeEmail(
      practice,
      academicSupervisor,
      practitioner
    );
    const _p2 = companyRepresentative
      ? sendMailNewPracticeEmail(practice, companyRepresentative, practitioner)
      : undefined;

    await Promise.all([_p0, _p1, _p2].filter((promise) => promise));
  };

const fetchUser = async (userId: string): Promise<User | undefined> => {
  return await fetchDocument(firestore.collection("users").doc(userId));
};
