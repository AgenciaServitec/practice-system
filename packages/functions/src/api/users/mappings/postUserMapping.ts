import { defaultFirestoreProps } from "../../../utils";
import { UserBody } from "../postUser";

export const postUserMapping = (user: UserBody): User => {
  const { assignCreateProps } = defaultFirestoreProps();
  return assignCreateProps({
    id: user.id,
    acls: user.acls,
    roleCode: user.roleCode,
    email: user.email,
    password: user.password,
    dni: user.dni,
    firstName: user.firstName,
    paternalSurname: user.paternalSurname,
    maternalSurname: user.maternalSurname,
    phone: user.phone,
    iAcceptPrivacyPolicies: true,
    isDeleted: false,
    status: "registered",

    //conditional data by roleCode
    ...(user?.practitionerData && {
      practitionerData: user.practitionerData,
    }),
    ...(user?.companyRepresentativeData && {
      companyRepresentativeData: user.companyRepresentativeData,
    }),
  });
};
