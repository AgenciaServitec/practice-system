import { defaultFirestoreProps } from "../../../utils";
import { UserBody } from "../postUser";

export const postUserMapping = (user: UserBody, companyId: string): User => {
  const { assignCreateProps } = defaultFirestoreProps();
  return assignCreateProps({
    id: user.id,
    acls: user.acls,
    companiesIds: user.companiesIds,
    roleCode: user.roleCode,
    email: user.email,
    address: user.address,
    password: user.password,
    dni: user.dni,
    firstName: user.firstName,
    paternalSurname: user.paternalSurname,
    maternalSurname: user.maternalSurname,
    phone: user.phone,
    iAcceptPrivacyPolicies: true,
    isDeleted: false,
    hasPractices: user.hasPractices,
    status: "registered",
    academicCoordinatorId: user.academicCoordinatorId,
    academicSupervisorId: user.academicSupervisorId,

    // conditional data by roleCode
    ...(user?.practitionerData && {
      practitionerData: user.practitionerData,
    }),
    ...(user?.companyRepresentativeData && {
      companyRepresentativeData: {
        ...user.companyRepresentativeData,
        companyId: companyId,
      },
    }),
  });
};
