type RoleCode =
  | "super_admin"
  | "admin"
  | "academic_supervisor"
  | "academic_coordinator"
  | "company"
  | "user";

interface Role {
  code: RoleCode;
  name: string;
  imgUrl: string;
  updateAt: string;
}

interface User extends DefaultFirestoreProps {
  id: string;
  type: "person" | "company";
  acls: string[];
  roleCode: RoleCode;
  email: string;
  password: string;
  profilePhoto?: Image;
  dniPhoto?: Image;
  dni?: string;
  firstName?: string;
  paternalSurname?: string;
  maternalSurname?: string;
  phone: {
    prefix: string;
    number: string;
  };
  ruc?: string;
  socialReason?: string;
  region?: string;
  province?: string;
  district?: string;
  address?: string;
  status?: "active" | "inactive";
  representative?: string;
  category?: string;
  website?: string;
  iAcceptPrivacyPolicies: boolean;
  updateBy: string;
}

interface FamilyMember {
  id: string;
  firstName: string;
  maternalSurname: string;
  paternalSurname: string;
  age: number;
  dni: string;
  relationship: string;
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
