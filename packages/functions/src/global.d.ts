type RoleCode =
  | "super_admin"
  | "admin"
  | "academic_supervisor"
  | "academic_coordinator"
  | "company_representative"
  | "user";

interface Role {
  code: RoleCode;
  name: string;
  imgUrl: string;
  updateAt: string;
}

interface User extends DefaultFirestoreProps {
  id: string;
  acls: string[];
  roleCode: RoleCode;
  email: string;
  password: string;
  profilePhoto?: Image;
  dniPhoto?: Image;
  dni: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  phone: {
    prefix: string;
    number: string;
  };
  iAcceptPrivacyPolicies: boolean;
  updateBy: string;
}

interface Image {
  name: string;
  status?: string;
  thumbUrl: string;
  uid: string;
  url: string;
}

interface Archive {
  name: string;
  status?: string;
  uid: string;
  url: string;
}

interface Correspondence extends DefaultFirestoreProps {
  id: string;
  destination: string;
  receivedBy: string;
  class: string;
  indicative: string;
  classification: string;
  issue: string;
  dateCorrespondence: FirebaseFirestore.Timestamp;
  photos: Image[];
  files: Archive[];
}

interface Company extends DefaultFirestoreProps {
  id: string;
  ruc: string;
  socialReason: string;
  department: string;
  province: string;
  district: string;
  address: string;
  email: string;
  category: string;
  webSite: string;
  status: "active" | "inactive";
  membersIds: string[];
  representativeId: string;
}
