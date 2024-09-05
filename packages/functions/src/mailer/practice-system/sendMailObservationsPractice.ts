import { html, sendMail } from "../sendMail";
import { template } from "./templates";
import { environmentConfig } from "../../config";

interface Mail {
  practitionerName: string;
  moduleNumber: number;
  name: string;
  status: string;
  observationsByAnnexAndUser: ObservationsByUser[];
  practiceLink: string;
}

export interface ObservationsByUser {
  annexId: string;
  companyRepresentativeObservations: ObservationAnnex[];
  academicSupervisorObservations: ObservationAnnex[];
}

export const sendMailObservationsPractice = async (
  practice: Practice,
  observationsByAnnexAndUser: ObservationsByUser[],
  user: User
): Promise<void> => {
  await sendMail({
    to: user.email,
    bcc: "",
    subject: "",
    html: html(
      template.observationsEmailPractice,
      mapMail(practice, observationsByAnnexAndUser, user)
    ),
  });
};

const mapMail = (
  practice: Practice,
  observationsByAnnexAndUser: ObservationsByUser[],
  user: User
): Mail => ({
  practitionerName: `${user.paternalSurname} ${user.maternalSurname} ${user.firstName}`,
  moduleNumber: practice.moduleNumber,
  name: practice.name,
  status: practice.status,
  observationsByAnnexAndUser: observationsByAnnexAndUser,
  practiceLink: `${environmentConfig.hosting.domain}/practices/${practice.id}`,
});
