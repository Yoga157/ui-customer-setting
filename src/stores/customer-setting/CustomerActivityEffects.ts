import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingRow from "./models/CustomerSettingRow";
import CustomerSettingById from "./models/CustomerSettingById";
import ResultActions from "models/ResultActions";
import { NumberFormatState } from "react-number-format";
import { data } from "jquery";

export const requestCustomerSett = async (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetListCustomerSetting?
  ${page ? `page=${page}` : ``}
  ${pageSize ? `&pageSize=${pageSize}` : ``}
  ${column ? `&column=${column}` : ``}
  ${sorting ? `&sorting=${sorting}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestSearchCustomerSett = async (
  page: number,
  pageSize: number,
  column: string | null,
  search: string | null,
  sorting?: string | null,
  salesAssign?: string | null,
  shareable?: boolean | null,
  pmo_customer?: boolean | null,
  holdshipment?: boolean | null,
  blacklist?: boolean | null
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetListCustomerSettingBySearch?page=${page}&pageSize=${pageSize}&column=${column}${
    search || search != null ? `&search=${search}` : ``
  }${sorting || sorting != null ? `&sorting=${sorting}` : ``}${
    salesAssign || salesAssign != null ? `&salesAssign=${salesAssign}` : ``
  }${shareable || shareable != null ? `&shareable=${shareable}` : ``}${
    pmo_customer || pmo_customer != null ? `&pmoCustomer=${pmo_customer}` : ``
  }${
    holdshipment || holdshipment != null ? `&holdshipment=${holdshipment}` : ``
  }${blacklist || blacklist != null ? `&blacklist=${blacklist}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const deleteCustomerSett = async (
  customerSettingID: number
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/" + customerSettingID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.delToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestCustomerSettingByCustomerId = async (
  customerSettingID: number
): Promise<CustomerSettingById | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSetting/GetCustomerSettingByCustomerGenID?customerGenID=" +
    customerSettingID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<CustomerSettingById>(
    CustomerSettingById,
    endpoint
  );
};

export const requestCustomerSettingById = async (customerSettingID: number): Promise<CustomerSettingById | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/" + customerSettingID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<CustomerSettingById>(
    CustomerSettingById,
    endpoint
  );
};

export const postCustomerSetting = async (data: CustomerSettingById): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting";
  const endpoint: string = environment.api.customer.replace(
      ":controller",
      controllerName
  );

  return EffectUtility.postToModel<ResultActions>(
      ResultActions,
      endpoint,
      data
  );
}

export const putCustomerSetting = async (data: CustomerSettingById, id: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/" + id;
  const endpoint: string = environment.api.customer.replace(
      ":controller",
      controllerName
  );

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const clearResult = async (): Promise<any> => {
  const clear = new ResultActions({});
  return clear;
};
