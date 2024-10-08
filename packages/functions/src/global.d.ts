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

interface RoleAcls extends DefaultFirestoreProps {
  id: string;
  acls: string[];
  roleCode: string;
}

//  for user
interface PractitionerData {
  academicYear?: number;
  entryYear: string;
  isGraduate: boolean;
  professionalCareer: string;
  semester?: number;
  studentShift?: "diurno" | "nocturno";
  tuitionId: string | null;
  yearGraduation: string;
}

//  for company_representative
interface CompanyRepresentativeData {
  ruc: string;
  businessPosition: string;
}

interface User extends DefaultFirestoreProps {
  id: string;
  acls: string[];
  companiesIds: string[];
  roleCode: RoleCode;
  email: string;
  address: string;
  password: string;
  profilePhoto?: Image;
  dni: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  phone: {
    prefix: string;
    number: string;
  };
  hasPractices: boolean;
  status: string;
  professionalCareer: string;
  practitionerData?: PractitionerData;
  companyRepresentativeData?: CompanyRepresentativeData;
  iAcceptPrivacyPolicies: boolean;
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

interface Practice extends DefaultFirestoreProps {
  academicCoordinatorId: string;
  academicSupervisorId: string;
  companyId: string;
  companyRepresentativeId: string;
  departureTime: string;
  endDate: string;
  entryTime: string;
  hours: number;
  id: string;
  moduleNumber: number;
  name: string;
  nameId: string;
  practiceArea: string;
  practitionerId: string;
  searchData: string[];
  startDate: string;
  status: string;
  task: string;
  existObservationsInAnnexs: boolean;
  existsObservationsInPractice: boolean;
  observations: ObservationAnnex[];
}

interface Annex {
  id: string;
  observationsCompanyRepresentative: ObservationAnnex[];
  observationsAcademicSupervisor: ObservationAnnex[];
  status: string;
  isDeleted: boolean;
}

interface ObservationAnnex {
  id: string;
  createAt: string;
  status: string;
  value: string;
  isDeleted: boolean;
}
