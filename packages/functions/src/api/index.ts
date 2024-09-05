import express from "express";
import cors from "cors";
import { errorHandler, hostingToApi } from "./_middlewares";
import { body } from "express-validator";
import { patchUser, postUser, putUser } from "./users";
import { getEntityDataByDni, getEntityDataByRuc } from "./consults";
import {
  ObservationsByUser,
  sendMailObservationsPractice,
} from "../mailer/practice-system/sendMailObservationsPractice";
import { fetchCollection, fetchDocument, firestore } from "../_firebase";
import assert from "assert";

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(hostingToApi);

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

app.post("/user", [body("email").exists(), body("phone").exists()], postUser);
app.put(
  "/users/:userId",
  [body("id").exists(), body("email").exists(), body("phone").exists()],
  putUser
);
app.patch("/users/:userId", [body("updateBy").exists()], patchUser);

app.get("/consults/dni/:dni", getEntityDataByDni);
app.get("/consults/ruc/:ruc", getEntityDataByRuc);
// app.get("/send-mail-practice", async (req, res, next) => {
//   const fetchAnnexs = async (practiceId: string): Promise<Annex[]> => {
//     return await fetchCollection(
//       firestore.collection("practices").doc(practiceId).collection("annexs")
//     );
//   };
//
//   const annexs = await fetchAnnexs("f4KTzK6QvvfMrC4h81OS");
//
//   const mapAnnexs = (
//     annex: Annex,
//     observations: ObservationAnnex[],
//     type: string
//   ) =>
//     observations.map((_observation) => ({
//       ..._observation,
//       annexName: annex.id,
//       type: type,
//     }));
//
//   const annexsView = annexs
//     .filter(
//       (annex: Annex) =>
//         annex?.observationsCompanyRepresentative ||
//         annex?.observationsAcademicSupervisor
//     )
//     .map((_annex) => [
//       ...mapAnnexs(
//         _annex,
//         _annex?.observationsCompanyRepresentative,
//         "observationsCompanyRepresentative"
//       ),
//       ...mapAnnexs(
//         _annex,
//         _annex?.observationsAcademicSupervisor,
//         "observationsAcademicSupervisor"
//       ),
//     ]);
//
//   logger.log("annexsView: ", annexsView);
//
//   if (!annexs) return;
//
//   logger.log("annexs: ", annexs);
//
//   res.send(200).end();
// });

const fetchUser = async (userId: string): Promise<User | undefined> => {
  return await fetchDocument(firestore.collection("users").doc(userId));
};

app.get("/send-mail-practice", async () => {
  const fetchAnnexs = async (practiceId: string): Promise<Annex[]> => {
    return await fetchCollection(
      firestore.collection("practices").doc(practiceId).collection("annexs")
    );
  };

  const annexs = await fetchAnnexs("f4KTzK6QvvfMrC4h81OS");

  const observationsByAnnexAndUser: ObservationsByUser[] = annexs.map(
    (annex) => ({
      annexId: annex.id,
      companyRepresentativeObservations:
        annex.observationsCompanyRepresentative,
      academicSupervisorObservations: annex.observationsAcademicSupervisor,
    })
  );

  const user = await fetchUser("Tmd4A4z08zjrLNGQC4zx");
  assert(user, "Missing user!");

  const practice = await fetchDocument<Practice | undefined>(
    firestore.collection("practices").doc("f4KTzK6QvvfMrC4h81OS")
  );

  assert(practice, "Missing practice!");

  await sendMailObservationsPractice(
    practice,
    observationsByAnnexAndUser,
    user
  );
});

app.use(errorHandler);

export { app };
