import { html, sendMail } from "../sendMail";
import { template } from "./templates";
import { environmentConfig } from "../../config";

interface Mail {
  practitionerName: string;
  moduleNumber: number;
  name: string;
  status: string;
  practiceLink: string;
}

export interface ObservationByAnnexAndUser {
  annexId: string;
  companyRepresentativeObservations: ObservationByUser | null;
  academicSupervisorObservations: ObservationByUser | null;
}

interface ObservationByUser {
  userType: string;
  list: ObservationAnnex[];
}

export const sendMailObservationsPractice = async (
  practice: Practice,
  user: User
): Promise<void> => {
  await sendMail({
    to: user.email,
    bcc: "",
    subject: `[Módulo ${practice.moduleNumber}]: Observaciones`,
    html: html(template.observationsEmailPractice, mapMail(practice, user)),
  });
};

const mapMail = (practice: Practice, user: User): Mail => ({
  practitionerName: `${user.paternalSurname} ${user.maternalSurname} ${user.firstName}`,
  moduleNumber: practice.moduleNumber,
  name: practice.name,
  status: practice.status,
  practiceLink: `${environmentConfig.hosting.domain}/practices/${practice.id}`,
});
