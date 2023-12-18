import IProjectHistoryState from "./models/IProjectHistoryState";
import * as ProjectHistoryActions from "./ProjectHistoryActivityActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import ProjectHistoryModel from "./models/ProjectHistoryModel";
import ResultActions from "models/ResultActions";

export const initialState: IProjectHistoryState = {
    data: [],
};

const ProjectHistoryReducer: Reducer = baseReducer(initialState, {
    [ProjectHistoryActions.REQUEST_GET_PROJECT_HISTORY_FINISHED](state: IProjectHistoryState, action: IAction<ProjectHistoryModel[]>): IProjectHistoryState {
        return {
            ...state,
            data: action.payload!
        }
    }
})

export default ProjectHistoryReducer