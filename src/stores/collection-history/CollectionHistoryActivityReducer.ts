import ICollectionHistoryState from "./models/CollectionHistoryState";
import * as CollectionHistoryActions from "./CollectionHistoryActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import CollectionHistoryModel from "./models/CollectionHistoryModel";

export const initialState: ICollectionHistoryState = {
    data: []
}

const CollectionHistoryReducer: Reducer = baseReducer(initialState, {
    [CollectionHistoryActions.REQUEST_GET_COLLECTION_HISTORY_FINISHED](state: ICollectionHistoryState, action: IAction<CollectionHistoryModel[]>): ICollectionHistoryState {
        return {
            ...state,
            data: action.payload!
        }
    }
})

export default CollectionHistoryReducer;