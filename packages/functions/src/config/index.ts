import { config } from "./config";

const projectId = process.env.GCLOUD_PROJECT;

const currentEnvironment =
  projectId === "practice-system" ? "production" : "development";

const isProduction = currentEnvironment === "production";

const environmentConfig = {
  ...config[currentEnvironment],
  ...config.common,
};

export { isProduction, environmentConfig, config };
