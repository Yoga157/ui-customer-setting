import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CollectionHistoryModel from "./models/CollectionHistoryModel";
import ResultActions from "models/ResultActions";

export const requestCollectionHistory = async (customerSettingId: number): Promise<CollectionHistoryModel | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/CollectionHistory?customerSettingID=" + customerSettingId;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<CollectionHistoryModel>(CollectionHistoryModel, endpoint);
}