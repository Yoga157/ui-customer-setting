/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 * https://blog.usejournal.com/my-awesome-custom-react-environment-variables-setup-8ebb0797d8ac
 */
export default function baseEnv(baseApi: string) {
  return {
    route: {
      baseRoute: "/data-quality", // Fixes issue with Github Pages
    },
    api: {
      generic: `${baseApi}/api/DQGenericService/:controller`,
      serviceCatalog: `${baseApi}/api/DQServiceCatalog/:controller`,
      funnel: `${baseApi}/api/DQFunnelService/:controller`,
      customer: `${baseApi}/api/:controller`,
      auth: `${baseApi}/api/AuthServerService/:controller`,
      jde: `${baseApi}/api/DQJDEService/:controller`,
      kpi: `${baseApi}/api/DQKpiService/:controller`,
      login: `http://10.0.2.41:7000/api/AuthServerService/:controller`
    },
    isProduction: false,
    isDevelopment: true,
    isTesting: false,
  };
}

export type Environment = ReturnType<typeof baseEnv>;
