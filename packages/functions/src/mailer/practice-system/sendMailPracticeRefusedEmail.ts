import { html, sendMail } from "../sendMail";
import { capitalize } from "lodash";
import { template } from "./templates";
import { environmentConfig } from "../../config";

interface Mail {
  practitionerName: string;
  moduleNumber: number;
  name: string;
  status: string;
  practiceLink: string;
}

export const sendMailPracticeRefusedEmail = async (
  practice: Practice,
  user: User
): Promise<void> => {
  await sendMail({
    to: user.email,
    bcc: "",
    subject: `Desaprobado [Modulo ${practice.moduleNumber}]: ${capitalize(
      practice.name
    )}`,
    html: html(template.practiceRefusedEmailTemplate, mapMail(practice, user)),
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
