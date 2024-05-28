import { defaultFirestoreProps } from "../../../utils";

export const postCompanyMapping = (
  company: CompanyData,
  companyId: string,
  userId: string
): Company => {
  const { assignCreateProps } = defaultFirestoreProps();
  return assignCreateProps({
    id: companyId,
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
