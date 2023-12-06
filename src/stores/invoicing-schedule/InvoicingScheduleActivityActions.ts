import * as InvoicingScheduleEffect from "./InvoicingScheduleActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import InvoicingScheduleModel from "./models/InvoicingScheduleModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | InvoicingScheduleModel
  | ResultActions;

export const POST_INVOICING_SCHEDULE: string = "InvoicingScheduleActions.POST_INVOICING_SCHEDULE";
export const POST_INVOICING_SCHEDULE_FISNISHED: string = "InvoicingScheduleActions.POST_INVOICING_SCHEDULE_FISNISHED";
  
export const postInvoicingSchedule = (data: InvoicingScheduleModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            POST_INVOICING_SCHEDULE,
            InvoicingScheduleEffect.postInvoicingSchedule,
            data
        )
    }
}