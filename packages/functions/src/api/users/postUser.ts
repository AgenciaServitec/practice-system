import { auth, fetchCollection, firestore } from "../../_firebase";
import { defaultFirestoreProps } from "../../utils";
import { NextFunction, Request, Response } from "express";
import { isEmpty } from "lodash";
import { getCompanyDataByRuc } from "../../client-api/apis-net-pe";
import assert from "assert";

interface UserBody extends User {
  type: "practitioner" | "company_representative";
  ruc?: string;
}

export const postUser = async (
  req: Request<unknown, unknown, UserBody, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: user } = req;

  console.log("「Add user」Initialize", {
    params: req.params,
    body: req.body,
  });

  try {
    const _isEmailExists = await isEmailExists(user.email);

    if (_isEmailExists) {
      res.status(412).send("user/email_already_exists").end();
      return;
    }

    const _isDniExists = await isDniExists(user.dni);

    if (_isDniExists) {
      res.status(412).send("user/dni_already_exists").end();
      return;
    }

    const _isPhoneNumberExists = await isPhoneNumberExists(user?.phone.number);

    if (_isPhoneNumberExists) {
      res.status(412).send("user/phone_number_already_exists").end();
      return;
    }

    const userId = firestore.collection("users").doc().id;

    if (user.type === "company_representative" && !isEmpty(user?.ruc)) {
      assert(user.ruc, "Missing ruc!");

      const _isCompanyExists = await isCompanyExists(user.ruc);
      if (_isCompanyExists) {
        res.status(412).send("user/ruc_already_exists").end();
        return;
      }

      const company = await getCompanyDataByRuc({ ruc: user.ruc });
      if (!company) {
        res.status(412).send("user/company_no_found").end();
        return;
      }

      await addCompany(mapCompany(company, userId));
    }

    await addUserAuth({ ...user, id: userId });
    await addUser({ ...user, id: userId });

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const mapCompany = (company: CompanyData, userId: string): Company => {
  const { assignCreateProps } = defaultFirestoreProps();

  return assignCreateProps({
    id: firestore.collection("companies").doc().id,
    ruc: company.ruc,
    socialReason: company?.socialReason,
    department: company?.department,
    province: company?.province,
    district: company?.district,
    address: company?.address,
    email: "",
    category: "",
    webSite: "",
    status: company?.status === "ACTIVO" ? "active" : "inactive",
    membersIds: [userId],
    representativeId: userId,
    isDeleted: false,
  });
};

const addCompany = async (company: Company): Promise<void> => {
  await firestore.collection("companies").doc(company.id).set(company);
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

const isDniExists = async (dni: string): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("dni", "==", dni)
  );

  return !isEmpty(users);
};

const isCompanyExists = async (ruc: string): Promise<boolean> => {
  const companies = await fetchCollection<User>(
    firestore
      .collection("companies")
      .where("isDeleted", "==", false)
      .where("ruc", "==", ruc)
  );

  return !isEmpty(companies);
};
