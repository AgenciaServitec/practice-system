import { auth, fetchCollection, firestore } from "../../_firebase";
import { defaultFirestoreProps } from "../../utils";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";

export const postUser = async (
  req: Request<unknown, unknown, User, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: user } = req;

  console.log("「Add user」Initialize", {
    params: req.params,
    body: req.body,
  });

  try {
    const _isEmailExists = await isEmailExists(user?.email);

    if (_isEmailExists) {
      res.status(412).send("email_already_exists").end();
      return;
    }

    const _isPhoneNumberExists = await isPhoneNumberExists(user?.phone.number);

    if (_isPhoneNumberExists) {
      res.status(412).send("phone_number_already_exists").end();
      return;
    }

    const userId = firestore.collection("users").doc().id;

    await addUserAuth({ ...user, id: userId });
    await addUser({ ...user, id: userId });

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const addUser = async (user: User): Promise<void> => {
  const { assignCreateProps } = defaultFirestoreProps();

  await firestore
    .collection("users")
    .doc(user.id)
    .set(
      assignCreateProps({
        ...user,
        roleCode: "user",
        acls: ["/home", "/profile"],
        status: "registered",
      })
    );
};

const addUserAuth = async (user: User): Promise<void> => {
  await auth.createUser({
    uid: user.id,
    phoneNumber: user?.phone
      ? `${user.phone?.prefix || "+51"}${user.phone.number}`
      : undefined,
    email: user?.email || undefined,
    password: user?.password || undefined,
  });
};

const isEmailExists = async (email: string | null): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("email", "==", email)
  );

  return !isEmpty(users);
};

const isPhoneNumberExists = async (
  phoneNumber: string | null
): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("phone.number", "==", phoneNumber)
  );

  return !isEmpty(users);
};
