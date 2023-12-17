import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import BrandSummaryModel from "./models/BrandSummaryModel";

export const requestBrandSummary = async (CustomerSettingID: number): Promise<BrandSummaryModel | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/BrandSummary?CustomerSettingID=' + CustomerSettingID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<BrandSummaryModel>(
        BrandSummaryModel,
        endpoint
    );
}