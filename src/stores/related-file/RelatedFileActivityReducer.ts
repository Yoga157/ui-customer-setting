import IRelatedFileState from "./models/IRelatedFileState";
import * as RelatedFileActions from "./RelatedFileActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import RelatedFileModel from "./models/RelatedFileModel";

export const initialState: IRelatedFileState = {
    data: []
}

const RelatedFileReducer: Reducer = baseReducer(initialState, {
    [RelatedFileActions.REQUEST_GET_RELATED_FILE_FINISHED](state: IRelatedFileState, action: IAction<RelatedFileModel[]>): IRelatedFileState {
        return {
            ...state,
            data: action.payload!
        }
    },

    [RelatedFileActions.DEL_RELATED_FILE_FINISHED](state: IRelatedFileState, action: IAction<RelatedFileModel[]>): IRelatedFileState {
        return {
            ...state
        }
    },
})

export default RelatedFileReducer