import * as ProjectHistoryEffect from "./ProjectHistoryActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ProjectHistoryModel from "./models/ProjectHistoryModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ProjectHistoryModel
  | ResultActions;

export const REQUEST_GET_PROJECT_HISTORY: string = "ProjectHistoryActions.REQUEST_GET_PROJECT_HISTORY";
export const REQUEST_GET_PROJECT_HISTORY_FINISHED: string = "ProjectHistoryActions.REQUEST_GET_PROJECT_HISTORY_FINISHED";

export const requestServiceSummary = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ProjectHistoryModel>(
            dispatch,
            REQUEST_GET_PROJECT_HISTORY,
            ProjectHistoryEffect.requestProjectHistory,
            customerID
        )
    }
}