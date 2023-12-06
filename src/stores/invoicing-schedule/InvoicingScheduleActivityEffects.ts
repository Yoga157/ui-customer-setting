import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import InvoicingScheduleModel from "./models/InvoicingScheduleModel";
import ResultActions from "models/ResultActions";

export const postInvoicingSchedule = async (data: InvoicingScheduleModel): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/InvoicingSchedule";
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