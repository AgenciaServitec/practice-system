import { notification } from "../components";
import { isObject } from "lodash";
import apiErrors from "../config/apiErros.json";

export const getApiErrorResponse = async (response) => {
  try {
    if (isResponse(response)) {
      const responseText = await response.text();
      try {
        return JSON.parse(responseText);
      } catch (e) {
        return responseText;
      }
    }
  } catch (e) {
    return;
  }
};

export const apiErrorNotification = (response) => {
  isApiError(response)
    ? notificationApiError(response.key)
    : notification({ type: "error" });
};

const notificationApiError = (key) => {
  const titleDefault = apiErrors["default.title"];
  const descriptionDefault = apiErrors["default.description"];

  notification({
    type: "warning",
    title: apiErrors[key ? `${key}.title` : titleDefault],
    description: apiErrors[key ? `${key}.description` : descriptionDefault],
  });
};

export const isApiError = (data) => isObject(data) && "isApiError" in data;

export const isResponse = (data) => isObject(data) && "text" in data;
