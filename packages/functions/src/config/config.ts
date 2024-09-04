interface Config {
  common: ConfigCommon;
  development: ConfigEnvironment;
  production: ConfigEnvironment;
}

interface ConfigCommon {
  "node-mailer": NodeMailerConfig;
}

interface NodeMailerConfig {
  port: number;
  host: string;
  from: string;
  user: string;
  pass: string;
}

interface MailerConfig {
  contact: {
    bcc: string;
    to: string;
  };
}

interface ConfigEnvironment {
  mailer: MailerConfig;
  "apis-net-pe": ApisNetPeConfig;
  hosting: HostingConfig;
}

interface HostingConfig {
  domain: string;
  apiUrl: string;
}

export const config: Config = {
  common: {
    "node-mailer": {
      port: 465,
      host: "smtp.gmail.com",
      from: "Practice System",
      user: "servitecperu266@gmail.com",
      pass: "aghv nygl mzqo gqud",
    },
  },
  development: {
    mailer: {
      contact: {
        bcc: "prueba@gmail.com",
        to: "galafloresangelemilio@gmail.com",
      },
    },
    "apis-net-pe": {
      apiUrl: "https://api.apis.net.pe/v2",
      token: "apis-token-8290.s1Op-FA9ZArlfXq39wpzMuKiaXexehgs",
    },
    hosting: {
      domain: "https://practice-system.web.app",
      apiUrl: "https://practice-system.web.app/api",
    },
  },
  production: {
    mailer: {
      contact: {
        bcc: "prueba@gmail.com",
        to: "galafloresangelemilio@gmail.com",
      },
    },
    hosting: {
      domain: "https://practice-system.web.app",
      apiUrl: "https://practice-system.web.app/api",
    },
    "apis-net-pe": {
      apiUrl: "https://api.apis.net.pe/v2",
      token: "apis-token-8290.s1Op-FA9ZArlfXq39wpzMuKiaXexehgs",
    },
  },
};
