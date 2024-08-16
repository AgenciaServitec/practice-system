import { capitalize } from "lodash";
import { BusinessPosition, Roles } from "../../data-list";

export const fullName = (user) =>
  capitalize(
    `${user?.firstName || ""} ${user?.paternalSurname || ""} ${
      user?.maternalSurname || ""
    }`
  );

export const getBusinessPosition = (businessPositionCode) =>
  BusinessPosition.find(
    (bPosition) => bPosition.value === businessPositionCode
  );

export const findRole = (roleCode) =>
  Roles.find((role) => role.code === roleCode);
