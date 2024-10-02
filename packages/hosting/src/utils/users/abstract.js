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

export const getCompanyRepresentative = (
  companyId,
  companies = [],
  users = []
) => {
  const representativeId = companies.find(
    (company) => company.id === companyId
  )?.representativeId;

  return users.find((user) => user.id === representativeId);
};

export const getUserData = (userId, users = []) =>
  users.find((user) => user.id === userId);
