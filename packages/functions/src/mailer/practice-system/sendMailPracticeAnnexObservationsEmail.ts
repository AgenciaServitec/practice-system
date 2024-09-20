import { html, sendMail } from "../sendMail";
import { template } from "./templates";
import { environmentConfig } from "../../config";
import { capitalize } from "lodash";

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

export const sendMailPracticeAnnexObservationsEmail = async (
  practice: Practice,
  user: User
): Promise<void> => {
  await sendMail({
    to: user.email,
    bcc: "",
    subject: `Observaciones [Módulo ${practice.moduleNumber}]: ${capitalize(
      practice.name
    )}`,
    html: html(
      template.practiceObservationsEmailTemplate,
      mapMail(practice, user)
    ),
  });
};

const mapMail = (practice: Practice, user: User): Mail => ({
  practitionerName: `${capitalize(user.paternalSurname)} ${capitalize(
    user.maternalSurname
  )} ${capitalize(user.firstName)}`,
  moduleNumber: practice.moduleNumber,
  name: capitalize(practice.name),
  status: practice.status,
  practiceLink: `${environmentConfig.hosting.domain}/practices/${practice.id}`,
});
