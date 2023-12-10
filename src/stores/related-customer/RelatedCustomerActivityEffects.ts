import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import RelatedCustomerPostModel from "./models/RelatedCustomerPostModel";
import RelatedCustomerModel from "./models/RelatedCustomerModel";
import ResultActions from "models/ResultActions";

export const requestRelatedCustomer = async (customerSettingId: number): Promise<RelatedCustomerModel | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/RelatedCustomer?customerSettingID=" + customerSettingId;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<RelatedCustomerModel>(RelatedCustomerModel, endpoint);
}

export const postRelatedCustomer = async (data: RelatedCustomerPostModel): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/RelatedCustomer";
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

export const deleteRelatedCustomer = async (id: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/RelatedCustomer/" + id;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.delToModel<ResultActions>(
    ResultActions,
    endpoint
  );
}