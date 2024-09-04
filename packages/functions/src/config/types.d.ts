type EnvironmentConfig = ConfigCommon & ConfigEnvironment;

interface Config {
  development: ConfigEnvironment;
  production: ConfigEnvironment;
}

interface ConfigCommon {
  "node-mailer": NodeMailerConfig;
}

interface ConfigEnvironment {
  version: string;
  mailer: MailerConfig;
  "apis-net-pe": ApisNetPeConfig;
}

interface NodeMailerConfig {
  port: number;
  host: string;
  from: string;
  user: string;
  pass: string;
}

interface MailerConfig {
  sendMailNotifyCDSError: {
    to: string;
  };
}

interface ApisNetPeConfig {
  apiUrl: string;
  token: string;
}
