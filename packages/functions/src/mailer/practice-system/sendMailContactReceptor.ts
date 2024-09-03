import { html, sendMail } from "../sendMail";
import { template } from "./templates";

interface Mail {
  practitionerName: string;
  moduleNumber: string;
  name: string;
  status: string;
  practiceLinks: string;
}

export const senMailContactReceptor = async (
  practice: any,
  to?: string,
  bcc?: string
): Promise<void> =>
  await sendMail({
    to: to,
    bcc: bcc,
    subject: "Confirmación de aprobación de módulo",
    html: html(template.contactEmailReceptor, mapMail(practice)),
  });

const mapMail = (practice: Practice): Mail => ({
  practitionerName: "Angel Gala",
  moduleNumber: "1",
  name: "Module 1",
  status: "approved",
  practiceLinks:
    "https://practice-system.web.app/practices/QFjP7RNWMoyTvgMSLjD6/module1/sheets",
});
