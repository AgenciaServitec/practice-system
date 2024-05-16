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
      res.status(412).send("user/email_already_exists").end();
      return;
    }

    if (user.type === "person") {
      const _isDniExists = await isDniExists(user?.dni);

      if (_isDniExists) {
        res.status(412).send("user/dni_already_exists").end();
        return;
      }
    }

    if (user.type === "company") {
      const _isRucExists = await isRucExists(user?.ruc);

      if (_isRucExists) {
        res.status(412).send("user/ruc_already_exists").end();
        return;
      }
    }

    const _isPhoneNumberExists = await isPhoneNumberExists(user?.phone.number);

    if (_isPhoneNumberExists) {
      res.status(412).send("user/phone_number_already_exists").end();
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

const isEmailExists = async (email: string): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("email", "==", email)
  );

  return !isEmpty(users);
};

const isPhoneNumberExists = async (phoneNumber: string): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("phone.number", "==", phoneNumber)
  );

  return !isEmpty(users);
};

const isDniExists = async (dni?: string): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("dni", "==", dni)
  );

  return !isEmpty(users);
};

const isRucExists = async (ruc?: string): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("ruc", "==", ruc)
  );

  return !isEmpty(users);
};
