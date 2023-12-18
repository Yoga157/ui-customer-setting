import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import ConfigItemModel from "./models/ConfigItemModel";
import ResultActions from "models/ResultActions";

export const requestConfigItem = async (customerId: number): Promise<ConfigItemModel | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/ConfigItem?customerID=" + customerId;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ConfigItemModel>(ConfigItemModel, endpoint);
}