import { NextFunction, Request, Response } from "express";
import { fetchDocument, firestore } from "../_firebase";
import assert from "assert";
import { sendMailPracticeReviewReSubmissionEmail } from "../mailer/practice-system";

interface Params {
  practiceId: string;
}

export const onPracticeReviewSubmission = async (
  req: Request<Params, unknown, unknown, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { practiceId },
  } = req;

  try {
    const practice = await fetchPractice(practiceId);
    assert(practice, "Missing Practice!");

    const p0 = fetchUser(practice.practitionerId);
    const p1 = fetchUser(practice.academicSupervisorId);

    const [practitioner, academicSupervisor] = await Promise.all(
      [p0, p1].filter((promise) => promise)
    );
    assert(practitioner, "Missing Practitioner!");
    assert(academicSupervisor, "Missing AcademicSupervisor!");

    await sendMailPracticeReviewReSubmissionEmail(
      practice,
      academicSupervisor,
      practitioner
    );

    res.status(200).end();
  } catch (e) {
    console.log(e);
    next(e);
  }
};

const fetchPractice = async (
  practiceId: string
): Promise<Practice | undefined> => {
  return await fetchDocument(firestore.collection("practices").doc(practiceId));
};

const fetchUser = async (userId: string): Promise<User | undefined> => {
  return await fetchDocument(firestore.collection("users").doc(userId));
};
