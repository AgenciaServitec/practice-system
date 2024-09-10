import { OnDocumentUpdated } from "./interface";
import { fetchCollection, fetchDocument, firestore } from "../_firebase";
import assert from "assert";
import {
  sendMailPracticeApprovedEmail,
  sendMailPracticeObservationsEmail,
  sendMailPracticeRefusedEmail,
} from "../mailer/practice-system";

export const onListenPracticeForSendMailConfirmation: OnDocumentUpdated =
  async (event) => {
    const practiceBefore = event.data?.before.data() as Practice | undefined;
    const practiceAfter = event.data?.after.data() as Practice | undefined;

    assert(practiceBefore, "Missing practiceBefore!");
    assert(practiceAfter, "Missing practiceAfter!");

    const user = await fetchUser(practiceAfter.practitionerId);
    assert(user, "Missing user!");

    await onCheckObservationsAnnexs(practiceAfter.id);

    if (practiceAfter.status === "approved") {
      await sendMailPracticeApprovedEmail(practiceAfter, user);
    }

    if (practiceAfter.status === "refused") {
      await sendMailPracticeRefusedEmail(practiceAfter, user);
    }

    if (
      practiceBefore?.existObservationsInAnnexs !==
      practiceAfter?.existObservationsInAnnexs
    ) {
      if (practiceAfter?.existObservationsInAnnexs) {
        await sendMailPracticeObservationsEmail(practiceAfter, user);
      }
    }
  };

const fetchUser = async (userId: string): Promise<User | undefined> => {
  return await fetchDocument(firestore.collection("users").doc(userId));
};

const fetchAnnexs = async (practiceId: string): Promise<Annex[]> => {
  return await fetchCollection(
    firestore.collection("practices").doc(practiceId).collection("annexs")
  );
};

const onCheckObservationsAnnexs = async (practiceId: string) => {
  const annexs = await fetchAnnexs(practiceId);
  assert(annexs, "Missing annexs!");

  const observations = (
    observationBy:
      | "observationsAcademicSupervisor"
      | "observationsCompanyRepresentative"
  ) =>
    annexs
      .filter((annex) => annex?.[observationBy])
      .flatMap((_annex) =>
        _annex[observationBy].map((observation) => observation)
      );

  const observationsOfAnnexs = [
    ...observations("observationsAcademicSupervisor"),
    ...observations("observationsCompanyRepresentative"),
  ];

  const existsObservationsInAnnexs = observationsOfAnnexs.some(
    (observation) => observation.status === "pending"
  );

  await firestore
    .collection("practices")
    .doc(practiceId)
    .update({ existObservationsInAnnexs: existsObservationsInAnnexs });
};
