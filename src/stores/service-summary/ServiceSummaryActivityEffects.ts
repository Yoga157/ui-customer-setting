import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import ServiceSummaryModel from "./models/ServiceSummaryModel";

export const requestServiceSummary = async (CustomerSettingID: string): Promise<ServiceSummaryModel | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/ServiceSummary?CustomerSettingID=' + CustomerSettingID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ServiceSummaryModel>(
        ServiceSummaryModel,
        endpoint
    );
}