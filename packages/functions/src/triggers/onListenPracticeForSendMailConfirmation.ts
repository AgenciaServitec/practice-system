import { OnDocumentUpdated } from "./interface";
import { fetchCollection, fetchDocument, firestore } from "../_firebase";
import assert from "assert";
import {
  sendMailConfirmationPractice,
  sendMailRefusedPractice,
} from "../mailer/practice-system";
import { logger } from "../utils";

export const onListenPracticeForSendMailConfirmation: OnDocumentUpdated =
  async (event) => {
    const practiceAfter = event.data?.after.data() as Practice | undefined;

    if (!practiceAfter) return;

    const annexs = await fetchAnnexs(practiceAfter.id);
    logger.log(annexs);

    annexs.map((annex) => {
      if (
        !annex.observationsAcademicSupervisor &&
        !annex.observationsAcademicSupervisor
      )
        return;
    });

    const observationAnnexs = annexs
      .filter(
        (annex: Annex) =>
          annex?.observationsCompanyRepresentative ||
          annex?.observationsAcademicSupervisor
      )
      .map((_annex) => [
        ...mapAnnexs(
          _annex,
          _annex?.observationsCompanyRepresentative,
          "observationsCompanyRepresentative"
        ),
        ...mapAnnexs(
          _annex,
          _annex?.observationsAcademicSupervisor,
          "observationsAcademicSupervisor"
        ),
      ]);

    const mapAnnexs = (
      annex: Annex,
      observations: ObservationAnnex[],
      type: string
    ) =>
      observations.map((_observation) => ({
        ..._observation,
        annexName: annex.id,
        type: type,
      }));

    logger.log("annexsView: ", observationAnnexs);

    if (practiceAfter.status !== "pending") {
      const user = await fetchUser(practiceAfter.practitionerId);

      logger.log("practiceAfter: ", practiceAfter);
      logger.log("user: ", user);

      assert(user, "Missing user!");

      if (practiceAfter.status === "approved") {
        await sendMailConfirmationPractice(practiceAfter, user);
      }

      if (practiceAfter.status === "refused") {
        await sendMailRefusedPractice(practiceAfter, user);
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
