import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import ProjectHistoryModel from "./models/ProjectHistoryModel";

export const requestProjectHistory = async (CustomerID: number): Promise<ProjectHistoryModel | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/ProjectHistory?CustomerID=' + CustomerID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ProjectHistoryModel>(
        ProjectHistoryModel,
        endpoint
    );
}