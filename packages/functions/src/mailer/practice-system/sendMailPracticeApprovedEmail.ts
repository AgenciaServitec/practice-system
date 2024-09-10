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

export const sendMailPracticeApprovedEmail = async (
  practice: Practice,
  user: User
): Promise<void> =>
  await sendMail({
    to: user.email,
    bcc: "",
    subject: `Aprobado [Módulo ${practice.moduleNumber}]: ${capitalize(
      practice.name
    )}`,
    html: html(template.practiceApprovedEmailTemplate, mapMail(practice, user)),
  });

const mapMail = (practice: Practice, user: User): Mail => ({
  practitionerName: `${capitalize(user.paternalSurname)} ${capitalize(
    user.maternalSurname
  )} ${capitalize(user.firstName)}`,
  moduleNumber: practice.moduleNumber,
  name: capitalize(practice.name),
  status: practice.status,
  practiceLink: `${environmentConfig.hosting.domain}/practices/${practice.id}/module${practice.moduleNumber}/sheets`,
});
