import { html, sendMail } from "../sendMail";
import { template } from "./templates";
import { capitalize } from "lodash";
import { environmentConfig } from "../../config";

interface Mail {
  practitionerName: string;
  moduleNumber: number;
  name: string;
  status: string;
  practiceLink: string;
}

export const sendMailConfirmationPractice = async (
  practice: Practice,
  user: User
): Promise<void> =>
  await sendMail({
    to: user.email,
    bcc: "",
    subject: "Confirmación de aprobación de módulo",
    html: html(template.contactEmailReceptor, mapMail(practice, user)),
  });

const mapMail = (practice: Practice, user: User): Mail => ({
  practitionerName: `${user.paternalSurname} ${user.maternalSurname} ${user.firstName}`,
  moduleNumber: practice.moduleNumber,
  name: capitalize(practice.name),
  status: practice.status,
  practiceLink: `${environmentConfig.hosting.domain}/practices/${practice.id}/module${practice.moduleNumber}/sheets`,
});
