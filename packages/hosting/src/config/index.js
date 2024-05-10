import { includes } from "lodash";
import config from "./configs.json";
import apiErros from "./apiErros.json";

export { default as yup } from "./yup.json";

const hostName = window.location.hostname;

const hostsProduction = ["practice-system.web.app"];

export const currentEnvironment = includes(hostsProduction, hostName)
  ? "production"
  : "development";

export const common = config.common;
export const contactData = config.common.contactData;

export const currentConfig = config[currentEnvironment];
