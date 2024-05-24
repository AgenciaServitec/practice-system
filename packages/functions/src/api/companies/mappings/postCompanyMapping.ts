import { defaultFirestoreProps } from "../../../utils";
import { firestore } from "../../../_firebase";

export const postCompanyMapping = (
  company: CompanyData,
  userId: string
): Company => {
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
