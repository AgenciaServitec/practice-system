import {
  auth,
  fetchCollection,
  fetchDocument,
  firestore,
} from "../../_firebase";
import { NextFunction, Request, Response } from "express";
import { flatten, isEmpty, uniq } from "lodash";
import { getCompanyDataByRuc } from "../../client-api/apis-net-pe";
import assert from "assert";
import { postUserMapping } from "./mappings";
import { postCompanyMapping } from "../companies/mappings";
import { defaultFirestoreProps } from "../../utils";

export interface UserBody extends User {
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

    if (
      user.roleCode === "user" &&
      !isEmpty(user?.practitionerData?.tuitionId)
    ) {
      assert(
        user?.practitionerData?.tuitionId,
        "user.practitionerData.tuitionId missing!"
      );

      const _isTuitionIdExists = await isTuitionIdExists(
        user.practitionerData.tuitionId
      );
      if (_isTuitionIdExists) {
        res.status(412).send("user/tuition_id_already_exists").end();
        return;
      }
    }

    const userId = firestore.collection("users").doc().id;
    const companyId = firestore.collection("companies").doc().id;
    let __company = null;

    if (
      user.roleCode === "company_representative" &&
      !isEmpty(user?.companyRepresentativeData?.ruc)
    ) {
      assert(user?.companyRepresentativeData?.ruc, "Missing ruc!");

      const _company = await fetchFirestoreCompany(
        user.companyRepresentativeData.ruc
      );

      if (isEmpty(_company)) {
        const company = await getCompanyDataByRuc({
          ruc: user.companyRepresentativeData.ruc,
        });

        if (!company) {
          res.status(412).send("user/company_no_found").end();
          return;
        }

        await addCompany(postCompanyMapping(company, companyId, userId));
      } else {
        __company = _company;
        await updateCompany({
          ..._company,
          ...(!_company?.representativeId && { representativeId: userId }),
          membersIds: uniq(flatten([...(_company?.membersIds || []), userId])),
        });
      }
    }

    // get acls of user by roleCode
    const roleAcls = await fetchDocument<RoleAcls>(
      firestore.collection("roles-acls").doc(user.roleCode)
    );

    await addUserAuth({ ...user, id: userId });
    await addUser(
      postUserMapping(
        {
          ...user,
          id: userId,
          acls: roleAcls?.acls || ["/profile", "/home", "/practices"],
        },
        __company ? __company.id : companyId
      )
    );

    res.sendStatus(200).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const addCompany = async (company: Company): Promise<void> => {
  await firestore.collection("companies").doc(company.id).set(company);
};

const addUser = async (user: User): Promise<void> => {
  await firestore.collection("users").doc(user.id).set(user);
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

const isTuitionIdExists = async (tuitionId: string): Promise<boolean> => {
  const users = await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("practitionerData.tuitionId", "==", tuitionId)
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

const fetchFirestoreCompany = async (
  ruc: string
): Promise<Company | undefined> => {
  const companies = await fetchCollection<Company>(
    firestore
      .collection("companies")
      .where("isDeleted", "==", false)
      .where("ruc", "==", ruc)
  );

  return companies?.[0];
};

const updateCompany = async (company: Company) => {
  const { assignUpdateProps } = defaultFirestoreProps();

  await firestore
    .collection("companies")
    .doc(company.id)
    .update({ ...assignUpdateProps(company) });
};
