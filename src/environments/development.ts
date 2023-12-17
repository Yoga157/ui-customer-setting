import environment, { Environment } from './base';

//const baseApi = 'https://bhpapisrv.berca.co.id:5009';

//const baseApi = 'https://192.168.1.113:5009';
// const baseApi = 'http://10.0.2.41:7000';
const baseApi = 'https://localhost:5001';
const env = environment(baseApi);

const developmentEnv: Environment = {
  ...env,
  // override anything that gets added from base.
  api: {
    ...env.api,
    // error200: `${baseApi}/api/v1/error-200`,
    // error500: `${baseApi}/api/v1/error-500`,
  },
  isProduction: false,
  isDevelopment: true,
};

export default developmentEnv;
