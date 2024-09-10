import { html, sendMail } from "../sendMail";
import { template } from "./templates";
import { capitalize } from "lodash";
import { environmentConfig } from "../../config";
import { ProfessionalCareers } from "../../data-list";

interface Mail {
  practitioner: User | undefined;
  practitionerName: string | null;
  academicSupervisorName: string | null;
  companyRepresentativeName: string | null;
  moduleNumber: number;
  tuitionId: string | null | undefined;
  professionalCareer: string | undefined;
  name: string;
  status: string;
  practiceLink: string;
}

export const sendMailNewPracticeEmail = async (
  practice: Practice,
  user: User,
  practitioner: User
): Promise<void> =>
  await sendMail({
    to: user.email,
    bcc: "",
    subject: `[Módulo ${practice.moduleNumber}]: ${capitalize(practice.name)}`,
    html: html(
      template.newPracticeEmailTemplate,
      mapMail(practice, user, practitioner)
    ),
  });

const mapMail = (
  practice: Practice,
  user: User,
  practitioner: User | undefined
): Mail => ({
  practitioner: practitioner,
  practitionerName:
    user.roleCode === "user"
      ? `${capitalize(user.paternalSurname)} ${capitalize(
          user.maternalSurname
        )} ${capitalize(user.firstName)}`
      : null,
  academicSupervisorName:
    user.roleCode === "academic_supervisor"
      ? `${capitalize(user.paternalSurname)} ${capitalize(
          user.maternalSurname
        )} ${capitalize(user.firstName)}`
      : null,
  companyRepresentativeName:
    user.roleCode === "company_representative"
      ? `${capitalize(user.paternalSurname)} ${capitalize(
          user.maternalSurname
        )} ${capitalize(user.firstName)}`
      : null,
  moduleNumber: practice.moduleNumber,
  tuitionId: practitioner?.practitionerData?.tuitionId,
  professionalCareer: capitalize(
    ProfessionalCareers.find(
      (professionalCareer) =>
        professionalCareer.value ===
        practitioner?.practitionerData?.professionalCareer
    )?.label
  ),
  name: capitalize(practice.name),
  status: practice.status,
  practiceLink: `${environmentConfig.hosting.domain}/practices/${practice.id}`,
});
