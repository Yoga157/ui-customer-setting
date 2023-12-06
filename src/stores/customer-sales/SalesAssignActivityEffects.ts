import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import SalesAssignModel from "./models/SalesAssignModel";
import SalesAssignRow from "./models/SalesAssignRow";
import ResultActions from "models/ResultActions";
import SalesNameMode from "./models/SalesNameModel";
import SalesAssignPostModel from "./models/SalesAssignPostModel";

export const requestSalesByName = async (
  search: string
): Promise<SalesNameMode | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/SalesName?&search=" + search;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<SalesNameMode>(SalesNameMode, endpoint);
};

export const requestSalesDropdown = async (): Promise<
  SalesNameMode | HttpErrorResponseModel
> => {
  const controllerName = "CustomerSetting/ListSalesName";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<SalesNameMode>(SalesNameMode, endpoint);
};

//Assign sales
export const postAssignedSales = async (
  data: SalesAssignPostModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/CustomerSalesAssign";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.postToModel<ResultActions>(
    ResultActions,
    endpoint,
    data
  );
};

export const clearResult = async (): Promise<any> => {
  const clear = new SalesNameMode({});
  return clear;
};
