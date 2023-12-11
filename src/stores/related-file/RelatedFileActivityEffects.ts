import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import RelatedFileModel from "./models/RelatedFileModel";
import ResultActions from "models/ResultActions";

export const requestRelatedFile = async (customerSettingId: number): Promise<RelatedFileModel | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/RelatedFile?customerSettingID=" + customerSettingId;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<RelatedFileModel>(RelatedFileModel, endpoint);
}

export const deleteRelatedFile = async (id: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/RelatedFile/" + id;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.delToModel<ResultActions>(
    ResultActions,
    endpoint
  );
}