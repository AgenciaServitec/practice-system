import { capitalize } from "lodash";

export const fullName = (user) =>
  capitalize(
    `${user.firstName} ${user.paternalSurname} ${user.maternalSurname}`
  );
