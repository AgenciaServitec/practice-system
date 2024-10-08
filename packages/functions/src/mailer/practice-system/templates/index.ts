import { readFileSync } from "fs";
import path from "path";

const htmlTemplate = (url: string): string =>
  readFileSync(path.join(__dirname, url)).toString();

export const template = {
  newPracticeEmailTemplate: htmlTemplate("./newPracticeEmailTemplate.html"),
  practiceReviewResubmission: htmlTemplate(
    "./practiceReviewResubmissionEmailTemplate.html"
  ),
  annexObservationsEmailTemplate: htmlTemplate(
    "./annexObservationsEmailTemplate.html"
  ),
  practiceObservationsEmailTemplate: htmlTemplate(
    "./practiceObservationsEmailTemplate.html"
  ),
  practiceApprovedEmailTemplate: htmlTemplate(
    "./practiceApprovedEmailTemplate.html"
  ),
  practiceRefusedEmailTemplate: htmlTemplate(
    "./practiceRefusedEmailTemplate.html"
  ),
};
