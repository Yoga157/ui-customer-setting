import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingRow from "./models/CustomerSettingRow";
// import OppUpload from './models/OppUpload';
import ResultActions from "models/ResultActions";
import { NumberFormatState } from "react-number-format";

export const requestCustomerSett = async (
  page: number,
  pageSize: number,
  column: string,
  sorting?: string
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetListCustomerSetting?page=${page}&pageSize=${pageSize}&column=${column}${
    sorting ? `&sorting=${sorting}` : ``
  }`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requesSearchCustomerSett = async (
  page: number,
  pageSize: number,
  column: string,
  search: string,
  sorting?: string,
  salesAssign?: string,
  shareable?: boolean,
  pmo_customer?: boolean,
  holdshipment?: boolean,
  blacklist?: boolean
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetListCustomerSettingBySearch?page=${page}&pageSize=${pageSize}&column=${column}&search=${search}${
    sorting ? `&sorting=${sorting}` : ``
  }${salesAssign ? `&salesAssign=${salesAssign}` : ``}${
    shareable ? `&shareable=${shareable}` : ``
  }${pmo_customer ? `&pmo_customer=${pmo_customer}` : ``}${
    holdshipment ? `&holdshipment=${holdshipment}` : ``
  }${blacklist ? `&blacklist=${blacklist}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

//   page: number,
//   pageSize: number,
//   UserLoginID: number
// ): Promise<FunnelOpportunityModel | HttpErrorResponseModel> => {
//   const controllerName =
//     "FunnelOpportunity/GetListOpportunityByUserID?" +
//     "page=" +
//     page +
//     "&pageSize=" +
//     pageSize +
//     "&UserLoginID=" +
//     UserLoginID;
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.getToModel<FunnelOpportunityModel>(
//     FunnelOpportunityModel,
//     endpoint
//   );
// };

// export const postFunnelOpp = async (
//   data: FunnelOpportunityRow
// ): Promise<ResultActions | HttpErrorResponseModel> => {
//   const controllerName = "FunnelOpportunity";
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.postToModel<ResultActions>(
//     ResultActions,
//     endpoint,
//     data
//   );
// };

// export const putFunnelOpp = async (
//   data: FunnelOpportunityRow
// ): Promise<ResultActions | HttpErrorResponseModel> => {
//   const controllerName = "FunnelOpportunity";
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
// };

// export const requestCustomers = async (
//   custName: string
// ): Promise<CustomerModel | HttpErrorResponseModel> => {
//   const controllerName = "Customer/SearchCustomer?CustName=" + custName;
//   const endpoint: string = environment.api.generic.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.postToModel<CustomerModel>(CustomerModel, endpoint);
// };

// export const requestSales = async (
//   custName: string,
//   direktoratID: number
// ): Promise<EmployeeModel | HttpErrorResponseModel> => {
//   const controllerName =
//     "Employee/DropdownEmployee?direktoratID=" +
//     direktoratID +
//     "&cust=" +
//     custName;
//   const endpoint: string = environment.api.generic.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
// };

// export const postFileOpp = async (
//   data: OppUpload
// ): Promise<ResultActions | HttpErrorResponseModel> => {
//   const controllerName = "FunnelOpportunity/InsertUpload";
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
// };

// export const requestSearchOpp = async (
//   page: number,
//   pageSize: number,
//   UserLoginID: number,
//   search: string
// ): Promise<FunnelOpportunityModel | HttpErrorResponseModel> => {
//   const controllerName =
//     "FunnelOpportunity/SearchSales?page=" +
//     page +
//     "&pageSize=" +
//     pageSize +
//     "&UserLoginID=" +
//     UserLoginID +
//     "&search=" +
//     search;
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.getToModel<FunnelOpportunityModel>(
//     FunnelOpportunityModel,
//     endpoint
//   );
// };

// export const requestSearchMarketing = async (
//   page: number,
//   pageSize: number,
//   search: string
// ): Promise<FunnelOpportunityModel | HttpErrorResponseModel> => {
//   const controllerName =
//     "FunnelOpportunity/SearchMarketing?page=" +
//     page +
//     "&pageSize=" +
//     pageSize +
//     "&search=" +
//     search;
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.getToModel<FunnelOpportunityModel>(
//     FunnelOpportunityModel,
//     endpoint
//   );
// };

// export const requestOpportunityByID = async (
//   funnelOpportunityID: number
// ): Promise<FunnelOpportunityRow | HttpErrorResponseModel> => {
//   const controllerName =
//     "FunnelOpportunity/GetByOpportunityID?FunnelOpportunityID=" +
//     funnelOpportunityID;
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.getToModel<FunnelOpportunityRow>(
//     FunnelOpportunityRow,
//     endpoint
//   );
// };

// export const requestReassignSales = async (
//   data: ReassignModel
// ): Promise<ReassignModel | HttpErrorResponseModel> => {
//   const controllerName = "FunnelOpportunity/Reassign";
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.putToModel<ReassignModel>(ReassignModel, endpoint, data);
// };

// export const clearResult = async (): Promise<any> => {
//   const clear = new ResultActions({});
//   return clear;
// };

// export const requestDirektorat = async (): Promise<
//   EmployeeModel | HttpErrorResponseModel
// > => {
//   const controllerName = "EmployeeHierarcy/DropdownDirektorat";
//   const endpoint: string = environment.api.generic.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.getToModel<EmployeeModel>(EmployeeModel, endpoint);
// };

// export const requestCancelOpp = async (
//   oppId: number
// ): Promise<ResultActions | HttpErrorResponseModel> => {
//   const controllerName = `FunnelOpportunity/Cancel?FunnelOpportunityID=${oppId}`;
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint);
// };

// export const checkToFunnelOpportunity = async (
//   data: FunnelOpportunityCheck
// ): Promise<ResultActions | HttpErrorResponseModel> => {
//   const controllerName = `Funnel/CheckFunnelToOpportunity`;
//   const endpoint: string = environment.api.funnel.replace(
//     ":controller",
//     controllerName
//   );
//   return EffectUtility.postToModel<ResultActions>(
//     ResultActions,
//     endpoint,
//     data
//   );
// };
